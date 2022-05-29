import EditResumeView from "../../views/teacherView/accountView/EditResumeView";

const editResume = {
    path:'/teacher/account/editResume',
    name:'EditResume',
    component:EditResumeView,
    meta:{
        title:'个人简介编辑',
        role:'2000',
        requiresAuth: true
    },
    props:true
}

export default editResume;