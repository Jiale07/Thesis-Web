<template>
  <div class="basicInformation" >
    <el-descriptions title="基础信息">
      <el-descriptions-item label="学生名称">{{ StudentBasicInformation.studentName }}</el-descriptions-item>
      <el-descriptions-item label="学号">{{ StudentBasicInformation.studentId }}</el-descriptions-item>
      <el-descriptions-item label="所属学院">{{ StudentBasicInformation.collegeName }}</el-descriptions-item>
      <el-descriptions-item label="所属专业">
        <el-tag size="small">{{ StudentBasicInformation.majorName }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="班级">{{ StudentBasicInformation.classId }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import {postAccountBasicInformation} from "../../../../axios/studentView/account/home";
import {mapState} from "vuex";

export default {
  name: "BasicInformation",
  data(){
    return {
      StudentBasicInformation:{},

    }
  },
  computed:{
    ...mapState('loginAbout',['user'])
  },
  methods:{
    postAccountBasicInformation(studentId){
      postAccountBasicInformation({
        studentId
      }).then(result=>{
        let res = result.data
        this.StudentBasicInformation = res.data
      })
    },
  },

  created() {
    let studentId = this.user.userId
    this.postAccountBasicInformation(studentId)
  }
}
</script>

<style scoped lang="less">
.basicInformation{
  padding:  15px;
}
</style>