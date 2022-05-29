import AccountHome from "../../views/studentView/accountView/home/index"
import BasicInformation from "../../views/studentView/accountView/BasicInformation"

const  accountViewRouter = {
    path:'/accountHome',
    name:'AccountHome',
    component:AccountHome,
    meta: {
        title:'学生',
        role:'3000',
        requiresAuth: true
    },
    children:[
        {
            path:'/',
            name:'BasicInformation',
            component:BasicInformation,
            meta: {
                title:'个人信息',
                role:'3000',
                requiresAuth: true
            },
        },
    ]
}

export default accountViewRouter