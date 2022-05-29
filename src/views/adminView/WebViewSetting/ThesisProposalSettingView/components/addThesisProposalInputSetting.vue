<template>
  <div>
    <el-button type="primary" @click="showAddDialog()">添加</el-button>

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
        <el-button type="primary" @click="submitTPISForm(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {postAddTPIS} from "../../../../../axios/adminView/WebViewSetting/ThesisProposalSettingView";

export default {
  name: "addThesisProposalInputSetting",
  props:['getTPISList'],
  data(){
    return {
      dialogFormVisible:false,
      form:{
        serialNumber:'',
        titleName:'',
      },
      formLabelWidth:'120px'
    }
  },

  methods:{
    showAddDialog(){
      this.dialogFormVisible = true;
    },

    submitTPISForm(thesisProposalInputSetting){
      postAddTPIS(thesisProposalInputSetting).then(result=>{
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

    handleClose(){
      this.form = {
        serialNumber:'',
        titleName:'',
      }
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>

</style>