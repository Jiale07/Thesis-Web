import Student from "../../views/studentView/HomeView";

const student= {
    path:'/student',
    name:'Student',
    component: Student,
    meta: {
        title:'学生',
        role:'3000',
        requiresAuth: true
    },
    children:[

    ]
}



export default student