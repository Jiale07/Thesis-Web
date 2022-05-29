<template>
  <div>
    <el-button type="primary" size="mini" @click="permissionExit" class="addButton">添加</el-button>
    <el-dialog title="添加/批量添加" :visible.sync="dialogFormVisible">
      <el-transfer
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入权限名称"
          :titles="['尚未拥有的权限', '需要添加的权限']"
          v-model="value"
          :data="permissionList">
      </el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit(value,roleInfoObject.id)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addRolePermission, getPermission} from "../../../../../axios/adminView/RoleManagement/PermissionInfo";
import {mapState} from "vuex";

export default {
  name: "AddRolePermissionComponent",
  props:['roleInfoObject','initialization'],
  data(){
    return {

      dialogFormVisible:false,
      value: [],
      permissionList:[],
      // 自定以搜索方法
      filterMethod(query, item) {
        return item.permissionName.indexOf(query) > -1;
      }
    }
  },
  computed:{
    ...mapState('roleInfoAbout',['permission'])
  },
  methods:{
    permissionExit(){
      this.getPermissionList()
      this.dialogFormVisible = true
    },

    //获取所有权限，并且不会重复出现已有权限
    getPermissionList(){
      getPermission().then(res=>{
        let result = res.data
        if (result.resultCode===200){
          let list = result.data
          let roleInfoObject = this.permission
          roleInfoObject.forEach((rpElement)=>{
            list.forEach((listElement,index)=>{
              // console.log(rpElement.permissionId===listElement.id)
              if (rpElement.permissionId===listElement.id){
                list.splice(index,1)
              }
            })
          })
          this.permissionList = []
          list.forEach(element=>{
            this.permissionList.push({
              label:element.permissionName,
              key:element.id,
              permissionName:element.permissionName
            })
          })

        }else{
          this.$message({
            type:'error',
            message:result.message
          })
        }
      })
    },

    submit(permissionArray,roleId){
      let addRolePermissionVO={
        roleId,
        permissionArray
      }
      addRolePermission(addRolePermissionVO).then(res=>{
        let result = res.data
        if (result.resultCode===200){
          this.$message({
            type:'success',
            message:result.message,
          })
          this.initialization()
        }else{
          this.$message({
            type:'error',
            message:result.message,
          })
        }
      })
      this.value = []
      this.dialogFormVisible = false
    },
  }
}
</script>

<style scoped>
.addButton{
  margin-right: 10px;
}
</style>