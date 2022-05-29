import ThesisFinalView from '../../views/studentView/ProcessDocumentationView/ThesisFinalView'

const thesisFinalViewRouter = {
    path:'/student/thesisFinalView',
    name:'ThesisFinalView',
    component:ThesisFinalView,
    meta: {
        title:'毕业设计论文提交记录(最终版）',
        requiresAuth: true,
        role:'3000'
    }
}

export default thesisFinalViewRouter