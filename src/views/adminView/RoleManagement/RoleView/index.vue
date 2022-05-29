<template>
  <div>
    <div class="myContainer">
      <AddRoleComponent
        :getRoleInfoPage="getRoleInfoPage"
        :currentPage="pageInfo.current_page"
        :pageSize="pageInfo.page_size"
      ></AddRoleComponent>
    </div>
    <div class="myContainer">
      <el-table
          :empty-text="emptyText"
          :data="pageInfo.tableData"
          ref="expandTable"
          style="width: 100%">
        <el-table-column
            label="角色编号"
            prop="id">
        </el-table-column>
        <el-table-column
            label="角色名称"
            prop="roleName">
        </el-table-column>
        <el-table-column
            label="创建时间"
            prop="createTime">
        </el-table-column>
        <el-table-column
            label="更新时间"
            prop="updateTime">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleMoreInfo(scope.$index, scope.row)">更多</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.current_page"
          :page-sizes="pageInfo.page_sizes"
          :page-size="pageInfo.page_size"
          :page-count="pageInfo.page_count"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          class="myPageStyle">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {deleteRole, getRolePage} from "../../../../axios/adminView/RoleManagement/RoleInfo";
import {dateFormatter} from "../../../../util/dateFormatter";
import AddRoleComponent from "./component/AddRoleComponent"

export default {
  name: "Role",
  data() {
    return {
      emptyText:'',
      pageInfo:{
        //当前页数
        current_page: 1,
        total:100,
        //每页显示条目个数
        page_size:10,
        pager_Count:8,
        //最大页数
        page_count:0,
        page_sizes:[5, 10, 15, 20],
        tableData:[{}],
      },
    }
  },
  components:{
    AddRoleComponent
  },
  computed:{
  },
  methods:{
    getRoleInfoPage(currentPage,pageSize){
      getRolePage({
        currentPage,
        pageSize,
      }).then(res=>{
        let result = res.data
        if (result.resultCode===200){
          if (result.data.records.length===0){
            this.getRoleInfoPage(result.data.current-1,this.pageInfo.page_size)
          }
          //当前页数
          this.pageInfo.current_page = result.data.current
          //总条数
          this.pageInfo.total = result.data.total
          //结果集
          let records = result.data.records
          records.forEach((value,index,array)=>{
            array[index].createTime = dateFormatter(array[index].createTime)
            array[index].updateTime = dateFormatter(array[index].updateTime)
          })
          this.pageInfo.tableData = records
          //最大页数
          this.pageInfo.page_count = result.data.pages
        }else{
          this.emptyText=result.message
        }
      },error=>{
        this.$message({
          type: 'error',
          message: error.message
        });
      })
    },

    // 更改页面可见函数大小
    handleSizeChange(val) {
      this.pageInfo.page_size = val
      this.getRoleInfoPage(this.pageInfo.current_page,val)
    },
    //当前页切换
    handleCurrentChange(val) {
      this.pageInfo.current_page = val
      this.getRoleInfoPage(val,this.pageInfo.page_size)
    },

    handleMoreInfo(index,row) {
      this.$store.state.roleInfoAbout.roleInfo.roleId = row.id
      this.$store.state.roleInfoAbout.roleInfo.roleName = row.name
      this.$router.push({
        name:"RolePermission",
      })
    },
    handleDelete(row) {
      deleteRole({
        roleId:row.id
      }).then(result=>{
        let res = result.data
        if(res.resultCode===200){
          this.$message({
            type:'success',
            message:res.message
          })
          this.getRoleInfoPage(this.pageInfo.current_page,this.pageInfo.page_size)
        }else{
          this.$message({
            type:'error',
            message:res.message
          })
        }
      })
    }
  },
  created() {
    this.getRoleInfoPage(this.pageInfo.current_page,this.pageInfo.page_size)

  }
}
</script>

<style scoped lang="less">
.demo-table-expand {
  margin-left: 20px;
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}


.myContainer{
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #ffffff;
}
.myPageStyle{
  padding-top: 10px;
  text-align: center;
}
</style>