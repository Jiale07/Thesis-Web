<template>
  <div>
    <el-button type="primary" @click="handleDialog">添加角色</el-button>
    <div>
      <el-dialog title="添加新新角色" :visible.sync="DialogFormVisible">
        <el-form :model="roleInfoFrom">
          <el-form-item label="角色编号" :label-width="formLabelWidth" >
            <div class="myFromItem">
              <el-input v-model="roleInfoFrom.id"/>
              <el-button @click="getNewRoleIdEvent">获取新的id</el-button>
            </div>
          </el-form-item>
          <el-form-item label="角色名称" :label-width="formLabelWidth">
            <el-input v-model="roleInfoFrom.roleName"/>
          </el-form-item>
        </el-form>
        <div class="mySubmit">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="submitRole(roleInfoFrom.id,roleInfoFrom.roleName)">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {addRole, getNewRoleId} from "../../../../../axios/adminView/RoleManagement/RoleInfo";

export default {
  name: "AddRoleComponent",
  props:['getRoleInfoPage','currentPage','pageSize'],
  data(){
    return {
      DialogFormVisible:false,
      formLabelWidth:'120px',
      roleInfoFrom:{
        id:'',
        roleName:''
      }
    }
  },
  methods:{
    handleDialog(){
      this.DialogFormVisible = true
    },
    getNewRoleIdEvent(){
      getNewRoleId().then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.roleInfoFrom.id = JSON.parse(res.data)["key1"]
          this.$message({
            type:'success',
            message:res.message
          })
        }else{
          this.$message({
            type:'error',
            message:res.message
          })
        }
      })
    },
    submitRole(id,roleName){
      addRole({
        id,
        roleName
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.$message({
            type:'success',
            message:res.message
          })
          this.getRoleInfoPage(this.currentPage,this.pageSize)
          this.closeDialog()
        }else{
          this.$message({
            type:'error',
            message:res.message
          })
        }
      })
    },

    closeDialog(){
      this.roleInfoFrom = {
        id:'',
        roleName:''
      }
      this.DialogFormVisible = false
    }
  }
}
</script>

<style scoped>

.myFromItem{
  display: flex;
}
.mySubmit{
  display: flex;
  justify-content: right;
}
</style>