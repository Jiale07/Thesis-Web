const choiceInstructor = {
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
            tableData:null,
        },
        searchData:{
            collegeId:null,
            categoryId:null,
            topicName:null,
            teacherName:null,
        },

    },
    mutations:{
        setSearchCollegeId(state,collegeId){
            state.searchData.collegeId = collegeId
        },

        setSearchCategoryId(state,categoryId){
            state.searchData.categoryId = categoryId
        },

        setSearchTopicName(state,topicName){
            state.searchData.topicName = topicName
        },


        setSearchTeacherName(state,topicName){
            state.searchData.teacherName = topicName
        },

        getTableData(state){
            return state.pageInfo.tableData
        },

        setTableData(state,value){
            state.pageInfo.tableData = value
        },

        setPageInfoCollegeId(state,value){
            state.studentInfo.collegeId = value
        },

        emptySearch(state,value){
            if(value==='all'){
                state.searchData = {
                    collegeId:null,
                    categoryId:null,
                    topicName:null,
                    teacherName:null,
                }
            }else{
                state.searchData.topicName = null
                state.searchData.teacherName = null
                state.searchData.categoryId = null
            }
        },

        emptyPageInfo(state){
            state.pageInfo = {
                //当前页数
                current_page: 1,
                total:100,
                //每页显示条目个数
                page_size:10,
                pager_Count:8,
                //最大页数
                page_count:0,
                page_sizes:[5, 10, 15, 20],
                tableData:[],
            }
        }

    },
    actions:{

    },
    modules:{

    }
}


export default choiceInstructor