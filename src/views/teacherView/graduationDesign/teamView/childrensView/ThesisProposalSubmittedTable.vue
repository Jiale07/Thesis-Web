<template>
  <div>
    <div class="breadcrumbBox">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/team' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>开提报告列表（已提交）</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h4>已经提交的开提报告：</h4>
    <el-table
        :data="pageInfo.tableData"
        v-loading="loading"
        stripe
        :empty-text="emptyText"
        style="width: 100%">
      <el-table-column
          type="index"
          width="50">
      </el-table-column>
      <el-table-column
          prop="studentName"
          label="学生姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="thesisName"
          label="题目名称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="thesisCategoryName"
          label="题目类型"
          width="180">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <div @click="toThesisProposalDetail(scope.row)">
            <span class="textButton">更多信息</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div>
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
  </div>
</template>

<script>
import {postThesisProposalSubmitted} from "../../../../../axios/teacher/GDTeamAbout/ThesisProposalSubmittedTable";
import {mapState} from "vuex";

export default {
  name: "ThesisProposalSubmittedTable",
  data(){
    return {
      pageInfo:{
        //当前页数
        current_page: 1,
        total:0,
        //每页显示条目个数
        page_size:10,
        pager_Count:8,
        //最大页数
        page_count:0,
        page_sizes:[5, 10, 15, 20],
        tableData:null,
      },
      loading:true,
      emptyText:''
    }
  },
  computed:{
    ...mapState('teamAboutStore',['teamInfo'])
  },
  methods:{
    postThesisProposalSubmitted(currentPage,pageSize,teamId){
      postThesisProposalSubmitted({
        currentPage,
        pageSize,
        teamId
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          //当前页数
          this.pageInfo.currentPage = res.data.current
          //总条数
          this.pageInfo.total = res.data.total
          //结果集
          let records = res.data.records
          this.pageInfo.tableData = records
          //最大页数
          this.pageInfo.pageCount = res.data.pages
        }else{
          this.emptyText = res.message
        }
        setTimeout(()=>{
          this.loading = false
        },0)
      })
    },

    handleSizeChange(val){
      this.postThesisProposalSubmitted(this.pageInfo.current_page,val,this.teamInfo.id)
    },
    handleCurrentChange(val){
      this.postThesisProposalSubmitted(val,this.pageInfo.page_size,this.teamInfo.id)
    },

    toThesisProposalDetail(row){
      this.$router.push({
        name:'ThesisProposalAuditView',
        params:{
          tpId:row.thesisProposalId,
          WebViewRoleId:2002,
        }
      })
    },
  },
  created() {
    this.postThesisProposalSubmitted(this.pageInfo.current_page,this.pageInfo.page_size,this.teamInfo.id)
  }
}
</script>

<style scoped lang="less">

.breadcrumbBox{
  margin-bottom: 20px;
}
.myPageStyle{
  padding-top: 10px;
  text-align: center;
}

.textButton{
  color: #007bbb;
}

.textButton:hover{
  cursor:pointer
}
</style>