import ReadTheAnnouncement from '../../views/publicView/ReadTheAnnouncement'

const readTheAnnouncementRouter = {
    path:'/readTheAnnouncement',
    name:'ReadTheAnnouncement',
    component: ReadTheAnnouncement,
    meta: {
    title: '公告详情',
        role:null,
        requiresAuth: true
    },
    props:true
}

export default readTheAnnouncementRouter