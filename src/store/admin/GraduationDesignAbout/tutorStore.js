const tutorStore = {
    namespaced:true,
    state:{
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
        selectGroup:{
            roleId:null,
            collegeId:null,
        },
        roleList:[],
        collegeList:[],
    },
    mutations:{
        setCollegeList(state,collegeList){
            state.collegeList = collegeList
        },
        setRoleList(state,roleList){
            state.roleList = roleList
        },
        updateSearchCollegeId(state, collegeId) {
            state.selectGroup.collegeId = collegeId
        },

        updateSearchRoleId(state, roleId) {
            state.selectGroup.roleId = roleId
        },
        ClearOptionsValue(state) {
            state.selectGroup.collegeId = null;
            state.selectGroup.roleId = null;
        }
    },
    actions: {
    },
    modules: {
    }
}

export default tutorStore;