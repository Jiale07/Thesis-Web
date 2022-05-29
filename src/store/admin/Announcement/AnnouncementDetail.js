const announcementDetail={
    namespaced:true,
    state:{
        announcementId:'',
    },
    mutations:{
        setAnnouncementId(state,value){
            state.announcementId = value;

        },

        empty(state){
            state.announcementId = null
        }
    },
    actions: {
    },
    modules: {
    }
}

export default announcementDetail;