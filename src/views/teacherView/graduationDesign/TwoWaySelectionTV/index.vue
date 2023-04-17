<template>
  <div class="myBady" :style="{minHeight:asideHeight+'px'}">
    <div class="myContainer">
      <div class="myContent header">
        <el-page-header @back="goBack" content="师生双向选择（教师）" title="返回首页">
        </el-page-header>
      </div>
    </div>
    <div class="myContainer">
      <div class="myContent main">
        <div class="operationsBox">
          <el-button type="primary" size="mini">批量添加</el-button>
        </div>
        <el-table
            ref="multipleTable"
            :data="pageInfo.tableData"
            tooltip-effect="dark"
            :empty-text="tableNoDate"
            style="width: 100%">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              prop="studentName"
              label="学生姓名">
          </el-table-column>
          <el-table-column
              prop="collegeName"
              label="学院">
          </el-table-column>
          <el-table-column
              prop="majorName"
              label="专业">
          </el-table-column>
          <el-table-column
              prop="topicName"
              label="所选择的毕业设计题目">
          </el-table-column>
          <el-table-column
              prop="selectionUpdateTime"
              label="选中时间：">
          </el-table-column>
          <el-table-column
              label="操作"
          >
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="JoinGDTTeam(scope.row)">添加队伍</el-button>
              <el-button type="warning" size="mini" @click="dismissal(scope.row.gdtsId)">委婉拒绝</el-button>
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
  </div>
</template>

<script>

import {
  postDismissal,
  postJoinGDTTeam,
  postTeacherTopicSelected
} from "../../../../axios/teacher/GraduationDesignAbout/TwoWaySelectionView";
import {mapState} from "vuex";

export default {
  name: "TwoWaySelectionTeacherView",
  data(){
    return{
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
        tableData:null
      },

      tableNoDate:'暂无更多信息',
      asideHeight:'',
    }
  },
  computed:{
      ...mapState("loginAbout",['user'])
  },
  methods:{
    handleSizeChange(val){
      this.pageInfo.page_size = val
      this.postTeacherTopicSelectedPage(this.pageInfo.current_page,val)
    },

    handleCurrentChange(val){
      this.pageInfo.current_page = val
      this.postTeacherTopicSelectedPage(val,this.pageInfo.page_size)
    },

    goBack(){
      this.$router.go(-1)
    },

    postTeacherTopicSelectedPage(currentPage,pageSize,teacherId){
      postTeacherTopicSelected({
        currentPage,
        pageSize,
        teacherId
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          //当前页数
          this.pageInfo.current_page = res.data.current
          //总条数
          this.pageInfo.total = res.data.total
          //结果集
          let tableData =  res.data.records
          tableData.forEach((value,index,array)=>{
            array[index].selectionCreateTime = this.$dayjs(array[index].selectionCreateTime).format("YYYY-MM-DD hh:mm:ss")
            array[index].selectionUpdateTime = this.$dayjs(array[index].selectionUpdateTime).format("YYYY-MM-DD hh:mm:ss")
          })
          this.pageInfo.tableData =tableData
          //最大页数
          this.pageInfo.page_count = res.data.pages
        }else{
          this.$message({
            type:'error',
            message:res.message,
          })
        }
      })
    },


    JoinGDTTeam(row){
      let teacherId = this.user.userId
      postJoinGDTTeam({
        studentId:row.studentId,
        teacherId,
        gdtsId:row.gdtsId
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.$message({
            type:"success",
            message:res.message
          })
          this.postTeacherTopicSelectedPage(
              this.pageInfo.current_page,
              this.pageInfo.page_size,
              this.user.userId
          );
        }else{
          this.$message({
            type:"error",
            message:res.message
          })
        }
      })
    },

    dismissal(gdtsId){
      postDismissal({
        gdtsId
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.$message({
            type:'success',
            message:res.message
          })
          this.postTeacherTopicSelectedPage(
              this.pageInfo.current_page,
              this.pageInfo.page_size,
              this.user.userId
          );
        }else{
          this.$message({
            type:'error',
            message:res.message
          })
        }
      })
    }
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
  created() {
    this.postTeacherTopicSelectedPage(
        this.pageInfo.current_page,
        this.pageInfo.page_size,
        this.user.userId
    );
  }
}
</script>

<style scoped lang="less">
.myBady{

  .myContainer{
    margin:  auto;
    max-width: 1280px;

    .header{

    }

    .main{
      margin-top: 20px;

      .operationsBox{
        float: right;
        padding: 0 20px;
      }
    }

    .myPageStyle{
      padding-top: 10px;
      text-align: center;
    }
  }
}

.myContent{
  padding: 20px 10px;
  background-color: #ffffff;
  border-radius: 15px;

}
</style>