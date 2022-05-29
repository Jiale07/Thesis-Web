<template>
  <div>
    <el-button type="primary" size="mini" @click="handleAddPermission">添加</el-button>
    <el-dialog title="添加新权限" :visible.sync="addDialogFormVisible" :before-close="addDialogClose">
      <el-form :model="permissionNew">
        <el-form-item label="权限名称" :label-width="formLabelWidth">
          <el-input v-model="permissionNew.permissionName" placeholder="请输入权限名称" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" :label-width="formLabelWidth">
          <el-input
              type="textarea"
              :autosize="{ minRows: 3}"
              placeholder="请输入权限描述"
              v-model="permissionNew.description"
              maxlength="100"
              show-word-limit
              class="myInputStyle"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div class="submitDiv">
        <el-button @click="addDialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addSubmitFunc">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addPermission} from "../../../../../axios/adminView/RoleManagement/PermissionInfo";

export default {
  name: "addPermissionComponent",
  props:['initialization'],
  data(){
    return {
      addDialogFormVisible:false,
      formLabelWidth: '120px',
      permissionNew:{
        permissionName:'',
        description:'',
        isDeleted:0
      },
    }
  },

  methods:{
    handleAddPermission(){
      this.addDialogFormVisible = true
    },

    addSubmitFunc(){
      addPermission(this.permissionNew).then(res=>{
        let result = res.data
        if (result.resultCode===200){
          this.$message({
            type:'success',
            message:'添加成功'
          })
          this.initialization()
          this.addDialogClose()
        }else{
          this.$message({
            type:'error',
            message:result.message
          })
        }
      })
    },

    addDialogClose(){
      this.addDialogFormVisible = false
      Object.keys(this.permissionNew).forEach(key => (this.permissionNew[key] = ''));
    },
  }
}
</script>

<style scoped>

</style>