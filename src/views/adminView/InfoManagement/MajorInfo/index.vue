<template>
  <div>
<!--    头部-->
    <div class="myContainer myHeader">
      <div>
        <span class="mylabel">学院:</span>
        <el-select v-model="isCollege" clearable placeholder="请选择">
          <el-option
              v-for="item in collegeList"
              :key="item.id"
              :label="item.collegeName"
              :value="item.id">
          </el-option>
        </el-select>
        <el-button type="primary" @click="searchMajor">搜索</el-button>
      </div>
      <div>
        <AddMajorComponent></AddMajorComponent>
      </div>
    </div>
<!--    主体-->
    <div class="myContainer">
      <el-table
          :data="pageInfo.tableData"
          v-loading="loading"
          style="width: 100%">
        <el-table-column
            label="编号"
            prop="id">
        </el-table-column>
        <el-table-column
            label="学院名称"
            prop="collegeName">
        </el-table-column>
        <el-table-column
            label="专业名称（系名）"
            prop="majorName">
        </el-table-column>
        <el-table-column
            align="right">
          <template slot-scope="scope" >
            <div class="buttonBox">
              <UpdateMajorComponent
                  :scope="scope"
              />
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
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
import {
  deleteMajor,
  getMajorListByPage,
} from "../../../../axios/adminView/infoManagement/MajorInfo";
import {
  getCollegeList
} from "../../../../axios/adminView/public";
import {mapState} from "vuex";
import {dateFormatter} from "../../../../util/dateFormatter";

import UpdateMajorComponent from "./component/UpdateMajorComponent"
import AddMajorComponent from "./component/AddMajorComponent"

export default {
  name: "MajorInfo",
  data(){
    return {
      //关于添加
      // college:{
      //   id:'',
      //   collegeName:'',
      //   isDeleted:0
      // },
      //对话框显示控制变量
      addDialogFormVisible:false,
      // //关于更新
      // oldMajor:{},
      // newMajor:{
      //   id:'',
      //   collegeId:'',
      //   majorName:'',
      //   isDeleted:0 //默认值
      // },
      //表格宽度设置
      formLabelWidth: '120px',

      //加载效果显示控制变量
      loading:true,
      isCollege:'',

    //关于添加：

    }
  },
  components:{
    UpdateMajorComponent,
    AddMajorComponent
  },
  created() {
    //加载学院列表
    this.getCollegeList()
    //加载专业列表信息
    this.getMajorPage(this.pageInfo.current_page,this.pageInfo.page_size)
    // 判断是否加载完成
    if (this.tableData !== null && this.collegeList !==null){
      this.loading = false
    }
  },
  computed:{
    ...mapState('majorInfoAbout',['pageInfo','collegeList'])
  },
  methods:{
    //专业信息管理按钮

    handleDelete(index, row) {
      this.deleteMajorById(index, row);
    },
    //通过分页和过滤调价查找信息
    getMajorPage(currentPage,pageSize,collegeId){
      getMajorListByPage({
        currentPage,
        pageSize,
        collegeId
      }).then(res=>{
        let result = res.data
        if (result.resultCode===200){
          if (result.data.records.length===0){
            this.getMajorPage(result.data.current-1,this.pageInfo.page_size)
          }
          //当前页数
          this.pageInfo.current_page = result.data.current
          //总条数
          this.pageInfo.total = result.data.total
          //结果集
          let records = result.data.records
          records.forEach((value,index,array)=>{
            array[index].createTime = dateFormatter(array[index].createTime)
            array[index].updateTime = dateFormatter(array[index].updateTime)
          })
          this.pageInfo.tableData = records
          //最大页数
          this.pageInfo.page_count = result.data.pages
        }else{
          this.$message({
            type: 'error',
            message: result.message
          });
        }
      })
    },
    //获取college列表
    getCollegeList(){
      getCollegeList().then(res=>{
        this.$store.commit("majorInfoAbout/setCollegeList",res.data.data)
      })
    },

    //删除专业信息
    deleteMajorById(index,row){
      deleteMajor({
        majorId: row.id
      }).then(res=>{
        if (res.data.resultCode ===200){
          this.$message({
            type:'success',
            message:res.data.message
          });
          this.$router.go(0)
        }else{
          this.$message({
            type:'error',
            message:res.data.message
          });
        }
      })
    },
    //过滤查询
    searchMajor(){
      this.getMajorPage(this.pageInfo.current_page,this.pageInfo.page_size,this.isCollege)
    },
    // 每页显示条目个数
    handleSizeChange(val) {
      this.pageInfo.page_size = val
      this.getMajorPage(this.pageInfo.current_page,val)
    },
    //当前页切换
    handleCurrentChange(val) {
      this.pageInfo.current_page = val
      this.getMajorPage(val,this.pageInfo.page_size)
    }
  }
}
</script>

<style scoped lang="less">
.myContainer{
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #ffffff;;

  .mylabel{
    margin: 0 10px;
  }
}

.myHeader{
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}

.item{
  padding: 10px;
  line-height: 30px;
  .itemMajorId{
    margin-left: 10px;
  }

  .itemMajorName{
    margin-left: 10px;
  }

  .itemIcon{
    font-size: 16px;
    color: red;
  }
}


.myPageStyle{
  padding-top: 10px;
  text-align: center;
}

.buttonBox{
  display: flex;
  justify-content: right;
}

</style>