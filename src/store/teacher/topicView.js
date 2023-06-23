const topicView = {
    namespaced:true,
    state:{
        topicDetails:{
            topicId:'',
        }
    },
    mutations:{
        setTopicDetailsTopicId(state,topicId){
            state.topicDetails.topicId = topicId
        }
    },
    actions: {
    },
    modules: {
    }
}

export default topicView
