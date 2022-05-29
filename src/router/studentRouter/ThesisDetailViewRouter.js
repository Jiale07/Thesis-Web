import ThesisDetailView from '../../views/studentView/ProcessDocumentationView/ThesisDetailView'

const thesisDetailViewRouter={
    path:'/thesisDetailView',
    name:'ThesisDetailView',
    component:ThesisDetailView,
    meta: {
        title:'毕业设计论文详情',
        requiresAuth: true,
        role:'3000'
    },
    props:true
}

export  default thesisDetailViewRouter