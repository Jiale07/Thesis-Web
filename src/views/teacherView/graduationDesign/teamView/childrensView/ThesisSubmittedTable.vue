<template>
  <div>
    <div class="breadcrumbBox">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/team' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>小组成员论文提交情况</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-table
          :data="pageInfo.tableData"
          stripe
          style="width: 100%">
        <el-table-column
            prop="studentId"
            label="学号">
        </el-table-column>
        <el-table-column
            prop="studentName"
            label="学生名称">
        </el-table-column>
        <el-table-column
            prop="thesisTopicName"
            label="毕业设计论文题目">
        </el-table-column>
        <el-table-column
            prop="thesisTopicCategory"
            label="题目类型">
        </el-table-column>
        <el-table-column
            label="提交状态">
          <template slot-scope="scope">
            <span v-if="scope.row.submitStatus" :style="{color:'#67c23a'}">已提交</span>
            <span v-if="!scope.row.submitStatus" :style="{color:'#f56c6c'}">未提交</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="submitTheNumber"
            label="提交次数">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="toThesisRecordOfStudent(scope.row)">审批</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {postThesisTableViewVOPage} from "../../../../../axios/teacher/GDTeamAbout/ThesisSubmittedTableAbout";
import {mapState} from "vuex";

export default {
  name: "ThesisSubmittedTable",
  data(){
    return{
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
    }
  },
  computed:{
    ...mapState('teamAboutStore',['teamInfo'])
  },
  methods:{
    toThesisRecordOfStudent(row){
      this.$router.push({
        name:'ThesisRecordOfStudent',
        params:{
          propsStudentId:row.studentId
        }
      })
    },

    postThesisTableViewVOPage(currentPage,pageSize,teamId){
      postThesisTableViewVOPage({
        currentPage,
        pageSize,
        teamId,
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
        }
      })
    }
  },
  created() {
    this.postThesisTableViewVOPage(this.pageInfo.current_page,this.pageInfo.page_size,this.teamInfo.id)
  }
}
</script>

<style scoped lang="less">
.breadcrumbBox{
  margin-bottom: 20px;
}
</style>