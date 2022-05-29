<template>
  <div>
<!--    条件搜索-->
    <div class="header myContainer">
      <BaseSelectGroup
        :getTeacherInfo="getTeacherInfo"
      />
      <BaseAddTeacher
          :getTeacherInfo="getTeacherInfo"
          :currentPage="pageInfo.current_page"
          :pageSize="pageInfo.page_size"
      />
    </div>
    <div>
      <!--    显示表格-->
      <div class="myContainer">
        <el-table
            :data="pageInfo.tableData"
            style="width: 100%"
        >
          <el-table-column
            label="职工号"
            prop="id"
          ></el-table-column>
          <el-table-column
              label="所属学院编号"
              prop="collegeName"
          ></el-table-column>
          <el-table-column
              label="姓名"
              prop="teacherName"
          ></el-table-column>
          <el-table-column
              label="创建时间"
              prop="createTime"
          ></el-table-column>
          <el-table-column
              label="更新时间"
              prop="updateTime"
          ></el-table-column>
          <el-table-column
            align="right"
          >
            <template slot-scope="scope">
              <div class="myTemplate">
                <BaseUpdateTeacher
                    :getTeacherInfo="getTeacherInfo"
                    :currentPage="pageInfo.current_page"
                    :pageSize="pageInfo.page_size"
                    :index="scope.$index"
                    :row="scope.row"
                />
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">Delete</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!--    分页-->
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

    </div>
  </div>
</template>

<script>
import BaseAddTeacher from "./component/BaseAddTeacher"
import BaseUpdateTeacher from "./component/BaseUpdateTeacher"
import BaseSelectGroup from "./component/BaseSelectGroup"
import {deletedTeacher, getTeacherInfoByPage} from "../../../../axios/adminView/infoManagement/TeacherInfo";
import {mapState} from "vuex";
import {getCollegeList} from "../../../../axios/adminView/public";
import {dateFormatter} from "../../../../util/dateFormatter";

export default {
  name: "TeacherInfo",
  data(){
    return {

    }
  },
  computed:{
    ...mapState('teacherInfo',['publicOption','pageInfo','selectGroup']),

    collegeId: {
      get() {
        return this.$store.state.teacherInfo.selectGroup.collegeId
      },
      set(value) {
        this.$store.commit('teacherInfo/updateSearchCollegeId',value)
      }
    },
  },
  methods:{
    handleDelete(row){
      this.deletedTeacher(row.id)
    },
  //  获取教职工账号信息
    getTeacherInfo(currentPage,pageSize){
      getTeacherInfoByPage({
        currentPage,
        pageSize,
        collegeId:this.selectGroup.collegeId
      }).then(res=>{
        let result = res.data
        if (result.resultCode===200){
          if (result.data.records.length===0){
            this.getTeacherInfo(result.data.current-1,this.pageInfo.page_size)
          }
          //当前页数
          this.pageInfo.current_page = res.data.data.current
          //总条数
          this.pageInfo.total = res.data.data.total
          //结果集
          let records = result.data.records
          records.forEach((value,index,array)=>{
            array[index].createTime = dateFormatter(array[index].createTime)
            array[index].updateTime = dateFormatter(array[index].updateTime)
          })

          this.pageInfo.tableData = records
          //最大页数
          this.pageInfo.page_count = res.data.data.pages
        }else{
          this.$message({
            type:'error',
            message:result.message
          })
        }
      })
    },

    handleSizeChange(val) {
      this.pageInfo.page_size = val
      this.getTeacherInfo(this.pageInfo.current_page,val)
    },
    //当前页切换
    handleCurrentChange(val) {
      this.pageInfo.current_page = val
      this.getTeacherInfo(val,this.pageInfo.page_size)
    },

    getCollegeInfo(){
      getCollegeList().then(res=>{
        let result = res.data
        if (result.resultCode === 200){
          this.publicOption.CollegeOptions = result.data
        }else{
          this.$message({
            type:'error',
            message:result.message
          })
        }
      },error => {
        this.$message({
          type:'error',
          message:error.message
        })
      })
    },

    deletedTeacher(teacherId){
      deletedTeacher({
        teacherId
      }).then(res=>{
        let result = res.data
        if (result.resultCode === 200){
          this.$message({
            type:'success',
            message:result.message
          })
          this.getTeacherInfo(this.pageInfo.current_page,this.pageInfo.page_size,this.collegeId)
        }else {
          this.$message({
            type:'error',
            message:result.message
          })
        }
      },error=>{
        this.$message({
          type:'error',
          message:error.message
        })
      })
    }
  },
  components:{
    BaseAddTeacher,
    BaseUpdateTeacher,
    BaseSelectGroup,
  },
  created(){
    this.getCollegeInfo()

    this.getTeacherInfo(this.pageInfo.current_page,this.pageInfo.page_size)
  }
}
</script>

<style scoped>
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