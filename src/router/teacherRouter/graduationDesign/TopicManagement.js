import TopicManagement from "../../../views/teacherView/graduationDesign/topicView"

const topicManagement={
    path:'/topicManagement',
    name:'TopicManagement',
    component:TopicManagement,
    meta:{
        title:'教师毕业设计题目管理',
        role:'2000',
        requiresAuth:true,
    }
}

export default topicManagement