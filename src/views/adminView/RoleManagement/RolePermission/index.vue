<template>
  <div>
    <el-page-header
        @back="goBack"
        :content="`${roleInfoObject.roleName}——详情页面`"
        class="myContainer"
    >
    </el-page-header>
    <div class="myContainer">
      <div>
        <el-descriptions
            title="角色信息"
            :column="2"
        >
          <el-descriptions-item label="编号">{{roleInfoObject.id}}</el-descriptions-item>
          <el-descriptions-item label="名称">{{roleInfoObject.roleName}}</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{roleInfoObject.createTime}}</el-descriptions-item>
          <el-descriptions-item label="更新时间">{{roleInfoObject.updateTime}}</el-descriptions-item>
        </el-descriptions>
        <el-divider></el-divider>
        <div class="permissionTitle">
          <h4>持有权限：</h4>
          <div class="addButtonBox">
            <AddRolePermissionComponent
                :roleInfoObject="roleInfoObject"
                :initialization="initialization"
            ></AddRolePermissionComponent>
            <el-button type="primary" size="mini" @click="refreshButton">刷新</el-button>
          </div>
        </div>
        <el-table
            :empty-text="emptyText"
            v-loading="tableLoading"
            :data="permission"
            stripe
            style="width: 100%">
          <el-table-column
              prop="sysPermission.id"
              label="编号"
              width="180">
          </el-table-column>
          <el-table-column
              prop="sysPermission.permissionName"
              label="名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="sysPermission.description"
              label="描述">
          </el-table-column>
          <el-table-column
              prop="createTime"
              label="授权时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index,scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>
</template>

<script>
import {mapState} from "vuex";
import {
  deleteRolePermissionById, postFindOneRoleByRoleId, postFindRolePermissionByRoleId,

} from "../../../../axios/adminView/RoleManagement/RoleInfo";
import AddRolePermissionComponent from "./component/AddRolePermissionComponent"
export default {
  name: "RolePermission",
  data(){

    return {
      roleInfoObject:{
        id:'',
        name:'',
        createTime:'',
        updateTime:'',

      },

      formLabelWidth:"120px",
      tableLoading:true,
      emptyText:'',
    }
  },
  components:{
    AddRolePermissionComponent
  },
  computed:{
    ...mapState('roleInfoAbout',['roleInfo','permission'])
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },



    getRoleInfo(roleId){
      postFindOneRoleByRoleId({
        roleId
      }).then(res=>{
        let result = res.data
        if (result.resultCode===200){
          let records = result.data
          records.createTime = this.$dayjs(records.createTime).format("YYYY-MM-DD hh:mm:ss")
          records.updateTime = this.$dayjs(records.updateTime).format("YYYY-MM-DD hh:mm:ss")
          this.roleInfoObject = records
        }else{
          this.$message({
            type:'error',
            message:result.message,
          })
        }
      })
    },

    getRolePermission(roleId){
      postFindRolePermissionByRoleId({
        roleId
      }).then(res=>{
        let result = res.data
        if (result.resultCode === 200){
          let data = result.data
          data.forEach((value,index,array)=>{
            array[index].createTime = this.$dayjs(array[index].createTime).format("YYYY-MM-DD hh:mm:ss")
            array[index].updateTime = this.$dayjs(array[index].updateTime).format("YYYY-MM-DD hh:mm:ss")
          })
          this.$store.commit("roleInfoAbout/setPermission",data)
        }else{
          this.emptyText = result.message
        }
        setTimeout(()=>{
          this.tableLoading = false
        },0)
      })
    },


    handleDelete(index,row){
      deleteRolePermissionById({
        roleId:this.roleInfoObject.id,
        permissionId:row.permissionId
      }).then(res=>{
        let result = res.data
        if(result.resultCode===200){
          this.$message({
            type:result.message,
            message:"删除成功"
          })
          this.initialization()
        }else{
          this.$message({
            type:'error',
            message:result.message
          })
        }
      })
    },
    refreshButton(){
      this.getRoleInfo(this.roleInfo.roleId)
      this.initialization()
    },

    initialization(){
      this.getRolePermission(this.roleInfo.roleId)
    }
  },
  created() {
    this.getRoleInfo(this.roleInfo.roleId)
    this.initialization()
  }

}
</script>

<style scoped lang="less">
.myContainer{
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #ffffff;
}

.permissionTitle{
  display: flex;
  justify-content: space-between;
}

.addButtonBox{
  display: flex;
  justify-content: right;
}
</style>