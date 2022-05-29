<template>
  <div>
    <div class="myContainer myHeader">
      <el-page-header @back="goBack" content="开题报告提交页面——页面设置">
      </el-page-header>
    </div>

    <div class="myContainer">
      <div class="titleBox">
        <h4>开题报告主要内容设置：</h4>
        <div>
          <addThesisProposalInputSetting
            :getTPISList="getTPISList"
          ></addThesisProposalInputSetting>
        </div>
      </div>
      <el-table
          :data="tableData"
          v-loading="loading"
          style="width: 100%"
          :empty-text="inputEmpty">
        <el-table-column
            label="序号"
            prop="serialNumber"
            width="50px">
        </el-table-column>
        <el-table-column
            label="输入框标题"
            prop="titleName"
            width="420px">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div class="buttonBox">
              <updateThesisProposalInputSetting
                  :row="scope.row"
                  :getTPISList="getTPISList"
              ></updateThesisProposalInputSetting>
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <div class="myContainer">
      <div class="titleBox">
        <h4>开题报告审核输入设置：</h4>
        <div>
          <addTPAISetting
            :postTPAuditInputSettingList="postTPAuditInputSettingList"
          ></addTPAISetting>
        </div>
      </div>
      <div>
        <el-table
            :data="AISTableData"
            v-loading="loading"
            style="width: 100%"
            :empty-text="auditInputEmpty">
          <el-table-column
              label="序号"
              prop="serialNumber"
              width="50px">
          </el-table-column>
          <el-table-column
              label="输入框标题"
              prop="titleName"
              width="300px">
          </el-table-column>
          <el-table-column
              label="可填写角色"
              prop="roleName"
              width="300px">
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <div class="buttonBox">
                <updateTPAISetting
                    :row="scope.row"
                    :postTPAuditInputSettingList="postTPAuditInputSettingList"
                ></updateTPAISetting>
                <el-button
                    size="mini"
                    type="danger"
                    @click="TPAIHandleDelete(scope.row)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getTPISList, postDeletedTPAuditInputSetting,
  postDeletedTPIS,
  postTPAuditInputSettingList
} from "../../../../axios/adminView/WebViewSetting/ThesisProposalSettingView";
import addThesisProposalInputSetting from './components/addThesisProposalInputSetting'
import updateThesisProposalInputSetting from './components/updateThesisProposalInputSetting'
import addTPAISetting from './components/addThesisProposalAuditInputSetting'
import updateTPAISetting from './components/updateThesisProposalAuditInputSetting'
import {getRoleList} from "../../../../axios/public/RoleAbout";
import {mapState} from "vuex";

export default {
  name: "ThesisProposalSetting",
  data(){
    return{
      // pageInfo:{
      //   //当前页数
      //   current_page: 1,
      //   total:0,
      //   //每页显示条目个数
      //   page_size:10,
      //   pager_Count:8,
      //   //最大页数
      //   page_count:0,
      //   page_sizes:[5, 10, 15, 20],
      //   tableData:null,
      // },
      loading:true,

      tableData:[],
      // audit_input_setting
      AISTableData:[],

      inputEmpty:'暂无数据',
      auditInputEmpty:'暂无数据',
    }
  },
  computed:{
    ...mapState('thesisProposalViewSetting',['roleOptions'])
  },
  components:{
    addThesisProposalInputSetting,
    updateThesisProposalInputSetting,
    addTPAISetting,
    updateTPAISetting,
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },

    handleSizeChange(){

    },

    handleCurrentChange(){

    },

    handleEdit(){

    },
    handleDelete(row){
      postDeletedTPIS({
        thesisProposalInputSettingId:row.id
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.$message({
            type:'success',
            message:res.message,
          })
          this.dialogFormVisible = false
          this.getTPISList()
        }else{
          this.$message({
            type:'error',
            message:res.message,
          })
        }
      })
    },

    TPAIHandleDelete(row){
      postDeletedTPAuditInputSetting({
        TPAISId:row.id
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.$message({
            type:'success',
            message:res.message,
          })
          this.dialogFormVisible = false
          this.postTPAuditInputSettingList()
        }else{
          this.$message({
            type:'error',
            message:res.message,
          })
        }
      })
    },


    getTPISList(){
      getTPISList().then(result=>{
        let res = result.data
        if(res.resultCode===200){
          this.tableData = res.data
        }else{
          this.inputEmpty = res.message
        }
      })
    },

    postTPAuditInputSettingList(){
      postTPAuditInputSettingList().then(result=>{
        let res = result.data
        if (res.resultCode===200){
          let data = res.data
          let roleOptions = this.roleOptions
          data.forEach(DElement=>{
            roleOptions.forEach(ROElement=>{
              if (DElement.roleId === ROElement.id){
                DElement.roleName = ROElement.roleName
              }
            })
          })
          this.AISTableData = data
        }else if(res.resultCode===204){
          this.auditInputEmpty = res.message
        }
      })
    },

    getRoleList(){
      getRoleList().then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.$store.commit("thesisProposalViewSetting/setRoleOptions", res.data)
        }
      })
    }
  },
  created() {
    this.loading = false
    this.getTPISList()
    this.getRoleList()
    this.postTPAuditInputSettingList()
  }
}
</script>

<style scoped lang="less">
.myContainer{
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #ffffff;



  .myPageStyle{
    padding-top: 10px;
    text-align: center;
  }

  .buttonBox{
    display: flex;
    justify-content: right;
  }

  .titleBox{
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
  }
}
</style>