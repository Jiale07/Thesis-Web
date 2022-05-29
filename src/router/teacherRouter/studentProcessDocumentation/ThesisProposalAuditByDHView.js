import ThesisProposalAuditByDH from '../../../views/teacherView/studentProcessDocumentation/ThesisProposalAuditByDH'

const thesisProposalAuditByDH = {
    path:'/thesisProposalAuditByDH',
    name:'ThesisProposalAuditByDH',
    component: ThesisProposalAuditByDH,
    meta: {
        title:'开题报告审核',
        role:'2000',
        requiresAuth: true
    },
}

export default thesisProposalAuditByDH