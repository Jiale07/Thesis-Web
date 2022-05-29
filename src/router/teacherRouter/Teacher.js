import Teacher from "../../views/teacherView/HomeView";

const teacher= {
    path:'/teacher',
    name:'Teacher',
    component: Teacher,
    meta: {
        title:'教师',
        role:'2000',
        requiresAuth: true
    },
}

export default teacher