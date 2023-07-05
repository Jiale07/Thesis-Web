import EditPassword from "../../views/publicView/EditPassowrd"

const editPassword = {
    path:'/account/editPassword',
    name:'EditPassword',
    component:EditPassword,
    meta: {
        title:'更改密码',
        role:['1000','2000','3000'],
        requiresAuth: false
    },
}

export default editPassword