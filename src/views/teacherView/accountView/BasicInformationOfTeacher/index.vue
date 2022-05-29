<template>
  <div class="basicInformation">
    <el-descriptions title="教师基础信息">
      <el-descriptions-item label="教师名称">{{TeacherBasicInformation.teacherName}}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{ TeacherBasicInformation.teacherId }}</el-descriptions-item>
      <el-descriptions-item label="联系地址">{{TeacherBasicInformation.collegeName}}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import {posTeacherBasicInformation} from "../../../../axios/teacher/account/accountHomeOfTeacherAbout";
import {mapState} from "vuex";

export default {
  name: "BasicInformationOfTeacher",
  data(){
    return {
      teacherId:'',
      TeacherBasicInformation:{
        teacherName:'',
        teacherId:'',
        collegeName:''
      }
    }
  },
  computed:{
    ...mapState("loginAbout",['user'])
  },
  methods:{
    posTeacherBasicInformation(teacherId){
      posTeacherBasicInformation({teacherId}).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.TeacherBasicInformation = res.data
          console.log(res.data)
        }
      })
    }
  },

  created() {
    this.teacherId = this.user.userId
    this.posTeacherBasicInformation(this.teacherId)
  }
}
</script>

<style scoped lang="less">
.basicInformation{
  padding:  15px;
}
</style>