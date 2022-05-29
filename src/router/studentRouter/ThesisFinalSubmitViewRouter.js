import ThesisFinalSubmitView from '../../views/studentView/ProcessDocumentationView/ThesisFinalSubmitView'

const thesisFinalSubmitView={
    path:'/student/thesisFinalSubmitView',
    name:'ThesisFinalSubmitView',
    component:ThesisFinalSubmitView,
    meta: {
        title:'提交毕业设计论文(最终版）',
        requiresAuth: true,
        role:'3000'
    }
}

export default thesisFinalSubmitView