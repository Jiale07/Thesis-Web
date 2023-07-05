<template>
  <div>
    <el-table
        v-loading="loading"
        :empty-text="emptyText"
        ref="multipleTable"
        :data="pageInfo.tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          label="编号"
          width="120"
          prop="teacherId"
      >
      </el-table-column>
      <el-table-column
          prop="teacherName"
          label="姓名"
          width="120">
      </el-table-column>
      <el-table-column
          prop="collegeName"
          label="学院"
          >
      </el-table-column>
      <el-table-column
          label="学院"
          >
        <template
            slot-scope="scope">
          <div>
            <div v-for="(item,index) in scope.row.roleIdList" :key="index">
              <el-tag>{{item.roleName}}</el-tag>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header">
          <el-button type="primary" @click="batchJoinTutor(multipleSelection,TutorRoleId)">批量加入</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              @click="handleJoinTutor(scope.row.teacherId,TutorRoleId)">加入</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.pageInfo.current_page"
        :page-sizes="this.pageInfo.page_sizes"
        :page-size="this.pageInfo.page_size"
        :page-count="this.pageInfo.page_count"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.pageInfo.total"
        class="myPageStyle">
    </el-pagination>
  </div>
</template>

<script>
import {
  postBatchJoinTutor, postJoinTutor,
  postNotTutorPage
} from "@/axios/adminView/GraduationDesignAbout/tutorView";

export default {
  name: "AddTutorComponent",
  data(){
    return {
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
      TutorRoleId: 2002,
      multipleSelection:'',
      loading:true,
      emptyText:'',
    }
  },
  methods:{
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    postNotTutorPage(currentPage,pageSize){
      postNotTutorPage({
        currentPage,
        pageSize
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.pageInfo.current_page = res.data.current
          //总条数
          this.pageInfo.total = res.data.total
          //结果集
          this.pageInfo.tableData = res.data.records
          //最大页数
          this.pageInfo.page_count = res.data.pages
        }else{
          this.pageInfo.tableData = res.data
          this.emptyText = res.message
        }
        setTimeout(()=>{
          this.loading = false
        },500)
      })
    },

    handleJoinTutor(teacherId){
      postJoinTutor({
        teacherId,
        roleId:this.TutorRoleId
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.$message({
            type:'success',
            message:res.message
          })
          this.$router.go(0)
        }else{
          this.$message({
            type:'error',
            message:res.message
          })
        }
      })
    },

    batchJoinTutor(val,roleId){
      let teacherIdArray = []
      val.forEach((value,index,array)=>{
        teacherIdArray.push({
          'id':array[index].teacherId,
        })
      })
      let changesTeacherRoleInfo={
        teacherIdArray,
        roleId
      }
      postBatchJoinTutor(JSON.stringify(changesTeacherRoleInfo)).then(res=>{
        let result = res.data
        if (result.resultCode === 200){
          this.$message({
            type:'success',
            message:'更新成功'
          })
          this.$router.go(0)
        }else{
          this.$message({
            type:'success',
            message:result.message
          })
        }
      })
    },

    // 更改页面可见函数大小
    handleSizeChange(val) {
      this.pageInfo.page_size = val
      this.postNotTutorPage(this.pageInfo.current_page,val)
    },
    //当前页切换
    handleCurrentChange(val) {
      this.pageInfo.current_page = val
      this.postNotTutorPage(val,this.pageInfo.page_size)
    },
  },

  created() {
    this.postNotTutorPage(this.pageInfo.current_page,this.pageInfo.page_size)
  }
}
</script>

<style scoped>

.myPageStyle{
  padding-top: 10px;
  text-align: center;
}
</style>
