<template>
  <div>
    <div>
      <el-button @click="addCollegeDialogShow" type="primary">添加</el-button>
    </div>
    <div>
      <el-dialog title="添加新学院" :visible.sync="DialogFormVisible" @close="closeDialog">
        <el-form :model="CollegeFromNew">
          <el-form-item label="学院编号" :label-width="formLabelWidth" >
            <div class="myFromItem">
              <el-input v-model="CollegeFromNew.id"/>
              <el-button @click="getNewCollegeIdEvent">获取新的id</el-button>
            </div>
          </el-form-item>
          <el-form-item label="学院名称" :label-width="formLabelWidth">
            <el-input v-model="CollegeFromNew.collegeName"/>
          </el-form-item>
        </el-form>
        <div class="mySubmit">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="submitCollege">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {addCollegeInfo, getOneNewCollegeId} from "../../../../../axios/adminView/infoManagement/CollegeInfo";

export default {
  name: "BaseAddCollege",props:['currentPage','pageSize','postCollegeInfoPage'],

  data(){
    return {
      formLabelWidth:'120px',
      DialogFormVisible:false,

      CollegeFromNew:{
        id:'',
        collegeName:'',
        isDeleted:0
      },
    }
  },
  methods:{
    addCollegeDialogShow(){
      this.DialogFormVisible = true
    },

    getNewCollegeIdEvent(){
      getOneNewCollegeId().then(res=>{
        let result = res.data
        if (result.resultCode===200){
          this.CollegeFromNew.id = result.data
        }else{
          this.$message({
            type:'error',
            message:result.message
          })
        }
      })
    },

    submitCollege(){
      addCollegeInfo(this.CollegeFromNew).then(res=>{
        let result = res.data
        if (result.resultCode===200){
          this.$message({
            type:'success',
            message:result.message
          });
          this.postCollegeInfoPage(this.currentPage,this.pageSize)
          this.DialogFormVisible = false
        }else{
          this.$message({
            type:'error',
            message:result.message
          })
        }
      })
    },

    closeDialog(){
      this.CollegeFromNew = {
        id:'',
        collegeName:'',
        isDeleted:0
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