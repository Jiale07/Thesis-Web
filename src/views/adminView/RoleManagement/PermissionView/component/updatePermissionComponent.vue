<template>
  <div>

    <el-button
        size="mini"
        @click="handleUpdateInfo(row)">更改</el-button>

    <el-dialog title="更新权限信息" :visible.sync="updateDialogFormVisible" :before-close="updateDialogClose">
      <el-form :model="permissionUpdate">
        <el-form-item label="权限名称" :label-width="formLabelWidth">
          <el-input v-model="permissionUpdate.permissionName" placeholder="请输入权限名称" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" :label-width="formLabelWidth">
          <el-input
              type="textarea"
              :autosize="{ minRows: 3}"
              placeholder="请输入权限描述"
              v-model="permissionUpdate.description"
              maxlength="100"
              show-word-limit
              class="myInputStyle"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div class="submitDiv">
        <el-button @click="updateDialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateSubmitFunc">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {updatePermission} from "../../../../../axios/adminView/RoleManagement/PermissionInfo";

export default {
  name: "updatePermissionComponent",
  props:['initialization','row'],
  data(){
    return {
      updateDialogFormVisible:false,
      formLabelWidth: '120px',
      permissionUpdate:{
        id:'',
        permissionName:'',
        description:'',
      }
    }
  },

  methods:{
    handleUpdateInfo(row) {
      this.permissionUpdate.permissionName = row.permissionName
      this.permissionUpdate.description = row.description
      this.permissionUpdate.id = row.id
      this.updateDialogFormVisible = true
    },
    updateSubmitFunc(){
      updatePermission(this.permissionUpdate).then(res=>{
        let result = res.data
        if (result.resultCode===200){
          this.$message({
            type:'success',
            message:'更新成功'
          })
          this.initialization()
          this.updateDialogClose()
        }else{
          this.$message({
            type:'error',
            message:result.message
          })
        }
      })
    },
    updateDialogClose(){
      this.updateDialogFormVisible = false
      Object.keys(this.permissionUpdate).forEach(key => (this.permissionUpdate[key] = ''));
    },
  }
}
</script>

<style scoped>

</style>