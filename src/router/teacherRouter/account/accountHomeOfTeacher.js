import AccountHomeOfTeacher from "../../../views/teacherView/accountView/accountHome"
import BasicInformationOfTeacher from "../../../views/teacherView/accountView/BasicInformationOfTeacher"
import ResumeView from "../../../views/teacherView/accountView/ResumeView";

const accountHomeOfTeacher = {
    path:"/teacher/account/accountHome",
    name:'AccountHomeOfTeacher',
    component:AccountHomeOfTeacher,
    meta:{
        title:'个人信息',
        role:'2000',
        requiresAuth: true
    },
    props:true,
    children:[
        {
            path:"/teacher/account/accountHome/",
            name:'BasicInformationOfTeacher',
            component:BasicInformationOfTeacher,
            meta:{
                title:'教师个人基础信息',
                role:'2000',
                requiresAuth: true
            },
            props:true,
        },{
            path:'/teacher/account/teacherResume',
            name:'TeacherResume',
            component:ResumeView,
            meta:{
                title:'个人简介',
                role:'2000',
                requiresAuth: true
            }
        }
    ]
}

export default accountHomeOfTeacher