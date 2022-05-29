const thesisFinalDetail={
    namespaced:true,
    state:{
        studentId:''
    },
    mutations:{
        setStudentId(state,value){
            state.studentId = value
        },

        closeState(){
            this.studentId = ""
        }
    },
    actions:{

    },
    modules:{

    }

}

export default thesisFinalDetail;