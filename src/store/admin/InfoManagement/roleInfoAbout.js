const roleInfoAbout = {
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
        roleInfo:{
            roleId:'',
            roleName:''
        },
        permission:[],
    },
    mutations:{
        setPermission(state,permission){
            state.permission = permission
        },

        getPermission(state){
            return state.permission
        }
    },
    actions: {
    },
    modules: {
    }
}

export default roleInfoAbout