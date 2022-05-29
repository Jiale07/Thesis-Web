<template>
  <div>
    <el-descriptions title="基础信息" :column="3">
      <el-descriptions-item label="毕业论文题目">
        <span>{{ ThesisBasicInformation.thesisTopicName }}</span>
        <el-link :underline="false"  type="primary" @click="toThesisProposalView">[查看详情]</el-link>
      </el-descriptions-item>
      <el-descriptions-item label="毕业论文类型">
        <el-tag size="small">{{ ThesisBasicInformation.thesisTopicCategoryName }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions :column="4">
      <el-descriptions-item label="学生姓名">{{ ThesisBasicInformation.studentName }}</el-descriptions-item>
      <el-descriptions-item label="学籍号">{{ ThesisBasicInformation.studentId }}</el-descriptions-item>
      <el-descriptions-item label="所属学院">{{ ThesisBasicInformation.collegeName }}</el-descriptions-item>
      <el-descriptions-item label="所属专业">{{ ThesisBasicInformation.majorName }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions :column="4">
      <el-descriptions-item label="指导老师">{{ ThesisBasicInformation.teacherName }}</el-descriptions-item>
      <el-descriptions-item label="指导老师教职工编号">{{ ThesisBasicInformation.teacherId }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>

import {postThesisBasicInformationVO} from "../../../../axios/public/ThesisBasicInformation";

export default {
  name: "ThesisBasicInformationComponent",
  props:['studentId'],
  data(){
    return{
      ThesisBasicInformation:{},
      TBIErrorMessage:'',
    }
  },
  methods:{
    toThesisProposalView(){
      this.$router.push({
        name:'ThesisProposalView'
      })
    },

    postThesisBasicInformationVO(studentId){
      postThesisBasicInformationVO({
        studentId
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.ThesisBasicInformation = res.data
        }else{
          this.TBIErrorMessage = res.message
        }
      })
    },
  },
  created() {
    this.postThesisBasicInformationVO(this.studentId)
  }
}
</script>

<style scoped>

</style>