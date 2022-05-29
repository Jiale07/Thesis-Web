<template>
  <div>
    <div class="myContainer myHeader">
      <el-page-header @back="goBack" content="审核结果类型设置">
      </el-page-header>
    </div>
    <div class="myContainer">
      <div class="titleBox">
        <div>
          <h4>审核结果类型设置：</h4>
          <span>（固定的值包含有：1-审核通过，2-审核不通过,不建议进行更改映射关系，可能会导致系统错误）</span>
        </div>
        <div>
          <AddThesisProposalAuditCategory
            :getAuditStatusCategoryList="getAuditStatusCategoryList"
          ></AddThesisProposalAuditCategory>
        </div>
      </div>
      <el-table
          :data="tableData"
          v-loading="loading"
          stripe
          style="width: 100%"
          :empty-text="inputEmpty">
        <el-table-column
            prop="auditStatusValue"
            label="审核状态值"
            width="180">
        </el-table-column>
        <el-table-column
            prop="auditStatusName"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div class="buttonBox">
              <UpdateAuditStatusCategory
                  :getAuditStatusCategoryList="getAuditStatusCategoryList"
                  :row="scope.row"
              ></UpdateAuditStatusCategory>
              <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  getAuditStatusCategoryList, postDeletedAuditStatusCategory,
} from "../../../../axios/adminView/WebViewSetting/AuditStatusCategorySettingView";
import AddThesisProposalAuditCategory from "./components/AddAuditStatusCategory"
import UpdateAuditStatusCategory from "./components/UpdateAuditStatusCategory"
export default {
  name: "AuditStatusCategorySettingView",
  data(){
    return {
      tableData:[],
      inputEmpty:'暂无数据',
      loading:true
    }
  },
  components:{
    AddThesisProposalAuditCategory,
    UpdateAuditStatusCategory
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },

    getAuditStatusCategoryList(){
      getAuditStatusCategoryList().then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.tableData = res.data
        }else if (res.resultCode){
          this.tableData = []
          this.inputEmpty = res.message
        }
        setTimeout(()=>{
          this.loading =false
        },300)
      })
    },

    handleDelete(row){
      postDeletedAuditStatusCategory({
        auditStatusCategoryId:row.id
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.$message({
            type:'success',
            message:res.message
          })
          this.getAuditStatusCategoryList()
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
    this.getAuditStatusCategoryList()
  }
}
</script>

<style scoped lang="less">
.myContainer {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #ffffff;


  .titleBox{
    line-height: 30px;
    display: flex;
    justify-content: space-between;
  }

  .buttonBox{
    display: flex;

    >.el-button{
      margin-left: 10px;
    }
  }
}
</style>