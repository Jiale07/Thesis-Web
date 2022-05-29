const thesisProposalAudit={
    namespaced:true,
    state:{
        thesisProposalId:null,
        webViewRoleId: null
    },
    mutations:{
        setThesisProposalId(state,value){
            state.thesisProposalId = value
        },

        setWebViewRoleId(state,value){
            state.webViewRoleId = value
        },

        clearData(state){
            state.thesisProposalId = null
            state.webViewRoleId = null
        }
    },
    actions:{

    },
    modules:{

    }
}

export default thesisProposalAudit