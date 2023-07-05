import accountViewRouter from "@/router/studentRouter/AccountViewRouter";
import browseTeacherResumeRouter from "@/router/studentRouter/BrowseTeacherResumeRouter";
import chooseInstructorRouter from "@/router/studentRouter/ChooseInstructorRouter";
import ThesisAboutRouter from "@/router/studentRouter/ThesisAbout";
import {StudentPageName, StudentRouterEnum, StudentRouterName, StudentRouterPage} from "@/util/constant/router/student";

const studentRouter = [
  {
    path: StudentRouterPage[StudentRouterEnum.StudentHomeView],
    name: StudentRouterName[StudentRouterEnum.StudentHomeView],
    component: () => import("@/views/studentView/HomeView/index.vue"),
    meta: {
      title: StudentPageName[StudentRouterEnum.StudentHomeView],
      role:'3000',
      requiresAuth: true
    },
  },
  accountViewRouter,
  browseTeacherResumeRouter,
  chooseInstructorRouter,
  ...ThesisAboutRouter
]

export default studentRouter
