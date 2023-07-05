<template>
  <div>
    <div class="myContainer myHeader">
      <el-page-header @back="goBack" content="开题报告提交页面——页面设置">
      </el-page-header>
    </div>

    <div class="myContainer">
      <div class="audit-table title-box">
        <h4>开题报告主要内容设置：</h4>
        <div>
          <el-button type="primary" @click="showCreateDialog">添加</el-button>
        </div>
      </div>
      <setting-table
          :tableData="tableData"
          :tableColumn="tableColumn"
          @on-click-delete="handleDelete"
      >
      </setting-table>
    </div>
    <setting-create-dialog
        v-if="showSettingCreateDialog"
        :title="'添加自定义输入项标题'"
        :dialogFormItems="dialogFormItems"
        @on-submit="addThesisProposalInputSettingItem"
        @on-click-close="closeCreateDialog"
    >
    </setting-create-dialog>
    <setting-create-dialog
      v-if="showSettingUpdateDialog"
      :title="'更改自定义输入项标题'"
      :sourceForm="dialogSourceForm"
      :dialogFormItems="dialogFormItems"
      @on-submit="updateThesisProposalItem"
      @on-click-close="closeUpdateDialog"
    >
    </setting-create-dialog>
  </div>
</template>

<script>
import {
  getTPISList, postAddTPIS,
  postDeletedTPIS,
  postTPAuditInputSettingList,
  postUpdateTPIS

} from "@/axios/adminView/WebViewSetting/ThesisProposalSettingView";
import SettingTable from '../../../../components/backStage/settingTable/index'
import SettingCreateDialog from '../../../../components/backStage/settingCreateDialog'
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

      showSettingCreateDialog: false,
      showSettingUpdateDialog: false,

      dialogSourceForm: {
        id: 0,
        serialNumber: 0,
        titleName: '',
      },

      dialogFormItems: [
        {
          prop: 'serialNumber',
          label: '序号',
          type: 'Number',
          min: 1,
          max: 99,
        },
        {
          prop: 'titleName',
          label: '输入框标题',
          type: 'String',
        }
      ],
    }
  },
  computed:{
    ...mapState('thesisProposalViewSetting',['roleOptions']),

    tableColumn() {
      return [
        {
          prop: 'serialNumber',
          label: '序号',
          minWidth: 50,
          width: 50,
          align: 'center',
          headerAlign: 'headerAlign',
        },
        {
          prop: 'titleName',
          label: '输入框标题',
          minWidth: 240,
          width: 240,
          align: 'left',
          headerAlign: 'center',
        },
        {
          prop: 'operation',
          label: '操作',
          align: 'center',
          className: 'display-flex justify-end',
          children: [
            {
              prop: 'update',
              label: '更改',
              type: 'warning',
              size: 'mini',
              clickFunction: this.showUpdateDialog
            },
            {
              prop: 'delete',
              label: '删除',
              type: 'danger',
              size: 'mini',
              clickFunction: this.handleDelete
            }
          ],
        }
      ]
    },

    auditSettingTableColumn() {
      return [
        {
          prop: 'serialNumber',
          label: '序号',
          minWidth: 50,
          width: 50,
          align: 'center',
          headerAlign: 'center'
        },
        {
          prop: 'titleName',
          label: '输入框标题',
          minWidth: 240,
          width: 240,
          align: 'center',
          headerAlign: 'center'
        },
        {
          prop: 'roleId',
          label: '可填写角色',
          minWidth: 240,
          width: 240,
          align: 'center',
          headerAlign: 'center'
        },
        {
          prop: 'operation',
          label: '操作',
          align: 'center',
          headerAlign: 'center',
          className: 'display-flex justify-end',
          children: [
            {
              prop: 'update',
              label: '更改',
              type: 'warning',
              size: 'mini',

            },
            {
              prop: 'delete',
              label: '删除',
              type: 'danger',
              size: 'mini',

            }
          ]
        },
      ]
    }
  },
  components:{
    // addThesisProposalInputSetting,
    // addTPAISetting,
    // updateTPAISetting,

    // SettingCreateDialog,
    SettingTable,
    SettingCreateDialog,
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },

    handleSizeChange(){

    },

    handleCurrentChange(){

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

    showUpdateDialog(row) {
      let {id, serialNumber, titleName} = row
      this.dialogSourceForm = {
        id,
        serialNumber,
        titleName,
      }
      this.showSettingUpdateDialog = true
    },

    updateThesisProposalItem(submitFrom) {
      let params = {
        id: submitFrom.id,
        serialNumber: submitFrom.serialNumber,
        titleName: submitFrom.titleName,
      }
      postUpdateTPIS(params).then(result=>{
        let res = result.data
        if (res.resultCode){
          this.$message({
            type:'success',
            message:res.message
          })
          this.closeUpdateDialog()
          this.refreshData()
        }else{
          this.$message({
            type:'success',
            message:res.message
          })
        }
      })
    },

    closeUpdateDialog() {
      this.showSettingUpdateDialog = false
    },

    closeCreateDialog() {
      this.showSettingCreateDialog = false
    },

    refreshData() {
      this.getTPISList()
    },

    initData() {
      this.getTPISList()
    },


    addThesisProposalInputSettingItem(submitForm) {
      let params = {
        serialNumber: submitForm.serialNumber,
        titleName: submitForm.titleName,
      }
      postAddTPIS(params).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.$message({
            type:'success',
            message:res.message,
          })
          this.closeCreateDialog()
          this.refreshData()
        }else{
          this.$message({
            type:'error',
            message:res.message,
          })
        }
      })
    },

    showCreateDialog() {
      this.showSettingCreateDialog = true
    },
  },
  created() {
    this.loading = false
    this.initData()
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

  .title-box{
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
  }
}
</style>
