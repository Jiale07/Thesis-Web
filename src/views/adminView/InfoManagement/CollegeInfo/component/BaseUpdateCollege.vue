<template>
  <div>
    <el-button
        size="mini"
        @click="handleEdit">Edit</el-button>
    <el-dialog title="更改学院信息" :visible.sync="dialogFormVisible" align="left">
      <el-form :model="newCollege">
        <el-form-item label="学院编号" :label-width="formLabelWidth">
          <el-input v-model="newCollege.id" :placeholder="oldCollege.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="学院名称" :label-width="formLabelWidth">
          <el-input v-model="newCollege.collegeName" :placeholder="oldCollege.collegeName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialogButtonBox">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateCollege">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {updateCollegeId, updateCollegeName} from "../../../../../axios/adminView/infoManagement/CollegeInfo";

export default {
  name: "BaseUpdateCollege",
  props:['currentPage','pageSize','postCollegeInfoPage','row'],
  data(){
    return{
      newCollege:{
        id:'',
        collegeName:'',
        isDeleted:0
      },
      oldCollege:{},
      dialogFormVisible:false,
      formLabelWidth: '120px',
    }

  },

  methods:{
    handleEdit() {
      this.dialogFormVisible = true;
      this.oldCollege = this.row
    },


    updateCollege(){
      let _this = this
      if(this.newCollege.id.toString() === this.oldCollege.id.toString()
          && this.newCollege.collegeName === this.oldCollege.collegeName){
        this.message('warning',"内容相同,不作更新操作")
        return
      }
      if(this.newCollege.id.toString() !== this.oldCollege.id.toString()
          && this.newCollege.collegeName === this.oldCollege.collegeName){
        updateCollegeId({
          oldId:this.oldCollege.id,
          newId:this.newCollege.id
        }).then(res=>{
          this.$message({
            type: 'success',
            message: res.data.message
          });
          this.dialogFormVisible = false
          _this.postCollegeInfoPage(this.currentPage,this.pageSize)
        })
        return
      }
      if(this.newCollege.id==="" ||this.newCollege.id===null){
        this.newCollege.id = this.oldCollege.id
      }
      updateCollegeName(this.newCollege).then(res=>{
        this.$message({
          type: 'success',
          message: res.data.message
        });
        this.dialogFormVisible = false
        _this.postCollegeInfoPage(this.currentPage,this.pageSize)
      })
      //  清空
      this.newCollege = {}
      this.oldCollege = {}
    },
  }

}
</script>

<style scoped>
.dialogButtonBox{
  display: flex;
  justify-content: right;
}
</style>