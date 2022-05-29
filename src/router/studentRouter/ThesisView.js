import ThesisView from '../../views/studentView/ProcessDocumentationView/ThesisView'

const thesisView={
    path:'/thesisView',
    name:'ThesisView',
    component:ThesisView,
    meta: {
        title:'提交开题报告',
        requiresAuth: true,
        role:'3000'
    }
}

export default thesisView