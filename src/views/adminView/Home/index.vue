<template>
  <div>
<!--    头部-->
    <Header
        :userTitle="userTitle"
        :userInfo="userInfo"
    ></Header>
<!--    主体-->
    <div>
      <el-container :style="{height:asideHeight+'px'}">
        <el-aside width="200px" class="myAside" >
          <NavLeft></NavLeft>
        </el-aside>
        <el-main class="main">
          <router-view :key="$route.fullPath"></router-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import Header from '../../../components/header/index'

import NavLeft from './component/NavLeft/index'
import {postAdminInfo} from "../../../axios/adminView/homeView";
import {mapState} from "vuex";


export default {
  name: "AdminHome",
  data(){
    return{
      userTitle:'管理员',
      asideHeight:'',
      userInfo:{
        userId:'',
        username:'AdminName'
      }
    }
  },
  computed:{
    ...mapState('loginAbout',['user'])
  },
  components:{
    Header,
    NavLeft
  },
  methods:{
    postAdminInfo(adminId){
      postAdminInfo({
        adminId
      }).then(result=>{
        let res = result.data
        if (res.resultCode === 200){
          console.log(res)
          this.userInfo.userId = res.data.id
          this.userInfo.userName = res.data.adminName
        }
      })
    }
  },
  mounted() {
    //获取窗口高度
    this.asideHeight = document.documentElement.clientHeight - 60;
    window.onresize = () => {
      return (() => {
        this.asideHeight = document.documentElement.clientHeight - 60;
      })()
    }
  },
  created() {
    this.postAdminInfo(this.user.userId)
  }
}
</script>

<style scoped lang="less">

.myContainer{
  position: sticky;
  top:0px;
}
.myAside{

  background-color: #a1a1a1;
  width: 200px;
}
.main{

}
</style>