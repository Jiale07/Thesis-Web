<template>
  <div>
    <el-button type="warning" @click="showUpdateDialog(row)">更新</el-button>
    <el-dialog title="更改公告分类" :visible.sync="dialogFormVisible" width="720px">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.categoryName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类类描述" :label-width="formLabelWidth">
          <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="form.description"
              maxlength="30"
              show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFrom(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {postUpdateAC} from "../../../../../axios/adminView/Announcement/AnnouncementCategory";

export default {
  name: "UpdateACComponent",
  props:['row'],
  data(){
    return {
      dialogFormVisible: false,
      form:{
        id:null,
        categoryName:null,
        description:null,
      },
      formLabelWidth:'120px'
    }
  },
  methods:{
    showUpdateDialog(row){
      this.form.id = row.id
      this.form.categoryName = row.categoryName
      this.form.description = row.description
      this.dialogFormVisible = true
    },
    submitFrom(from){
      if (this.form.categoryName===this.row.categoryName &&
          this.form.description===this.row.description){
        this.$message({
          type:'warning',
          message:'内容尚未跟该，不进行更新操作'
        })
      }else{
        postUpdateAC(from).then(result=>{
          let res = result.data
          if (res.resultCode===200){
            this.$message({
              type:'success',
              message:res.message
            })
            this.$router.go(0)
          }else{
            this.$message({
              type:'error',
              message:res.message
            })
          }
        })
      }

    }
  }
}
</script>

<style scoped>

</style>