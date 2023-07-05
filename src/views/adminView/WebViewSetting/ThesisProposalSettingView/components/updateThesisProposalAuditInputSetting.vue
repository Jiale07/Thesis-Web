<template>
  <div class="componentBox">
    <el-button size="mini" @click="showUpdateDialog()">更改</el-button>

    <div class="dialogBox">
      <el-dialog title="更改页面需要输入内容" :visible.sync="dialogFormVisible" width="720px" :before-close="handleClose" align="left">
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
  </div>
</template>

<script>
import {mapState} from "vuex";
import {postUpdateTPAuditInputSetting} from "@/axios/adminView/WebViewSetting/ThesisProposalSettingView";

export default {
  name: "updateTPAISetting",
  props:['row','postTPAuditInputSettingList'],
  data(){
    return {
      dialogFormVisible:false,
      formLabelWidth:'120px',

      form:{
        id:'',
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
    showUpdateDialog(){
      this.form.id = this.row.id
      this.form.serialNumber = this.row.serialNumber
      this.form.titleName = this.row.titleName
      this.form.roleId = this.row.roleId
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
      postUpdateTPAuditInputSetting(TPAISObject).then(result=>{
        let res = result.data
        if (res.resultCode){
          this.$message({
            type:'success',
            message:res.message
          })
          this.postTPAuditInputSettingList()
          this.handleClose()
          this.dialogFormVisible = false
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
.componentBox{
  margin-right: 10px;
}
</style>
