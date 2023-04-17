<template>
  <div>
    <div class="myContainer">
      <addPermissionComponent
        :initialization="initialization"
      ></addPermissionComponent>
    </div>
    <div class="myContainer">
      <el-table
          :data="this.pageInfo.tableData"
          ref="expandTable"
          style="width: 100%">
        <el-table-column
            label="权限编号"
            prop="id">
        </el-table-column>
        <el-table-column
            label="权限名称"
            prop="permissionName">
        </el-table-column>
        <el-table-column
            label="描述"
            prop="description">
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
            <div class="buttonBox">
              <updatePermissionComponent
                  :initialization="initialization"
                  :row="scope.row"
              ></updatePermissionComponent>
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.pageInfo.current_page"
          :page-sizes="this.pageInfo.page_sizes"
          :page-size="this.pageInfo.page_size"
          :page-count="this.pageInfo.page_count"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.pageInfo.total"
          class="myPageStyle">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {
  deletedPermission,
  getPermissionByPage,
} from "../../../../axios/adminView/RoleManagement/PermissionInfo";
import addPermissionComponent from './component/addPermissionComponent'
import updatePermissionComponent from './component/updatePermissionComponent'
export default {
  name: "Permission",
  data(){
    return {
      tableData:'',
      addDialogFormVisible:false,
      updateDialogFormVisible:false,
      formLabelWidth: '120px',
      permissionUpdate:{
        id:'',
        permissionName:'',
        description:'',
        isDeleted:0
      }
    }
  },
  computed:{
    ...mapState('roleInfoAbout',['pageInfo']),
  },
  components:{
    addPermissionComponent,
    updatePermissionComponent
  },
  methods:{

    handleDelete(index, row) {
      deletedPermission({
        permissionId:row.id
      }).then(res=>{
        let result = res.data
        if (result.resultCode===200){
          this.$message({
            type:'success',
            message:'删除成功'
          })
          this.getPermissionInfo(this.pageInfo.current_page,this.pageInfo.page_size)
        }else{
          this.$message({
            type:'error',
            message:result.message
          })
        }
      })
    },
    // 更改页面可见函数大小
    handleSizeChange(val) {
      this.pageInfo.page_size = val
      this.getPermissionInfo(this.pageInfo.current_page,val)
    },
    //当前页切换
    handleCurrentChange(val) {
      this.pageInfo.current_page = val
      this.getPermissionInfo(val,this.pageInfo.page_size)
    },

    //获取权限信息
    getPermissionInfo(currentPage,pageSize){
      getPermissionByPage({
        currentPage,
        pageSize
      }).then(res=>{
        let result = res.data
        if (result.resultCode === 200){
          if (result.data.records.length===0){
            this.getPermissionInfo(result.data.current-1,this.pageInfo.page_size)
          }
          //当前页数
          this.pageInfo.current_page = res.data.data.current
          //总条数
          this.pageInfo.total = res.data.data.total
          //结果集
          let records = result.data.records
          records.forEach((value,index,array)=>{
            array[index].createTime = this.$dayjs(array[index].createTime).format("YYYY-MM-DD hh:mm:ss")
            array[index].updateTime = this.$dayjs(array[index].updateTime).format("YYYY-MM-DD hh:mm:ss")
          })

          this.pageInfo.tableData = records
          //最大页数
          this.pageInfo.page_count = res.data.data.pages
        }else{
          this.$message({
            type:'error',
            message:result.message,
          })
        }
      })
    },
    initialization(){
      this.getPermissionInfo(this.pageInfo.current_page,this.pageInfo.page_size)
    }
  },
  created() {
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
.myPageStyle{
  padding-top: 10px;
  text-align: center;
}
.submitDiv{
  display: flex;
  justify-content: flex-end;
}

.buttonBox{
  display: flex;
  width: 120px;
  justify-content: space-between;
}
</style>