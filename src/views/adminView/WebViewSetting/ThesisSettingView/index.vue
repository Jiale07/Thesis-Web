<template>
  <div>
    <setting-view-header
      :header-title="`开题报告提交页面——页面设置`"
      @on-click-back="goBack"
    >
    </setting-view-header>
    <div class="myContainer">
      <div>
        <addThesisInputSetting
            :tableDataLength="tableDataLength"
          :getThesisInputSettingList="getThesisInputSettingList"
        ></addThesisInputSetting>
      </div>
      <div class="table-box">
        <setting-table
          :tableData="tableData"
          :tableColumn="tableColumn"
          @on-click-delete="handleDelete"
        >
        </setting-table>
      </div>
    </div>
    <setting-create-dialog
      v-if="showSettingCreateDialog"
      :title="'添加自定义输入项标题'"
      :sourceForm="dialogSourceForm"
      :dialogFormItems="dialogFormItems"
      @on-submit="addThesisInputSettingItem"
      @on-click-close="closeCreateDialog"
    >
    </setting-create-dialog>
  </div>
</template>

<script>
import addThesisInputSetting from './components/addThesisInputSetting'
import {
  deletedThesisInputSetting,
  getThesisInputSettingList, updateThesisInputSetting
} from "../../../../axios/adminView/WebViewSetting/ThesisSettingView";
import SettingViewHeader from "../../../../components/backStage/settingView/public/settingViewHeader";
import SettingTable from '../../../../components/backStage/settingTable/index'
import SettingCreateDialog from '../../../../components/backStage/settingCreateDialog'

export default {
  name: "ThesisSettingView",
  data(){
    return{
      inputEmpty:'暂无数据',
      tableData:[],
      loading:false,

      tableDataLength:0,

      showSettingCreateDialog: false,

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
      dialogSourceForm: {
        id: 0,
        serialNumber: 0,
        titleName: '',
      }
    }
  },
  components:{
    addThesisInputSetting,
    SettingViewHeader,
    SettingTable,
    SettingCreateDialog,
  },
  computed: {
    tableColumn() {
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
          minWidth: 120,
          width: 120,
          align: 'left',
          headerAlign: 'center'
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
              clickFunction: this.showCreateDialog,
            },
            {
              prop: 'delete',
              label: '删除',
              type: 'danger',
              size: 'mini',
              clickFunction: this.handleDelete,
            }
          ]
        }
      ]
    }
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },

    getThesisInputSettingList(){
      getThesisInputSettingList().then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.tableDataLength = res.data.length+1
          this.tableData = res.data
        }else{
          this.inputEmpty = res.message
        }
      })
    },

    handleDelete(row){
      deletedThesisInputSetting({id: row.id}).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.$message({
            type:'success',
            message:res.message
          })
          this.getThesisInputSettingList()
        }else{
          this.$message({
            type:'error',
            message:res.message
          })
        }
      })
    },


    addThesisInputSettingItem(form) {
      let GDTISObject = {
        id: form.id,
        serialNumber:form.serialNumber,
        titleName:form.titleName
      }
      updateThesisInputSetting(GDTISObject).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.$message({
            type:'success',
            message:res.message
          })
          this.dialogFormVisible = false
          this.getThesisInputSettingList()
          this.closeCreateDialog()
        }else{
          this.$message({
            type:'error',
            message:res.message
          })
        }
      })
    },

    closeCreateDialog() {
      this.showSettingCreateDialog = false
    },

    showCreateDialog(row) {
      this.dialogSourceForm.id = row.id
      this.dialogSourceForm.serialNumber = row.serialNumber
      this.dialogSourceForm.titleName = row.titleName
      this.showSettingCreateDialog = true
    }
  },

  created() {
    this.getThesisInputSettingList()
  }
}
</script>

<style scoped lang="less">
.myContainer {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #ffffff;

}
</style>