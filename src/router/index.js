import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/LoginView/index'
import Error from '../views/errorView/index'
import student from "./studentRouter/Student"
import ChooseInstructorRouter from "./studentRouter/ChooseInstructorRouter";
import teacher from "./teacherRouter/Teacher";
import admin from "./adminRouter/Admin";
import topicManagement from "./teacherRouter/graduationDesign/TopicManagement";
import topicDetails from "./teacherRouter/graduationDesign/TopicDetails";
import twoWaySelectionTV from "./teacherRouter/graduationDesign/TwoWaySelectionT";
import teamView from "./teacherRouter/graduationDesign/Team";

import editResume from "./teacherRouter/EditResume"
import browseTeacherResumeRouter from "./studentRouter/BrowseTeacherResumeRouter";
import readTheAnnouncementRouter from "./publicRouter/readTheAnnouncementRouter";

import testView from './publicRouter/testView'
import thesisProposalView from "./studentRouter/ThesisProposalRouter";
import thesisProposalAuditByDH from "./teacherRouter/studentProcessDocumentation/ThesisProposalAuditByDHView";
import thesisView from "./studentRouter/ThesisView";
import thesisSubmitRouter from "./studentRouter/ThesisSubmitRouter";
import thesisDetailViewRouter from "./studentRouter/ThesisDetailViewRouter";
import accountViewRouter from "./studentRouter/AccountViewRouter";
import editPassword from "./publicRouter/EditPassword";
import accountHomeOfTeacher from "./teacherRouter/account/accountHomeOfTeacher"
import thesisFinalSubmitView from "./studentRouter/ThesisFinalSubmitViewRouter";
import thesisFinalViewRouter from "./studentRouter/ThesisFinalViewRouter";
Vue.use(VueRouter)


//问题：NavigationDuplicated: Avoided redundant navigation to current location: "/MyTeam".
//解决vue路由重复导航错误
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      title:'登录页面',
      requiresAuth: false
    },
    props:true
  },{
    path:'/error',
    name:Error,
    component: Error,
  },
  student,
  ChooseInstructorRouter,
  browseTeacherResumeRouter,
  thesisProposalView,
  thesisView,
  thesisSubmitRouter,
  thesisDetailViewRouter,
  thesisFinalViewRouter,
  thesisFinalSubmitView,
  accountViewRouter,
  teacher,
  admin,

  topicManagement,
  topicDetails,
  twoWaySelectionTV,
  teamView,
  editResume,
  thesisProposalAuditByDH,
  accountHomeOfTeacher,
    //public
  readTheAnnouncementRouter,
  testView,


  editPassword,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由拦截
router.beforeEach((to,from,next) => {
  let isLogged = window.sessionStorage.getItem("token") === null
  if(to.path === "/"){
    next("/login")
  }
  if(to.path === "/login"){
    if (isLogged){
      next()
    }else{
      next("/error")
    }
  }else{
    if (to.meta.requiresAuth){
      if (isLogged){
        next("/login")
      }else{
        if (to.meta.role===null){
          next()
        }else{
          let configRole = to.meta.role
          let roleIdList = window.sessionStorage.getItem("user")
          for (let i = 0;i<roleIdList.length;i++){
            if (configRole.substring(0,1) === roleIdList[i].toString().substring(0,1)){
              next()
              return
            }
          }
          next("/error")
        }
      }
    }else{
      next()
    }
  }
})

router.afterEach((to)=>{
  document.title = to.meta.title===null? "毕业论文管理系统":to.meta.title
})

export default router
