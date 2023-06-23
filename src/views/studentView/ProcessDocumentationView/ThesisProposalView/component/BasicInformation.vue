<template>
  <div>
    <el-descriptions title="基础信息" :column="4">
      <el-descriptions-item label="学生姓名">{{fixedInformation.studentInfo.studentName}}</el-descriptions-item>
      <el-descriptions-item label="学号">{{fixedInformation.studentInfo.id}}</el-descriptions-item>
      <el-descriptions-item label="指导老师">{{fixedInformation.teacherInfo.teacherName}}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import {
  postStudentInfoById,
  postTeacherInfoOfInstructorById
} from "@/axios/studentView/processDocumentation/ThesisProposal";

export default {
  name: "BasicInformation",
  props:['studentId'],
  data(){
    return {
      fixedInformation:{
        studentInfo:{
          id:'',
          studentName:'',
        },
        teacherInfo:{
          teacherName:''
        },
      },
    }
  },

  methods:{
    postStudentInfoById(studentId){
      postStudentInfoById({studentId}).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.fixedInformation.studentInfo = res.data
        }
      })
    },

    postTeacherInfoOfInstructorById(studentId){
      postTeacherInfoOfInstructorById({studentId}).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.fixedInformation.teacherInfo = res.data
        }
      })
    },
  },

  created() {
    this.postStudentInfoById(this.studentId)
    this.postTeacherInfoOfInstructorById(this.studentId)
  }
}
</script>

<style scoped>

</style>
