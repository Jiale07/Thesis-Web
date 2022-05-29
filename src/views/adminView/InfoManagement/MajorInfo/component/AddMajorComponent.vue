<template>
  <div>
    <el-button type="primary" @click="addDialog">添加新信息</el-button>
    <el-dialog title="添加专业信息" :visible.sync="addDialogFormVisible">
      <el-form :model="addMajorFrom">
        <el-form-item label="学院" :label-width="formLabelWidth">
          <el-select v-model="addMajorFrom.collegeId" clearable placeholder="请选择">
            <el-option
                v-for="item in this.collegeList"
                :key="item.id"
                :label="item.collegeName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业编号" :label-width="formLabelWidth">
          <el-input v-model="addMajorFrom.id" placeholder="请输入专业名称" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专业名称" :label-width="formLabelWidth">
          <el-input v-model="addMajorFrom.majorName" placeholder="请输入专业名称" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="addDialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitMajor">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addMajor} from "../../../../../axios/adminView/infoManagement/MajorInfo";
import {mapState} from "vuex";

export default {
  name: "AddMajorComponent",
  data(){
    return {
      addDialogFormVisible:false,
      formLabelWidth: '120px',
      addMajorFrom:{
        id:'',
        majorName:'',
        collegeId:'',
        isDeleted:0
      },
    }
  },
  computed:{
    ...mapState('majorInfoAbout',['collegeList'])
  },
  methods:{
    addDialog(){
      this.addDialogFormVisible = true
    },
    submitMajor(){
      addMajor(this.addMajorFrom).then(res=>{
        if (res.data.resultCode ===200){
          this.$message({
            type:'success',
            message:res.data.message
          });
          this.$router.go(0)
        }else{
          this.$message({
            type:'error',
            message:res.data.message
          });
        }
      })
    },
  }
}
</script>

<style scoped>

</style>