<template>
  <div>
    <el-button size="mini" @click="showDialog(row)">更新</el-button>

    <el-dialog title="更新审核结果类型" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="form">
        <el-form-item label="审核结果值" :label-width="formLabelWidth">
          <el-input-number v-model="form.auditStatusValue" @change="handleChange" :min="0" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="审核结果名称" :label-width="formLabelWidth">
          <el-input v-model="form.auditStatusName" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitForm(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {postUpdateAuditStatusCategory} from "../../../../../axios/adminView/WebViewSetting/AuditStatusCategorySettingView";

export default {
  name: "UpdateAuditStatusCategory",
  props:['getAuditStatusCategoryList','row'],
  data(){
    return {
      dialogFormVisible: false,
      form:{
        id:'',
        auditStatusValue:'',
        auditStatusName:'',
      },
      formLabelWidth: '120px'
    }
  },

  methods:{
    handleChange(){

    },

    showDialog(row){
      this.form.id = row.id
      this.form.auditStatusName = row.auditStatusName
      this.form.auditStatusValue = row.auditStatusValue
      this.dialogFormVisible = true
    },

    handleClose(){
      this.dialogFormVisible = false
      this.form = {
        id:'',
        auditStatusValue:'',
        auditStatusName:'',
      }
    },

    submitForm(auditStatusCategory){
      postUpdateAuditStatusCategory(auditStatusCategory).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.$message({
            type:'success',
            message:res.message
          })
          this.getAuditStatusCategoryList()
          this.dialogFormVisible = false
        }else{
          this.$message({
            type:'error',
            message:res.message
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>