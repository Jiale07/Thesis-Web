import Vue from 'vue'
import VueRouter from 'vue-router'
import teacher from "./teacherRouter/Teacher";
import admin from "./adminRouter/index";
import topicManagement from "./teacherRouter/graduationDesign/TopicManagement";
import topicDetails from "./teacherRouter/graduationDesign/TopicDetails";
import twoWaySelectionTV from "./teacherRouter/graduationDesign/TwoWaySelectionT";
import teamView from "./teacherRouter/graduationDesign/Team";

import editResume from "./teacherRouter/EditResume"
import thesisProposalAuditByDH from "./teacherRouter/studentProcessDocumentation/ThesisProposalAuditByDHView";
import accountHomeOfTeacher from "./teacherRouter/account/accountHomeOfTeacher"
import publicRouter from "@/router/publicRouter";
import studentRouter from "@/router/studentRouter";

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
  ...publicRouter,
  admin,
  ...studentRouter,
  teacher,
  topicManagement,
  topicDetails,
  twoWaySelectionTV,
  teamView,
  editResume,
  thesisProposalAuditByDH,
  accountHomeOfTeacher,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由拦截
router.beforeEach((to, from, next) => {
  let isLogged = window.sessionStorage.getItem("token") === null
  if (to.path === "/") {
    // 空路由处理
    next("/login")
  }
  if (to.path === "/login") {
    if (isLogged) {
      next()
    } else {
      next("/error")
    }
  } else {
    if (to.meta.requiresAuth) {
      if (isLogged) {
        next("/login")
      } else {
        if (to.meta.role === null) {
          next()
        } else {
          let configRole = to.meta.role
          let roleIdList = window.sessionStorage.getItem("user")
          for (let i = 0; i < roleIdList.length; i++) {
            if (configRole.substring(0, 1) === roleIdList[i].toString().substring(0, 1)) {
              next()
              return
            }
          }
          next("/error")
        }
      }
    } else {
      next()
    }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title === null ? "毕业论文管理系统" : to.meta.title
})

export default router
