<template>
  <div>
    <template>
      <el-table
          :data="pageInfo.tableData"
          style="width: 100%">
        <el-table-column
            label="名称"
            prop="topicName">
        </el-table-column>
        <el-table-column
            label="描述"
            prop="description">
        </el-table-column>
        <el-table-column
            align="right">
          <template slot="header" slot-scope="scope">
            <div class="searchDiv" >
              <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入关键字搜索"
                  @keyup.enter.native="searchFunc(scope)"/>
              <el-button type="primary" size="mini" @click="searchFunc(scope)">搜索</el-button>
            </div>
          </template>
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">详情</el-button>
            <el-popconfirm
                style="margin: 0 10px"
                title="再次确认是否要删除改课题"
                cancel-button-text="取消"
                confirm-button-text="确定"
                @confirm="handleDelete(scope.$index, scope.row)"
            >
              <el-button slot="reference" size="mini" type="danger">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.current_page"
        :page-sizes="pageInfo.page_sizes"
        :page-size="pageInfo.page_size"
        :page-count="pageInfo.page_count"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        class="myPageStyle">
    </el-pagination>
  </div>
</template>

<script>

import {deletedTopic, findAllTopicPage} from "../../../../../axios/teacher/GraduationDesignAbout/TopicView";
import {mapState} from "vuex";

export default {
  name: "TopicShow",
  data(){
    return{
      search: '',
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
    }
  },
  computed:{
    ...mapState('loginAbout',['user'])
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push({
        name:'TopicDetails',
        params:{
          topicId:row.id
        }
      })
    },
    handleDelete(index, row) {
      console.log(index, row);
      deletedTopic({
        topicId:row.id
      }).then(res=>{
        let result = res.data
        if (result.resultCode){
          this.$message({
            type:'success',
            message:result.message
          })
          this.$router.go(0)
        }else{
          this.$message({
            type:'error',
            message:result.message
          })
        }
      })
    },
    searchFunc(){
      console.log(this.search)
    },

    handleSizeChange(){

    },
    handleCurrentChange(){

    },

    getTopicList(currentPage,pageSize){
      findAllTopicPage({
        currentPage,
        pageSize,
        teacherId:this.user.userId
      }).then(res=>{
        let result = res.data
        if (result.resultCode){
          this.pageInfo.current_page = result.data.current
          //总条数
          this.pageInfo.total = result.data.total
          //结果集
          this.pageInfo.tableData = result.data.records
          //最大页数
          this.pageInfo.page_count = result.data.pages
        }else{
          this.$message({
            type:'error',
            message:result.message
          })
        }
      })
    }
  },
  created() {
    this.getTopicList(this.pageInfo.current_page,this.pageInfo.page_size)
  },
}
</script>

<style scoped lang="less">
.searchDiv{
  display: flex;
  justify-content: left;

  .el-input{
    width: 240px;
  }
}

.myPageStyle{
  padding-top: 10px;
  text-align: center;
}
</style>