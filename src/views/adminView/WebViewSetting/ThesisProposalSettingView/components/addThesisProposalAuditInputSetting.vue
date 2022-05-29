<template>
  <div>
    <el-button type="primary" @click="showAddDialog">添加</el-button>

    <el-dialog title="添加页面需要输入内容" :visible.sync="dialogFormVisible" width="720px" :before-close="handleClose">
      <el-form :model="form" label-width="100px">
        <el-form-item label="序号" :label-width="formLabelWidth">
          <el-input-number v-model="form.serialNumber" :min="1" :max="99" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="可填写角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleId" placeholder="请选择">
            <el-option
                v-for="item in roleOptions"
                :key="item.id"
                :label="item.roleName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.titleName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitTPAISForm(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {postAddTPAuditInputSetting} from "../../../../../axios/adminView/WebViewSetting/ThesisProposalSettingView";
import {mapState} from "vuex";

export default {
  name: "addTPAISetting",
  props:['postTPAuditInputSettingList'],
  data(){
    return {
      dialogFormVisible:false,
      formLabelWidth:"120px",
      form:{
        serialNumber:'',
        titleName:'',
        roleId:''
      },
    }
  },
  computed:{
    ...mapState('thesisProposalViewSetting',['roleOptions'])
  },
  methods:{
    showAddDialog(){
      this.dialogFormVisible = true
    },

    handleClose(){
      this.form = {
        serialNumber:'',
        titleName:'',
      }
      this.dialogFormVisible = false
    },
    submitTPAISForm(TPAISObject){
      postAddTPAuditInputSetting(TPAISObject).then(result=>{
        let res = result.data
        if (res.resultCode){
          this.$message({
            type:'success',
            message:res.message
          })
          this.dialogFormVisible = false
          // this.$router.go(0)
          this.postTPAuditInputSettingList()
          this.handleClose()
        }else{
          this.$message({
            type:'success',
            message:res.message
          })
        }
      })
    },
  },
  created() {
  }
}
</script>

<style scoped>

</style>