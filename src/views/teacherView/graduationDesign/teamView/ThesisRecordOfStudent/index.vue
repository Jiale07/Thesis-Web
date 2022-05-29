<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/team' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>小组成员论文提交情况</el-breadcrumb-item>
        <el-breadcrumb-item>学生论文提交记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <ThesisBasicInformationComponent
          :studentId="studentId"
      ></ThesisBasicInformationComponent>
    </div>
    <el-divider></el-divider>
    <div>
      <el-table
          :empty-text="emptyText"
          :data="pageInfo.tableData"
          stripe
          style="width: 100%">
        <el-table-column
            type="index"
            width="60">
        </el-table-column>
        <el-table-column
            prop="fileName"
            label="文件名称">
        </el-table-column>
        <el-table-column
            prop="submitTime"
            label="提交时间">
        </el-table-column>
        <el-table-column
            label="审核状态">
          <template slot-scope="scope">
            <span v-if="scope.row.auditStatusName===undefined || scope.row.auditStatusName===null ||scope.row.auditStatusName===''">未审核</span>
            <span v-else>{{scope.row.auditStatusName}}</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
                v-if="scope.row.auditStatusName===undefined || scope.row.auditStatusName===null ||scope.row.auditStatusName===''"
                size="mini"
                type="primary"
                @click="toThesisAuditView(scope.row)">{{ "审"+"   "+"核" }}</el-button>
            <el-button v-else size="mini" disabled>已审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import ThesisBasicInformationComponent from "../component/ThesisBasicInformationComponent"
import {mapState} from "vuex";
import {postThesisSubmittedRecordList} from "../../../../../axios/teacher/GDTeamAbout/ThesisRecordOfStudentAbout";
import {dateFormatter} from "../../../../../util/dateFormatter";
export default {
  name: "ThesisRecordOfStudent",
  props: ['propsStudentId'],
  data(){
    return{
      ThesisProposalAuditVO:{},
      StudentId:'',
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
      emptyText:'',
    }
  },
  computed:{
    ...mapState("thesisRecordOfStudentStore",['studentId'])
  },
  components:{
    ThesisBasicInformationComponent
  },
  methods:{
    toThesisAuditView(row) {
      this.$router.push({
        name:'ThesisAuditView',
        params:{
          propsThesisId:row.thesisId,
        }
      })
    },

    postThesisSubmittedRecordList(currentPage,pageSize,studentId){
      postThesisSubmittedRecordList({
        currentPage,
        pageSize,
        studentId
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          //当前页数
          this.pageInfo.currentPage = res.data.current
          //总条数
          this.pageInfo.total = res.data.total
          //结果集
          let records = res.data.records
          records.forEach(element=>{
            element.submitTime = dateFormatter(element.submitTime)
          })
          this.pageInfo.tableData = records
          console.log(this.pageInfo.tableData)
          //最大页数
          this.pageInfo.pageCount = res.data.pages
        }else{
          this.emptyText = res.message
        }
      })
    }
  },
  created() {

    if (this.propsStudentId!==null && this.propsStudentId!==undefined && this.propsStudentId!==""){
      this.$store.commit("thesisRecordOfStudentStore/setStudentId",this.propsStudentId)
    }
    this.postThesisSubmittedRecordList(this.pageInfo.current_page,this.pageInfo.page_size,this.studentId)
  },


}
</script>

<style scoped>

</style>