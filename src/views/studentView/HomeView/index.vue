<template>
  <div>
    <el-container :style="{minHeight:asideHeight+'px'}">
      <el-header height="120px">
<!--    头部-->
        <Header
            :userTitle="userTitle"
            :userInfo="userInfo"
        ></Header>
<!--      导航栏-->
        <Nav :menu="menu"></Nav>
      </el-header>
<!--    主体-->
      <el-main>
        <div class="left">
          <div class="timeShow mycontainer">
            <ClockComponent/>
          </div>
          <div class= "mycontainer">
            <AnnouncementListComponent></AnnouncementListComponent>
          </div>
        </div>
        <div class="right">
          <div class=" mycontainer">

          </div>
          <div class=" mycontainer">

          </div>
          <div class=" mycontainer">

          </div>
          <div class=" mycontainer">

          </div>
          <div class=" mycontainer">

          </div>
        </div>
      </el-main>
      <!--    底部-->
      <Footer/>

    </el-container>
  </div>
</template>

<script>
import Nav from '../../../components/student/nav/index'
import Header from '../../../components/header/index'
import Footer from '../../../components/footer/index'
import {mapState} from "vuex";
import {postStudentInfo} from "../../../axios/studentView/homeView";
import AnnouncementListComponent from "../../../components/AnnouncementListComponent";
import ClockComponent from "../../../components/ClockComponent";
export default {
  name: "StudentHome",
  data(){
    return {
      userTitle:'学生',
      menu:[
        {
          menuId:'1',
          title:'毕业设计',
          children:[
            {
              id:'1-1',
              text:'自主选择导师',
              isDisabled:false,
              path:'/chooseInstructor'
            },{
              id:'1-2',
              text:'查看选择结果',
              isDisabled:false,
            }
          ]
        },{
          menuId:'2',
          title:'信息查询',
          children:[
            {
              id:'2-1',
              text:'我的个人信息',
              isDisabled:false,
              path:'/accountHome'
            },{
              id:'2-2',
              text:'我的选题',
              isDisabled:false
            },{
              id:'2-3',
              text:'其他',
              isDisabled:false
            }
          ]
        },{
          menuId:'3',
          title:'过程文档提交',
          children:[
            {
              id:'2-1',
              text:'开题报告',
              isDisabled:false,
              path:'/thesisProposal'
            },{
              id:'2-2',
              text:'毕业论文',
              isDisabled:false,
              path:'/thesisView'
            },{
              id:'2-3',
              text:'毕业论文最终版',
              isDisabled:false,
              path:'/student/thesisFinalView'
            },{
              id:'2-4',
              text:'答辩材料',
              isDisabled:true,
              path:''
            }
          ]
        }
      ],
      asideHeight:'',
      userInfo:{
        userId:'',
        userName:'student',
      },



    }
  },
  components:{
    Nav,
    Header,
    Footer,
    AnnouncementListComponent,
    ClockComponent
  },

  computed:{
    ...mapState('loginAbout',['user']),
    ...mapState('studentHome',['studentInfo'])
  },
  methods:{
    postStudentInfo(studentId){
      postStudentInfo({
        studentId
      }).then(result=>{
        let res = result.data
        if (res.resultCode === 200){
          this.userInfo.userName = res.data.studentName
          this.userInfo.userId = res.data.studentId
          this.$store.state.studentHome.studentInfo = res.data
        }
      })
    },
  },
  created() {
    this.postStudentInfo(this.user.userId)
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
}
</script>

<style scoped lang="less">
.el-header,.el-main,.el-footer{
  padding: 0;
}


.el-header{
  height: 120px;
}

.el-main{
  display: flex;
  justify-content: flex-start;

  .mycontainer{
    max-width: 400px;
    min-width: 400px;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0px 5px 5px #adadad;
  }

  .timeShow{
    height: 300px;
  }

  .right{
    display: flex;
    flex-wrap: wrap;
    justify-content:flex-start;
  }

}



</style>