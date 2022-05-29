const studentHome = {
    namespaced:true,
    state:{
        studentInfo:[]
    },
    mutations:{
        getStudentInfo(state){
            return state.studentInfo
        },

        setStudentInfo(state,value){
            state.studentInfo = value
        }
    },
    actions:{

    },
    modules:{

    }
}

export default studentHome