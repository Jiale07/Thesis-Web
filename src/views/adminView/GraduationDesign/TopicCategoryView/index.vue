<template>
  <div>
    <div class="myContainer">
      <el-page-header @back="goBack" content="详情页面">
      </el-page-header>
      <div>

      </div>
      <template>
        <el-table
            :data="pageInfo.tableData"
            style="width: 100%">
          <el-table-column
              type="index"
              >
          </el-table-column>
          <el-table-column
              label="名称"
              prop="categoryName"
              width="tableWidth">
          </el-table-column>
          <el-table-column
              label="描述"
              prop="description">
          </el-table-column>
          <el-table-column
              align="right">
            <template slot="header" slot-scope="scope">
              <div class="searchDiv" >
<!--                <el-input-->
<!--                    v-model="search"-->
<!--                    size="mini"-->
<!--                    placeholder="输入关键字搜索"-->
<!--                    @keyup.enter.native="searchFunc(scope)"/>-->
<!--                <el-button type="primary" size="mini" @click="searchFunc(scope)">搜索</el-button>-->
                <el-button type="primary" size="mini" @click="showAddDialog(scope)">添加</el-button>
              </div>
            </template>
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">更改</el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
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
    <el-dialog title="添加新的毕业论文设计" :visible.sync="addDialogFormVisible">
      <div class="myFromBox">
        <el-form :model="newTopicCategoryFrom">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="newTopicCategoryFrom.categoryName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="更多描述" :label-width="formLabelWidth">
            <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="newTopicCategoryFrom.description">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewTopicCategory">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加新的毕业论文设计" :visible.sync="updateDialogFormVisible">
      <div class="myFromBox">
        <el-form :model="updateTopicCategoryFrom">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="updateTopicCategoryFrom.categoryName" ></el-input>
          </el-form-item>
          <el-form-item label="更多描述" :label-width="formLabelWidth">
            <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="updateTopicCategoryFrom.description">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateTopicCategoryFunc">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addTopicCategory,
  deletedTopicCategory,
  postTopicCategoryPage, updateTopicCategory
} from "@/axios/adminView/GraduationDesignAbout/topicCategory";
export default {
  name: "TopicCategory",
  data(){
    return {
      search: '',
      tableWidth:'120px',
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
      newTopicCategoryFrom:{
        categoryName:'',
        description:''
      },
      updateTopicCategoryFrom:{
        id:'',
        categoryName:'',
        description:'',
        isDeleted:0
      },
      formLabelWidth:'120px',
      addDialogFormVisible:false,
      updateDialogFormVisible:false
    }
  },
  methods: {
    input(){
    },
    //更改
    handleEdit(index, row) {
      this.updateTopicCategoryFrom.categoryName = row.categoryName
      this.updateTopicCategoryFrom.description = row.description
      this.updateTopicCategoryFrom.id = row.id
      this.updateDialogFormVisible = true
    },
    //删除
    handleDelete(index, row) {
      deletedTopicCategory({
        topicCategoryId:row.id
      }).then(res=>{
        let result = res.data
        if (result.resultCode===200){
          this.$message({
            type:'success',
            message:result.message
          })
          this.$router.go(0)
        }else{
          this.$message({
            type:'error',
            message:result.message
          })
        }
      })
    },
    searchFunc(){
      console.log(this.search)
    },
    //返回上一页
    goBack(){
      this.$router.go(-1)
    },
    //切换页面行数
    handleSizeChange(val){
      this.pageInfo.page_size = val
      this.getTopicCategory(this.pageInfo.current_page,val)
    },
    //切换当前页
    handleCurrentChange(val){
      this.pageInfo.page_size = val
      this.getTopicCategory(val,this.pageInfo.page_size)
    },
    //获取topicCategoryList
    getTopicCategory(currentPage,pageSize){
      postTopicCategoryPage({
        currentPage,
        pageSize
      }).then(res=>{
        let result = res.data
        if (result.resultCode === 200){
          //当前页数
          this.pageInfo.current_page = result.data.current
          //总条数
          this.pageInfo.total = result.data.total
          //结果集
          let records = result.data.records
          records.forEach((value,index,array)=>{
            array[index].createTime = this.$dayjs(array[index].createTime).format("YYYY-MM-DD hh:mm:ss")
            array[index].updateTime = this.$dayjs(array[index].updateTime).format("YYYY-MM-DD hh:mm:ss")
          })
          this.pageInfo.tableData = records
          //最大页数
          this.pageInfo.page_count = result.data.pages
        }else{
          this.$message({
            type:'error',
            message:result.message
          })
        }
      })
    },
    //显示添加顶的TopicCategoryDialog
    showAddDialog(){
      this.addDialogFormVisible = true
    },
    //添加接口调用
    addNewTopicCategory(){
      addTopicCategory(this.newTopicCategoryFrom).then(res=>{
        let result = res.data
        if (result.resultCode===200){
          this.$message({
            type:'success',
            message:result.message
          })
          this.$router.go(0)
        }else{
          this.$message({
            type:'error',
            message:result.message
          })
        }
        this.dialogFormVisible = false
      })
    },
    //更新
    updateTopicCategoryFunc(){
      let topicCategory=this.updateTopicCategoryFrom
      updateTopicCategory(topicCategory).then(res=>{
        let result = res.data
        if (result.resultCode===200){
          this.$message({
            type:"success",
            message:result.message
          })
          this.$router.go(0)
        }else{
          this.$message({
            type:"error",
            message:result.message
          })
        }
      })
    }
  },
  created() {
    this.getTopicCategory(this.pageInfo.current_page,this.pageInfo.page_size)
  }
}
</script>

<style scoped lang="less">
.searchDiv{
  display: flex;
  justify-content: right;

  .el-input{
    width: 240px;
  }
}
.myContainer{
  margin: 0 auto;
  padding: 20px 0 20px 10px;
  background-color: #ffffff;
  border-radius: 15px;
}

.myPageStyle{
  padding-top: 10px;
  text-align: center;
}

.myFromBox{
  width: 720px;
}
</style>
