import ThesisSubmitView from '../../views/studentView/ProcessDocumentationView/ThesisSubmitView'

const thesisSubmitRouter={
    path:'/thesisSubmitView',
    name:'ThesisSubmitView',
    component:ThesisSubmitView,
    meta: {
        title:'提交毕业设计论文',
        requiresAuth: true,
        role:'3000'
    }
}

export default thesisSubmitRouter