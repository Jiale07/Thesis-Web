<template>
  <div>
    <div class = "header myContainer">
      <BaseSelectGroup
          :value1="this.selectGroup.collegeId"
          :value2="this.selectGroup.majorId"
          :value3="this.selectGroup.classId"
          :getAccountList="getAccountList"
          :getMajorInfo="getMajorInfo"
      ></BaseSelectGroup>
      <!--添加student组件-->
      <BaseAddStudent
        :getAccountList="getAccountList"
        :currentPage="pageInfo.current_page"
        :pageSize="pageInfo.page_size"
      />
      <!--更改student组件-->
    </div>
    <div class="myContainer">
      <el-table
          :data="pageInfo.tableData"
          :empty-text="emptyText"
          style="width: 100%"
      >
        <el-table-column
            label="学号"
            prop="id">
        </el-table-column>
        <el-table-column
            label="姓名"
            prop="studentName">
        </el-table-column>
        <el-table-column
            label="学院"
            prop="collegeName">
        </el-table-column>
        <el-table-column
            label="专业"
            prop="majorName">
        </el-table-column>
        <el-table-column
            label="班级"
            prop="classId">
        </el-table-column>
        <el-table-column
            label="创建时间"
            prop="createTime">
        </el-table-column>
        <el-table-column
            label="更新时间"
            prop="updateTime">
        </el-table-column>
        <el-table-column
            align="right">
          <template slot-scope="scope" >
            <div class="myTemplate">
              <BaseUpdateStudent
                :index="scope.$index"
                :row="scope.row"
                :getAccountList="getAccountList"
                :currentPage="pageInfo.current_page"
                :pageSize="pageInfo.page_size"
              />
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
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
import BaseSelectGroup from './component/BaseSelectGroup'
import BaseAddStudent from './component/BaseAddStudent'
import BaseUpdateStudent from './component/BaseUpdateStudent'
import {
  deletedStudent,
  getStudentInfo
} from "../../../../axios/adminView/infoManagement/StudentInfo";
import {
  getCollegeList,
  getMajorList
} from "../../../../axios/adminView/public";
import {mapState} from "vuex";
import {dateFormatter} from "../../../../util/dateFormatter";
import {getRoleList} from "../../../../axios/public/RoleAbout";
export default {
  name: "studentInfo",
  data() {
    return {
      passwordShow:false,
      emptyText:'',
    }
  },
  computed:{
    ...mapState('studentInfo',['selectGroup','search','pageInfo','publicOption']),

    collegeId: {
      get() {
        return this.$store.state.studentInfo.selectGroup.collegeId
      },
      set(value) {
        this.$store.commit('studentInfo/updateSearchCollegeId',value)
        this.getMajorInfo(value)
        this.$store.commit('studentInfo/updateSearchMajorId','')
      }
    },
    majorId:{
      get() {
        return this.$store.state.studentInfo.selectGroup.majorId
      },
      set(value) {
        this.$store.commit('studentInfo/updateSearchMajorId',value)
      }
    },
    classId:{
      get() {
        return this.$store.state.studentInfo.selectGroup.classId
      },
      set(value) {
        this.$store.commit('studentInfo/updateSearchClassId',value)
      }
    }
  },
  methods: {
    handleDelete(index, row) {
      this.deletedStudent(row.id)
    },
    // 获取学会生账号信息
    getAccountList(currentPage,pageSize){
      getStudentInfo({
        currentPage,
        pageSize,
        collegeId:this.collegeId,
        majorId:this.majorId,
        classId:this.classId
      }).then(res=>{
        let result = res.data
        if (result.resultCode===200){
          if (result.data.records.length===0){
            this.getAccountList(result.data.current-1,this.pageInfo.page_size)
          }
          //当前页数
          this.pageInfo.current_page = result.data.current
          //总条数
          this.pageInfo.total = result.data.total
          //结果集
          // let recordsLength = result.data.records.length
          let records = result.data.records
          records.forEach((value,index,array)=>{
            array[index].createTime = dateFormatter(array[index].createTime)
            array[index].updateTime = dateFormatter(array[index].updateTime)
          })
          this.pageInfo.tableData = records
          //最大页数
          this.pageInfo.page_count = result.data.pages
        }else{
          this.pageInfo.tableData = []
          this.emptyText = result.message
        }
      })
    },
    // 更改页面可见函数大小
    handleSizeChange(val) {
      this.pageInfo.page_size = val
      this.getAccountList(this.pageInfo.current_page,val)
    },
    //当前页切换
    handleCurrentChange(val) {
      this.pageInfo.current_page = val
      this.getAccountList(val,this.pageInfo.page_size)
    },
    // 获取学院信息列表
    getCollegeInfo(){
      getCollegeList().then(res=>{
        if(res.data.resultCode ===200){
          this.publicOption.CollegeOptions= res.data.data
        }else{
          this.$message({
            type:'error',
            message:'没有找到更多信息'
          })
        }
      })
    },
    // 获取专业信息列表
    getMajorInfo(collegeId){
      getMajorList({
        collegeId
      }).then(res=>{
        if(res.data.resultCode ===200){
          this.search.option.MajorOptions= res.data.data
        }else{
          this.$message({
            type:'error',
            message:'没有找到更多信息'
          })
        }
      })
    },
    deletedStudent(studentId){
      deletedStudent({
        studentId
      }).then(res=>{
        let result = res.data
        if (result.resultCode===200){
          this.$message({
            type:'success',
            message:result.message
          })
          this.getAccountList(
              this.pageInfo.current_page,
              this.pageInfo.page_size,
              this.collegeId,
              this.majorId,
              this.classId)
        }else{
          this.$message({
            type:'error',
            message:result.message
          })
        }
      })
    },

    getRoleList(){
      getRoleList().then(result=>{
        let res = result.data
        if (res.resultCode===200){
          let data = res.data
          let studentOption = []
          data.forEach(element=>{
            if (element.id.toString() === "3001")
            studentOption.push(element)
          })
          this.$store.commit("studentInfo/updateRoleOptions",studentOption)
        }
      })
    }
  },
  components:{
    BaseSelectGroup,
    BaseAddStudent,
    BaseUpdateStudent
  },

  created() {
    // 初始化表格信息
    this.getAccountList(this.pageInfo.current_page,this.pageInfo.page_size)
    this.getCollegeInfo()
    this.getRoleList()
  },
}
</script>

<style scoped lang="less">

.myContainer{
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #ffffff;
}

.header{
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}

.myPageStyle{
  padding-top: 10px;
  text-align: center;
}

.myTemplate{
  display: flex;
  justify-content: space-around;
}

</style>