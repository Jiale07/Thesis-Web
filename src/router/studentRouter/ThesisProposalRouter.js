import ThesisProposalView from '../../views/studentView/ProcessDocumentationView/ThesisProposalView'

const thesisProposalView={
    path:'/thesisProposal',
    name:'ThesisProposalView',
    component:ThesisProposalView,
    meta: {
        title:'提交开题报告',
        requiresAuth: true,
        role:'3000'
    },
    props:true
}

export default thesisProposalView