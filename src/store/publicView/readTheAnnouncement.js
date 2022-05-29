const readTheAnnouncement={
    namespaced:true,
    state:{
        announcementId:null,
    },
    mutations:{
        setAnnouncementId(state, value) {
            state.announcementId = value
        }
    },
    actions: {
    },
    modules: {
    }
}

export default readTheAnnouncement