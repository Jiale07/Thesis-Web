<template>
  <div>
    <div class="breadcrumbBox">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/team' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>毕业设计论文（最终版）提交记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-table
          :data="tableData"
          strip
          :empty-text="emptyText"
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
<!--        <el-table-column-->
<!--            label="提交状态">-->
<!--          <template slot-scope="scope">-->
<!--            <span v-if="scope.row.submitStatus" :style="{color:'#67c23a'}">已提交</span>-->
<!--            <span v-if="!scope.row.submitStatus" :style="{color:'#f56c6c'}">未提交</span>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="submitTheNumber"-->
<!--            label="提交次数">-->
<!--        </el-table-column>-->
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="toThesisFinalRecordOfStudent(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {postGDTeamMemberThesisFinalList} from "../../../../../axios/teacher/GDTeamAbout/ThesisFinalSubmittedTableAbout";
import {mapState} from "vuex";

export default {
  name: "ThesisFinalSubmittedTable",
  data(){
    return {
      tableData:[],
      emptyText:'',
    }
  },
  computed:{
    ...mapState('teamAboutStore',['teamInfo'])
  },
  methods:{

    initialization(){
      postGDTeamMemberThesisFinalList({
        gdTeamId:this.teamInfo.id
      }).then(result=>{
        let res = result.data
        if(res.resultCode===200){
          this.tableData = res.data
        }else{
          this.emptyText = res.message
        }
      })
    },

    toThesisFinalRecordOfStudent(row){
      this.$router.push({
        name:'ThesisFinalDetailView',
        params:{
          studentId:row.studentId
        }
      })
    }
  },

  created() {
    this.initialization()
  }
}
</script>

<style scoped>
.breadcrumbBox{
  margin-bottom: 20px;
}
</style>