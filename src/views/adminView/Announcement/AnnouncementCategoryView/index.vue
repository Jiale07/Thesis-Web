<template>
  <div>
    <div class="myContainer">

      <AddACComponent></AddACComponent>
    </div>
    <div class="myContainer">
      <template>
        <el-table
            :data="pageInfo.tableData"
            stripe
            style="width: 100%">
          <el-table-column
              prop="id"
              label="编号"
              width="180">
          </el-table-column>
          <el-table-column
              prop="categoryName"
              label="公告分类名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="description"
              label="公告分类描述">
          </el-table-column>
          <el-table-column
              width="180">
            <template slot-scope="scope">
              <div class="buttonBox">
                <UpdateACComponent
                    :row="scope.row">
                </UpdateACComponent>
                <el-button
                    type="danger"
                    @click="postDeletedACLogic(scope.row.id)">
                  删除
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
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
</template>

<script>
import {postDeletedACLogic, postFindACPage} from "../../../../axios/adminView/Announcement/AnnouncementCategory";
import AddACComponent from "./components/AddACComponent"
import UpdateACComponent from "./components/UpdateACComponent"

export default {
  name: "AnnouncementCategory",
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
        tableData:null,
      },
    }
  },
  methods:{
    handleSizeChange(val){
      this.postFindACPage(this.pageInfo.current_page,val)
    },
    handleCurrentChange(val){
      this.postFindACPage(val,this.pageInfo.page_size)
    },
    postFindACPage(currentPage,pageSize){
      postFindACPage({
        currentPage,
        pageSize
      }).then(result=>{
        let res = result.data
        let resultCode = res.resultCode
        if (resultCode===200){
          //当前页数
          this.pageInfo.currentPage = res.data.current
          //总条数
          this.pageInfo.total = res.data.total
          //结果集
          this.pageInfo.tableData = res.data.records
          //最大页数
          this.pageInfo.pageCount = res.data.pages
        }else if (resultCode===204){
          this.pageInfo.currentPage = 1
          this.pageInfo.total = 0
          this.$message({
            type:'warning',
            message:res.message
          })
        }else {
          this.$message({
            type:'error',
            message:res.message
          })
        }
      })
    },
    postDeletedACLogic(id){
      postDeletedACLogic({
        acId:id
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
    }
  },
  components:{
    AddACComponent,
    UpdateACComponent
  },

  created() {
    this.postFindACPage(this.pageInfo.current_page,this.pageInfo.page_size)
  }
}
</script>

<style scoped lang="less">
.myContainer{
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #ffffff;


  .buttonBox{
    display: flex;
    justify-content: space-around;
  }
}

.myPageStyle{
  padding-top: 10px;
  text-align: center;
}

</style>