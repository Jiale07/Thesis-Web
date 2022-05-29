const topicView = {
    namespaced:true,
    state:{
        topicDetails:{
            topicId:'',
        }
    },
    mutations:{
        setTopicDetailsTopicId(state,topicId){
            console.log(topicId)
            state.topicDetails.topicId = topicId
        }
    },
    actions: {
    },
    modules: {
    }
}

export default topicView