<template>
  <div>
    <div class="container header">
      <BaseQueryComponent
          :postTutorsPage="postTutorsPage"/>
    </div>
    <div class="container">
      <el-table
          v-loading="loading"
          :data="pageInfo.tableData"
          class="myElTable"
          @selection-change="handleSelectionChange"
      >
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            label="编号"
            prop="teacherId">
        </el-table-column>
        <el-table-column
            label="名称"
            prop="teacherName">
        </el-table-column>
        <el-table-column
            label="职位">
          <template
              slot-scope="scope">
            <div>
              <div v-for="(item,index) in scope.row.roleIdList" :key="index">
                <el-tag>{{item.roleName}}</el-tag>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
            label="所属学院"
            prop="collegeName">
        </el-table-column>
        <el-table-column
            align="right">
          <template slot="header">
            <el-button type="warning" @click="batchRemove">批量移出</el-button>
          </template>
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="warning"
                @click="quitTutor(scope.row.teacherId,TutorRoleId)"
            >移出</el-button>
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
  </div>
</template>

<script>
import {mapState} from "vuex";
import BaseQueryComponent from "./BaseQueryComponent";
import {findAllRoleList} from "../../../../../axios/adminView/RoleManagement/RoleInfo";
import {findAllCollegeList} from "../../../../../axios/adminView/infoManagement/CollegeInfo";
import {postQuitTutor, postTutorsPage} from "../../../../../axios/adminView/GraduationDesignAbout/tutorView";

export default {
  name: "TutorsMainComponent",
  data(){
    return {
      search: '',
      multipleSelection: [],
      teacherAccountList: [],
      TutorRoleId: 2002,
      loading:true,
    }
  },
  computed:{
    ...mapState('tutorStore',['pageInfo','selectGroup','roleList','collegeList'])
  },
  components:{
    BaseQueryComponent
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },

    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val;
      let List = []
      val.forEach((value,index,array)=>{
        List.push({
          'id':array[index].teacherId,
        })
      })
      this.teacherAccountList = List
    },

    // 更改页面可见函数大小
    handleSizeChange(val) {
      this.pageInfo.page_size = val
      this.postTutorsPage(this.pageInfo.current_page,val)
    },
    //当前页切换
    handleCurrentChange(val) {
      this.pageInfo.current_page = val
      this.postTutorsPage(val,this.pageInfo.page_size)
    },

    //获取roles列表
    getRoleList(){
      findAllRoleList().then(res=>{
        let result = res.data
        if(result.resultCode ===200){
          let roleList = result.data
          let newRoleList = []
          roleList.forEach((element)=>{
            if(element.id>2000 && element.id<3000){
              newRoleList.push({
                'id':element.id,
                'roleName':element.roleName
              })
            }
          })
          this.$store.commit('tutorStore/setRoleList',newRoleList)
        }
      })
    },
    getCollegeList(){
      findAllCollegeList().then(res=>{
        let result = res.data
        if (result.resultCode===200){
          this.$store.commit("tutorStore/setCollegeList",result.data)
        }
      })
    },
    postTutorsPage(currentPage,pageSize) {
      let roleId = 2002
      let collegeId = this.selectGroup.collegeId
      postTutorsPage({
        currentPage,
        pageSize,
        roleId,
        collegeId
      }).then(res => {
        let result = res.data
        if (result.resultCode === 200) {
          //当前页数
          this.pageInfo.current_page = result.data.current
          //总条数
          this.pageInfo.total = result.data.total
          //结果集
          let records = result.data.records
          this.pageInfo.tableData = records
          //最大页数
          this.pageInfo.page_count = result.data.pages
        } else {
          this.pageInfo.tableData = res.data
          this.emptyText = res.message
        }
        setTimeout(()=>{
          this.loading = false
        },500)
      })

    },

    batchRemove(){
      console.log("批量删除")
    },

    quitTutor(teacherId,roleId){
      postQuitTutor({
        teacherId,
        roleId
      }).then(result=>{
        let res = result.data
        if (res.resultCode === 200){
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
    }
  },
  created() {
    this.getRoleList()
    this.getCollegeList()
    this.postTutorsPage(this.pageInfo.current_page,this.pageInfo.page_size)
  },
  destroyed(){
    this.pageInfo.tableData = null
  }
}
</script>

<style scoped>
.container{
  position: relative;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 15px;
}
.header{
  margin-bottom: 10px;
}

.myPageStyle{
  padding-top: 10px;
  text-align: center;
}
</style>