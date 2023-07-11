import EditPassword from "@/router/publicRouter/editPassword";
import ReadTheAnnouncement from "@/router/publicRouter/readTheAnnouncementRouter";
import Login from "@/views/LoginView/index.vue";
import Error from "@/views/errorView/index.vue";
import customForm from "@/router/publicRouter/customForm";

const publicRouter = [
  EditPassword,
  ReadTheAnnouncement,
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录页面',
      requiresAuth: false
    },
    props: true
  }, {
    path: '/error',
    name: Error,
    component: Error,
  },
  customForm,
]

export default publicRouter
