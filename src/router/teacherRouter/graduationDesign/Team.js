import Team from '../../../views/teacherView/graduationDesign/teamView/index'
import MyTeam from '../../../views/teacherView/graduationDesign/teamView/childrensView/myTeam'
import TeamMember from '../../../views/teacherView/graduationDesign/teamView/childrensView/TeamMember'
import ThesisProposalSubmittedTable from '../../../views/teacherView/graduationDesign/teamView/childrensView/ThesisProposalSubmittedTable'
import ThesisSubmittedTable from '../../../views/teacherView/graduationDesign/teamView/childrensView/ThesisSubmittedTable'
import ThesisProposalAuditView from '../../../views/teacherView/graduationDesign/teamView/ThesisProposalAuditView'
import ThesisRecordOfStudent from '../../../views/teacherView/graduationDesign/teamView/ThesisRecordOfStudent'
import ThesisAuditView from '../../../views/teacherView/graduationDesign/teamView/ThesisAuditView'
import ThesisFinalSubmittedTable from '../../../views/teacherView/graduationDesign/teamView/childrensView/ThesisFinalSubmittedTable'
import ThesisFinalDetailView from '../../../views/teacherView/graduationDesign/teamView/ThesisFinalDetailView'

const teamView={
    path:'/team',
    name:'Team',
    component:Team,
    meta:{
        title:'毕业设计小组',
        role:'2000',
        requiresAuth:true,
    },
    children:[
        {
            path:'/',
            name:'MyTeam',
            component: MyTeam,
            meta:{
                title:'我的小组',
                role:'2000',
                requiresAuth:true,
            },
        },{
            path:'/teamMember',
            name:'TeamMember',
            component: TeamMember,
            meta:{
                title:'小组成员',
                role:'2000',
                requiresAuth:true,
            },
        },{
            path: '/thesisProposalSubmittedTable',
            name:'ThesisProposalSubmittedTable',
            component: ThesisProposalSubmittedTable,
            meta:{
                title:'开题报告列表',
                role:'2000',
                requiresAuth:true,
            },
        },{
            path:'/thesisProposalAuditView',
            name:'ThesisProposalAuditView',
            component: ThesisProposalAuditView,
            meta: {
                title: "开题报告审核",
                role:'2000',
                requiresAuth: true,
            },
            props:true
        },{
            path:'/thesisSubmittedTable',
            name:'ThesisSubmittedTable',
            component: ThesisSubmittedTable,
            meta: {
                title: "毕业论文列表",
                role:'2000',
                requiresAuth: true,
            },
        },{
            path:'/thesisRecordOfStudent',
            name:'ThesisRecordOfStudent',
            component: ThesisRecordOfStudent,
            meta:{
                title:'学生论文提交记录',
                role:'2000',
                requiresAuth: true,
            },
            props:true
        },{
            path:'/thesisAuditView',
            name:'ThesisAuditView',
            component: ThesisAuditView,
            meta:{
                title:'学生论文提交记录',
                role:'2000',
                requiresAuth: true,
            },
            props:true
        },{
            path:'/thesisFinalSubmittedTable',
            name:'ThesisFinalSubmittedTable',
            component: ThesisFinalSubmittedTable,
            meta:{
                title:'学生论文(最终版）提交记录',
                role:'2000',
                requiresAuth: true,
            },
        },{
            path:'/thesisFinalDetailView',
            name:'ThesisFinalDetailView',
            component: ThesisFinalDetailView,
            meta: {
                title:'学生论文(最终版）详情',
                role:'2000',
                requiresAuth: true,
            },
            props:true
        }

    ]
}

export default teamView