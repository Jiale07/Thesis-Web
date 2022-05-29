const thesisRecordOfStudentStore = {
    namespaced:true,
    state:{
        studentId:null

    },
    mutations:{
        setStudentId(state,value){

            state.studentId = value
        },

        resetState(state){
            state.studentId = ''
        }
    },
    actions:{

    },
    modules:{

    }
}

export default thesisRecordOfStudentStore