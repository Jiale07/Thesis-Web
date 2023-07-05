import {StudentPageName, StudentRouterEnum, StudentRouterName, StudentRouterPage} from "@/util/constant/router/student";

const ThesisAboutRouter = [
  {
    path: StudentRouterPage[StudentRouterEnum.ThesisProposal],
    name: StudentRouterName[StudentRouterEnum.ThesisProposal],
    component: () => import("@/views/studentView/ProcessDocumentationView/ThesisProposalView/index.vue"),
    meta: {
      title: StudentPageName[StudentRouterEnum.ThesisProposal],
      requiresAuth: true,
      role: '3000'
    },
    props: true
  },
  {
    path: StudentRouterPage[StudentRouterEnum.ThesisView],
    name: StudentRouterName[StudentRouterEnum.ThesisView],
    component: () => import("@/views/studentView/ProcessDocumentationView/thesis"),
    meta: {
      title: StudentPageName[StudentRouterEnum.ThesisView],
      requiresAuth: true,
      role: '3000'
    }
  },
  {
    path: StudentRouterPage[StudentRouterEnum.ThesisSubmitView],
    name: StudentRouterName[StudentRouterEnum.ThesisSubmitView],
    component: () => import("@/views/studentView/ProcessDocumentationView/ThesisSubmitView/index.vue"),
    meta: {
      title: StudentPageName[StudentRouterEnum.ThesisSubmitView],
      requiresAuth: true,
      role: '3000'
    }
  },
  {
    path: StudentRouterPage[StudentRouterEnum.ThesisDetailView],
    name: StudentRouterName[StudentRouterEnum.ThesisDetailView],
    component: () => import("@/views/studentView/ProcessDocumentationView/ThesisDetailView/index.vue"),
    meta: {
      title: StudentPageName[StudentRouterEnum.ThesisDetailView],
      requiresAuth: true,
      role: '3000'
    },
    props: true
  },
  {
    path: StudentRouterPage[StudentRouterEnum.ThesisFinalSubmitView],
    name: StudentRouterName[StudentRouterEnum.ThesisFinalSubmitView],
    component: () => import("@/views/studentView/ProcessDocumentationView/ThesisFinalSubmitView/index.vue"),
    meta: {
      title: StudentPageName[StudentRouterEnum.ThesisFinalSubmitView],
      requiresAuth: true,
      role: '3000'
    }
  },
  {
    path: StudentRouterPage[StudentRouterEnum.ThesisFinalView],
    name: StudentRouterName[StudentRouterEnum.ThesisFinalView],
    component: () => import("@/views/studentView/ProcessDocumentationView/ThesisFinalView/index.vue"),
    meta: {
      title: StudentPageName[StudentRouterEnum.ThesisFinalView],
      requiresAuth: true,
      role: '3000'
    }
  },
]

export default ThesisAboutRouter
