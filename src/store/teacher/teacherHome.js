const  teacherHome = {
    namespaced:true,
    state:{
        teacherInfo:[]
    },
    mutations:{
        getTeacherInfo(state){
            return state.studentInfo
        },

        setTeacherInfo(state,value){
            state.studentInfo = value
        }
    },
    actions:{

    },
    modules:{

    }
}

export default teacherHome