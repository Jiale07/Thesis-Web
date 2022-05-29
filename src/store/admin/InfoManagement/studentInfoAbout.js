const studentInfoAbout={
    namespaced:true,
    state:{
        selectGroup:{
            collegeId:'',
            majorId:'',
            classId:''
        },
        publicOption:{
            CollegeOptions: [],
        },
        search:{
            option:{
                MajorOptions: [],
                ClassIdOptions: [],
            },
            value:{
                CollegeIdValue: '',
                MajorIdValue: '',
                ClassIdValue: '',
            }
        },
        studentAdd:{
            option:{
                MajorOptions: [],
                // ClassIdOptions: [],
            },
            value:{
                CollegeIdValue: '',
                MajorIdValue: '',
                ClassIdValue: '',
            }
        },
        pageInfo:{
            //当前页数
            current_page: 1,
            total:100,
            //每页显示条目个数
            page_size:10,
            pager_Count:8,
            //最大页数
            page_count:0,
            page_sizes:[5, 10, 15, 20],
            tableData:[{}],
        },

        roleOptions:[]
    },
    mutations:{
        updateSearchCollegeId(state,collegeId){
            state.selectGroup.collegeId = collegeId
        },
        updateSearchMajorId(state,majorId){
            state.selectGroup.majorId = majorId
        },
        updateSearchClassId(state,classId){
            state.selectGroup.classId = classId
        },
        updateRoleOptions(state,value){
            state.roleOptions = value
        },
        ClearOptionsValue(state) {
            state.selectGroup.collegeId = '';
            state.selectGroup.majorId = '';
            state.selectGroup.classId = '';
            state.roleOptions = [];
            state.search.option.MajorOptions=[];
            state.search.option.ClassIdOptions=[];
        }
    },
    actions: {
    },
    modules: {
    }
}

export default studentInfoAbout;