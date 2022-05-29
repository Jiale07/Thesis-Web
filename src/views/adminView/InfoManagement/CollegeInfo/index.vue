<template>
  <div>
    <div class="myContainer myHeader">
      <div>
        <BaseAddCollege
          :postCollegeInfoPage="postCollegeInfoPage"
          :currentPage="pageInfo.current_page"
          :pageSize="pageInfo.page_size"
        ></BaseAddCollege>
      </div>
    </div>
    <div class="myContainer">
      <el-table
          :data="pageInfo.tableData"
          v-loading="loading"
          :empty-text="emptyText"
          style="width: 100%">
        <el-table-column
            label="编号"
            prop="id"
            width="60px">
        </el-table-column>
        <el-table-column
            label="名称"
            prop="collegeName">
        </el-table-column>
        <el-table-column
            width="160px"
            align="right">
          <template slot-scope="scope">
            <div class="buttonBox">
              <BaseUpdateCollege
                  :row="scope.row"
                  :postCollegeInfoPage="postCollegeInfoPage"
                  :currentPage="pageInfo.current_page"
                  :pageSize="pageInfo.page_size"
              ></BaseUpdateCollege>
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
  addCollegeInfo,
  logicToDeleteCollege
} from '../../../../axios/adminView/infoManagement/CollegeInfo'
import BaseAddCollege from "./component/BaseAddCollege"
import BaseUpdateCollege from "./component/BaseUpdateCollege"
import {
  postCollegeInfoPage
} from "../../../../axios/adminView/public";

export default {
  name: "CollegeInfo",
  data(){
    return {
      tableData:[{}],
      //关于添加
      college:{
        id:'',
        collegeName:'',
        isDeleted:0
      },
      //加载效果
      loading:true,

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
      emptyText:'',
    }
  },
  components:{
    BaseAddCollege,
    BaseUpdateCollege
  },
  methods: {
    handleDelete(index, row) {
      this.deleteCollege(index, row);
    },

    postCollegeInfoPage(currentPage,pageSize){
      postCollegeInfoPage({
        currentPage,
        pageSize
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          //当前页数
          if (res.data.records.length===0){
            this.postCollegeInfoPage(res.data.current-1,this.pageInfo.page_size)
          }
          this.pageInfo.current_page = res.data.current
          //总条数
          this.pageInfo.total = res.data.total
          //结果集
          // let recordsLength = result.data.records.length
          let records = res.data.records
          this.pageInfo.tableData = records
          //最大页数
          this.pageInfo.page_count = res.data.pages
        }else{
          this.emptyText = res.message
        }
        this.loading = false
      },err => {
        this.$message({
          type: 'error',
          message: err.message
        });
        this.loading = false
      })
    },

    handleSizeChange(val) {
      this.pageInfo.page_size = val
      this.postCollegeInfoPage(this.pageInfo.current_page,val)
    },
    //当前页切换
    handleCurrentChange(val) {
      this.pageInfo.current_page = val
      this.postCollegeInfoPage(val,this.pageInfo.page_size)
    },

    addCollege(){
      addCollegeInfo(this.college).then(res=>{
        this.$message({
          type:'success',
          message:res.data.message
        });
        this.$router.go(0)
      })
    },

    message(object,webMessage){
      this.$message({
        type: object,
        message: webMessage
      });
    },

    deleteCollege(index, row){
      logicToDeleteCollege({
        collegeId:row.id
      }).then(res=>{
        let result = res.data;
        if (result.resultCode){
          this.$message({
            type: 'success',
            message: result.message
          });
          this.postCollegeInfoPage(this.pageInfo.current_page,this.pageInfo.page_size)
        }else{
          this.$message({
            type:'error',
            message:result.message
          })
        }
      })
    }
  },
  created() {
    this.postCollegeInfoPage(this.pageInfo.current_page,this.pageInfo.page_size)
  },
}
</script>

<style scoped lang="less">
.myContainer{
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #ffffff;

  .el-input{
    width: 200px;
  }

  .label{
    margin-left: 10px;
  }

  .buttonBox{
    display: flex;
    justify-content: space-between;
  }
}

.myHeader{
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}

.myPageStyle{
  padding-top: 10px;
  text-align: center;
}

</style>