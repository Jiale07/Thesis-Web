<template>
  <div class="containerBox" :style="{minHeight:asideHeight+'px'}">
    <div class="container">
      <div class="content header">
        <el-page-header @back="goBack" content="毕业设计小组" title="返回主页">
        </el-page-header>
      </div>
      <div class="content menu">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
        >
          <el-submenu v-for="(item,key) in menu" :index="item.menuId" :key="key">
            <template slot="title">{{item.title}}</template>
            <el-menu-item
                v-for="(childrenItem,key) in item.children"
                :key="key"
                @click = "toView(childrenItem.routerName)"
                :disabled="childrenItem.isDisabled">
              {{childrenItem.text}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <div class="main">
          <router-view></router-view>
        </div>
      </div>
<!--      <div class="content footer">footer</div>-->
    </div>
  </div>
</template>

<script>
// import TeamMember from "./component/TeamMember"

import {postGDTeamByTeacherId} from "../../../../axios/teacher/GDTeamAbout/MyTeamView";
import {mapState} from "vuex";
export default {
  name: "teamView",
  data(){
    return {
      asideHeight:'',
      menu:[
        {
          menuId:'1',

          title:'我的小组',
          children:[
            {
              id:'1-1',
              text:'小组信息',
              routerName:'MyTeam',
            },{
              id:'1-2',
              text:'小组成员',
              routerName:'TeamMember',
            }
          ]
        },{
          menuId:'2',
          title:'过程文档',
          children:[
            {
              id:'2-1',
              text:'开题报告',
              routerName:'ThesisProposalSubmittedTable',
              isDisabled:false
            },{
              id:'2-2',
              text:'毕业论文',
              routerName:'ThesisSubmittedTable',
              isDisabled:false
            },{
              id:'2-3',
              text:'毕业论文(最终版）',
              routerName:'ThesisFinalSubmittedTable',
              isDisabled:false
            },{
              id:'2-4',
              text:'答辩文件',
              routerName:'',
              isDisabled:true
            }
          ]
        },{
          menuId:'3',
          title:'答辩',
          children:[
            {
              id:'3-1',
              text:'小组成员答辩信息',
              routerName:'',
              isDisabled:true
            },{
              id:'3-2',
              text:'小组成员答辩成绩',
              routerName:'',
              isDisabled:true
            }
          ]
        },{
          menuId:'4',
          title:'其他'
        }
      ],

      activeIndex:'1'
    }
  },
  computed:{
    ...mapState('loginAbout',['user'])
  },
  components:{
    // TeamMember,
  },
  methods:{
    goBack(){
      this.$router.push({
        name:'Teacher'
      })
    },


    toView(routerName){
      this.$router.push({
        name:routerName
      })
    },

    postGDTeamByTeacherId(teacherId){
      postGDTeamByTeacherId({
        teacherId
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.$store.commit('teamAboutStore/setTeamInfo',res.data)
        }
      })
    }
  },

  mounted() {
    //获取窗口高度
    this.asideHeight = document.documentElement.clientHeight;
    window.onresize = () => {
      return (() => {
        this.asideHeight = document.documentElement.clientHeight;
      })()
    }
  },

  created() {
    let userId = this.user.userId
    this.postGDTeamByTeacherId(userId)
  },

  beforeDestroy() {
    this.$store.commit("thesisRecordOfStudentStore/resetState")
  }
}
</script>

<style scoped lang="less">
.containerBox{
  margin:0 auto;
  padding-bottom: 20px;
  width: 1280px;

  .container{


    .content{
      padding: 10px 20px;
      margin-bottom: 20px;
      background-color: #ffffff;
      border-radius: 15px;
    }
    .content:last-child{
      margin-bottom: 0px;
    }


    .main{
      margin-top: 20px;
    }
  }


}
</style>