import BrowseTeacherResume from '../../views/studentView/independentChoice/BrowseTeacherResumeView'

const browseTeacherResumeRouter = {
    path:'/browseTeacherResume',
    name:'BrowseTeacherResume',
    component: BrowseTeacherResume,
    meta: {
        title:'教师个人简介',
        requiresAuth: true,
        role:'3000'
    },
    props:true
}

export default browseTeacherResumeRouter