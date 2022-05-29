<template>
  <div>
    <el-button size="mini" @click="showUpdateDialog">更新</el-button>

    <el-dialog title="添加页面需要输入内容" :visible.sync="dialogFormVisible" width="720px" :before-close="handleClose">
      <el-form :model="form" label-width="100px">
        <el-form-item label="序号" :label-width="formLabelWidth">
          <el-input-number v-model="form.serialNumber" :min="1" :max="99" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.titleName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitGDTISettingForm(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {updateThesisInputSetting} from "../../../../../axios/adminView/WebViewSetting/ThesisSettingView";

export default {
  name: "updateThesisInputSetting",
  props:['row','getThesisInputSettingList'],
  data(){
    return {
      dialogFormVisible:false,
      formLabelWidth:"120px",
      form:{
        serialNumber:'',
        titleName:'',
      }
    }
  },

  methods:{
    showUpdateDialog(){
      this.form.serialNumber = this.row.serialNumber
      this.form.titleName = this.row.titleName
      this.dialogFormVisible = true
    },

    handleClose(){
      this.form = {
        serialNumber:'',
        titleName:'',
      }
      this.dialogFormVisible = false
    },

    submitGDTISettingForm(form){
      let GDTISObject = {
        id:this.row.id,
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
          this.handleClose()
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