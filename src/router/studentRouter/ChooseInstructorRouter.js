import ChooseInstructor from "../../views/studentView/independentChoice/ChooseInstructorView"
import {StudentPageName, StudentRouterEnum, StudentRouterName, StudentRouterPage} from "@/util/constant/router/student";

const ChooseInstructorRouter = {
    path: StudentRouterPage[StudentRouterEnum.ChooseInstructor],
    name: StudentRouterName[StudentRouterEnum.ChooseInstructor],
    component: ChooseInstructor,
    meta: {
        title: StudentPageName[StudentRouterEnum.ChooseInstructor],
        requiresAuth: true,
        role:'3000'
    }
}

export default ChooseInstructorRouter
