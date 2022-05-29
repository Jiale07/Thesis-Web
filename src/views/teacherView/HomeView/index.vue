<template>
  <div>
    <el-container :style="{minHeight:asideHeight+'px'}">
      <el-header height="120px">
<!--        header-->
        <Header
            :userTitle="userTitle"
            :userInfo="userInfo"
        ></Header>
        <Nav :menu="menu"></Nav>
      </el-header>
      <el-main>
<!--        main-->
        <div class="left">
          <div class="timeShow myContainer">
            <ClockComponent></ClockComponent>
          </div>
          <div class="announcement myContainer">
            <AnnouncementListComponent></AnnouncementListComponent>
          </div>
        </div>
        <div class="right">
          <div class="myContainer">

          </div>
          <div class="myContainer">

          </div>
          <div class="myContainer">

          </div>
          <div class="myContainer">

          </div>
          <div class="myContainer">

          </div>
        </div>
      </el-main>
      <el-footer>
<!--        footer-->
        <Footer/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import ClockComponent from '../../../components/ClockComponent'
import Nav from '../../../components/student/nav'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import {postTeacherInfo} from "../../../axios/teacher/TeacherHome";
import AnnouncementListComponent from '../../../components/AnnouncementListComponent'
import {mapState} from "vuex";
export default {
  name: "TeacherHome",
  data(){
    return{
      userTitle:'教师',
      menu:[
        {
          menuId:'1',
          title:'毕业设计',
          children:[
            {
              id:'1-1',
              text:'毕业设计课题管理',
              path:'/topicManagement',
              isDisabled:false
            },{
              id:'1-2',
              text:'学生拟题审批',
              isDisabled:true
            },{
              id:'1-3',
              text:'师生双向选择',
              path:'/twoWaySelectionTV',
              isDisabled:false
            },{
              id:'1-4',
              text:'毕业设计小组',
              path:'/team',
              isDisabled:false
            }
          ]
        },{
          menuId:'2',
          title:'信息查询',
          children:[
            {
              id:'2-1',
              text:'我的个人信息',
              path:'/teacher/account/accountHome',
              isDisabled:false
            },
          ]
        },{
          menuId:'3',
          title:'学生毕业设计过程文档',
          children:[
            {
              id:'2-1',
              text:'开题报告审核',
              path:'/thesisProposalAuditByDH',
              isDisabled:false
            }
          ]
        },
      ],
      asideHeight:'',
      userInfo:{
        userId:'',
        userName:'teacher',
      },
    }
  },
  computed:{
    ...mapState('loginAbout',['user'])
  },
  components:{
    Header,
    Nav,
    Footer,
    AnnouncementListComponent,
    ClockComponent
  },
  methods:{
    postTeacherInfo(teacherId){
      postTeacherInfo({
        teacherId
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.userInfo.userName= res.data.teacherName
          this.userInfo.userId = res.data.teacherId
          this.$store.state.teacherHome.teacherInfo = res.data
        }
      })
    },
  },
  created() {
    console.log(this.user.userId)
    this.postTeacherInfo(this.user.userId)
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

.el-main{
  display: flex;
  justify-content: flex-start;

.myContainer{
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

.announcement{

.item{
  margin-bottom: 10px;
}
}

.right{
  display: flex;
  flex-wrap: wrap;
  justify-content:flex-start;
}

}

</style>