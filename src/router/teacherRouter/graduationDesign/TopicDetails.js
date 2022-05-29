import TopicDetails from "../../../views/teacherView/graduationDesign/topicDetails"

const topicDetails = {
    path:'/topicDetails',
    name:'TopicDetails',
    component:TopicDetails,
    meta:{
        title:'毕业设计题目详情',
        role:'2000',
        requiresAuth:true
    },
    props:true
}

export default topicDetails