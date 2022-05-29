<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
    <el-dialog title="添加公告分类" :visible.sync="dialogFormVisible" width="720px">
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
import {postAddAC} from "../../../../../axios/adminView/Announcement/AnnouncementCategory";

export default {
  name: "AddACComponent",
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
    submitFrom(form){
      postAddAC(form).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.$message({
            type:'success',
            message:res.message
          })
          this.dialogFormVisible = false
          this.$router.go(0)
        }else{
          this.$message({
            type:'error',
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