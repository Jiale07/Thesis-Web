/*
  这里是关于用户（学生、教师填写、查看自定义表单的内容）的自定表单有关的路由，与管理员中自定义表单不是同一个
 */

const customForm = {
  path: '/customFrom/create',
  name: 'CreateCustomForm',
  component: () => import("@/views/publicView/customForm/index.vue"),
  meta: {
    title: '自定义表单',
    role:['1000','2000','3000'],
    requiresAuth: false
  }
}


export default customForm
