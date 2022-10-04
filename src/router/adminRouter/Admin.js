import Admin from "../../views/adminView/Home";
import Hello from "../../views/adminView/Hello";

import StudentInfo from "../../views/adminView/InfoManagement/StudentInfo/studentInfo";
import TeacherInfo from "../../views/adminView/InfoManagement/TeacherInfo";
import College from "../../views/adminView/InfoManagement/CollegeInfo";
import Major from "../../views/adminView/InfoManagement/MajorInfo";

import Role from "../../views/adminView/RoleManagement/RoleView"
import RolePermission from "../../views/adminView/RoleManagement/RolePermission"
import Permission from "../../views/adminView/RoleManagement/PermissionView"

import TutorsView from '../../views/adminView/GraduationDesign/TutorsView'
import TopicCategory from "../../views/adminView/GraduationDesign/TopicCategoryView";
import AnnouncementCategory from '../../views/adminView/Announcement/AnnouncementCategoryView'
import Announcement from '../../views/adminView/Announcement/AnnouncementView'
import AnnouncementDetail from '../../views/adminView/Announcement/AnnouncementDetailView'
import ThesisProposalSetting from '../../views/adminView/WebViewSetting/ThesisProposalSettingView'
import ThesisSettingView from '../../views/adminView/WebViewSetting/ThesisSettingView'
import AuditStatusCategorySettingView from '../../views/adminView/WebViewSetting/AuditStatusCategorySettingVIew'
import ApprovalProcessSetting from "../../views/adminView/WebViewSetting/approvalProcessSetting";
const admin = {
    path:'/admin',
    name:'Admin',
    component: Admin,
    meta: {
        title: '管理员',
        role:'1000',
        requiresAuth: true
    },
    children:[
        {
            path:'/',
            name:'Hello',
            component: Hello,
            meta: {
                title:'管理员',
                role:'1000',
                requiresAuth: true
            }
        },
        {
            path:'/adminRouter/studentInfo',
            name:'StudentInfo',
            component:StudentInfo,
            meta:{
                title:'学生信息管理',
                role:'1000',
                requiresAuth: true
            }
        },{
            path:'/adminRouter/teacherInfo',
            name:'TeacherInfo',
            component:TeacherInfo,
            meta:{
                title:'教师信息管理',
                role:'1000',
                requiresAuth: true
            }
        },
        {
            path:'/adminRouter/collegeInfo',
            name:'College',
            component: College,
            meta:{
                title:'学院信息管理',
                role:'1000',
                requiresAuth: true
            }
        },
        {
            path:'/adminRouter/majorInfo',
            name:'Major',
            component: Major,
            meta:{
                title:'专业信息管理',
                role:'1000',
                requiresAuth: true
            }
        },{
            path:'/role',
            name:'Role',
            component: Role,
            meta:{
                title:'角色管理',
                role:'1000',
                requiresAuth: true
            }
        },{
            path:'/rolePermission',
            name:'RolePermission',
            component: RolePermission,
            meta: {
                title:'角色权限',
                role:'1000',
                requiresAuth: true
            },
            props:true,
        },{
            path: '/permission',
            name: 'Permission',
            component: Permission,
            meta: {
                title:'权限管理',
                role:'1000',
                requiresAuth: true
            }
        },{
            path: '/tutorView',
            name: 'TutorsView',
            component: TutorsView,
            meta: {
                title: '毕业设计导师管理页面',
                role:'1000',
                requiresAuth: true
            }
        },{
            path:'/topicCategory',
            name:'TopicCategory',
            component: TopicCategory,
            meta: {
                title: '毕业论文类型管理页面',
                role:'1000',
                requiresAuth: true
            },
        },{
            path:'/admin/Announcement',
            name:'Announcement',
            component: Announcement,
            meta: {
                title: '公告管理',
                role:'1000',
                requiresAuth: true
            },
        },{
            path:'/admin/announcementCategory',
            name:'AnnouncementCategory',
            component: AnnouncementCategory,
            meta: {
                title: '公告分类管理',
                role:'1000',
                requiresAuth: true
            },
        },{
            path: '/admin/announcementDetail',
            name:'AnnouncementDetail',
            component: AnnouncementDetail,
            meta: {
                title: '公告详情',
                role:'1000',
                requiresAuth: true
            },
            props: true
        },{
            path:'/admin/thesisProposalSetting',
            name:'ThesisProposalSetting',
            component: ThesisProposalSetting,
            meta: {
                title: '开题报告页面设置',
                role:'1000',
                requiresAuth: true
            },
        },{
            path:'/admin/auditStatusCategorySettingView',
            name:'AuditStatusCategorySettingView',
            component: AuditStatusCategorySettingView,
            meta: {
                title: '开题报告页面设置',
                role:'1000',
                requiresAuth: true
            },
        },{
            path:'/admin/thesisSettingView',
            name:'ThesisSettingView',
            component: ThesisSettingView,
            meta:{
                title: '毕业设计论文提交页面设置',
                role:'1000',
                requiresAuth: true,
            }
        },{
            path: '/admin/approvalProcessSetting',
            name: 'ApprovalProcessSetting',
            component: ApprovalProcessSetting,
            meta: {
                title: '开题报告审批流设置页面',
                role: '1000',
                requiresAuth: true,
            }
        }
    ]
}

export default admin