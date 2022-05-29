<template>
<!--  <div class="containerBox" :style="{minHeight:asideHeight+'px'}">-->
<!--    -->
<!--  </div>-->
  <div class="myContainer" :style="{minHeight:asideHeight+'px'}">
    <div class="myContent header">
      <el-page-header @back="goBack" content="开题报告审核（系主任）" title="返回主页">
      </el-page-header>
    </div>
    <div  v-loading="loading">
      <div v-if="!isnNotHavePermissions" class="myContent">
        <el-table
            :data="pageInfo.tableData"
            stripe
            style="width: 100%"
            :empty-text="inputEmpty">
          <el-table-column
              prop="studentId"
              label="学号"
              width="180">
          </el-table-column>
          <el-table-column
              prop="studentName"
              label="学生名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="thesisName"
              label="毕业设计题目">
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="toAuditView(scope.row)">更多信息/审核</el-button>
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
      <div v-if="isnNotHavePermissions" class="myContent">
        <el-row type="flex" justify="center" align="middle">
          <el-col :sm="12" :lg="6">
            <el-result icon="error" title="错误" :subTitle="message">
              <template slot="extra">
                <el-button type="primary" size="medium" @click="goBack">返回</el-button>
              </template>
            </el-result>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import {postThesisProposalByDepartment} from "../../../../axios/teacher/studentProcessDocumentation/ThesisProposalAuditByDHBAbout";
import {mapState} from "vuex";
export default {
  // DH:department head 系主任
  name: "ThesisProposalAuditByDH",
  data(){
    return{
      asideHeight:'',
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
      tableData:[],
      teacherId:'',
      inputEmpty:'',

      isnNotHavePermissions:false,
      message:'',

      loading:true
    }
  },
  computed:{
    ...mapState("loginAbout",['user'])
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },

    postThesisProposalByDepartment(currentPage,pageSize,teacherId){
      postThesisProposalByDepartment({
        currentPage,
        pageSize,
        teacherId
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.pageInfo.current_page = res.data.current
          //总条数
          this.pageInfo.total = res.data.total
          //结果集
          let records = res.data.records
          this.pageInfo.tableData = records
          //最大页数
          this.pageInfo.page_count = res.data.pages
        }else if (res.resultCode===204){
          this.pageInfo.tableData = []
          this.inputEmpty = res.message
        }else if (res.resultCode===500){
          this.isnNotHavePermissions = true
          this.message = res.message
        }
        setTimeout(()=>{
          this.loading = false
        },0)
      })
    },
    //设置表格item数量
    handleSizeChange(val) {
      this.pageInfo.page_size = val
      this.postThesisProposalByDepartment(this.pageInfo.current_page,val,this.teacherId)
    },
    //当前页切换
    handleCurrentChange(val) {
      this.pageInfo.current_page = val
      this.postThesisProposalByDepartment(val,this.pageInfo.page_size,this.teacherId)
    },
    initialization(){
      let currentPage = this.pageInfo.current_page
      let pageSize = this.pageInfo.page_size
      let teacherId = this.user.userId
      this.teacherId = teacherId
      this.postThesisProposalByDepartment(currentPage,pageSize,teacherId)
    },
    toAuditView(row){
      this.$router.push({
        name:'ThesisProposalAuditView',
        params:{
          tpId:row.thesisProposalId,
          WebViewRoleId:2004,
        }
      })
    }
  },
  created() {
    this.initialization()
  },
  mounted() {
    //获取窗口高度

    this.asideHeight = document.documentElement.clientHeight;
    window.onresize = () => {
      return (() => {
        this.asideHeight = document.documentElement.clientHeight;
      })()
    }
  },
}
</script>

<style scoped lang="less">
.myContent{
  margin: 0 auto 10px;
  padding: 10px;
  width: 1280px;
  background-color: #ffffff;
  border-radius: 15px;


  .myPageStyle{
    padding-top: 10px;
    text-align: center;
  }
}
.myContent:last-child{
  margin-bottom: 0;
}
</style>