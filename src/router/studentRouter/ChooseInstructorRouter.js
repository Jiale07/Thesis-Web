import ChooseInstructor from "../../views/studentView/independentChoice/ChooseInstructorView"

const ChooseInstructorRouter = {
    path:'/chooseInstructor',
    name:'ChooseInstructor',
    component: ChooseInstructor,
    meta: {
        title:'毕业设计双向选择',
        requiresAuth: true,
        role:'3000'
    }
}

export default ChooseInstructorRouter