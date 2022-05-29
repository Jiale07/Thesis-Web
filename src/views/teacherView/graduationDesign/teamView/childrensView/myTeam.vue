<template>
  <div>
    <div class="mainBox">
      <div class="left">
        <el-descriptions title="小组信息">
          <el-descriptions-item label="教师名称">{{ teacherInfo.teacherName }}</el-descriptions-item>
          <el-descriptions-item label="教职工编号"><el-tag size="small">{{ teacherInfo.id }}</el-tag></el-descriptions-item>
          <el-descriptions-item label="小组成员数量">{{ TeamMemberNumber }}</el-descriptions-item>
        </el-descriptions>
      </div>
<!--      <div class="right">-->
<!--        <div class="titleBox">-->
<!--          <span class="title">过程文档提交数量</span>-->
<!--        </div>-->
<!--        <div>-->
<!--          <div class="constItem">-->
<!--            <span>开题报告</span>-->
<!--            <div>-->
<!--              <el-progress :text-inside="true" :stroke-width="26" :percentage="70" :color="colors"></el-progress>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="constItem">-->
<!--            <span>毕业论文</span>-->
<!--            <div>-->
<!--              <el-progress :text-inside="true" :stroke-width="26" :percentage="100" :color="colors"></el-progress>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="constItem">-->
<!--            <span>毕业论文（最终版）</span>-->
<!--            <div>-->
<!--              <el-progress :text-inside="true" :stroke-width="26" :percentage="19" :color="colors"></el-progress>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>


import {postGDTeamMemberNumber, postTeacherInfo} from "../../../../../axios/teacher/GDTeamAbout/MyTeamView";
import {mapState} from "vuex";

export default {
  name: "myTeam",
  data(){
    return {
      statusData:[
        {
          number:'30',
          statusText:'exception'
        },
        {
          number:'30',
          statusText:'exception'
        },
        {
          number:'30',
          statusText:'exception'
        },
        {
          number:'30',
          statusText:'exception'
        }
      ],
      colors: [
        {color: '#f56c6c', percentage: 20},
        {color: '#e6a23c', percentage: 40},
        {color: '#5cb87a', percentage: 60},
        {color: '#1989fa', percentage: 80},
        {color: '#6f7ad3', percentage: 100}
      ],
      teacherInfo:'',
      TeamMemberNumber:'',
    }
  },
  computed:{
    ...mapState("loginAbout",['user']),
    ...mapState("teamAboutStore",['teamInfo'])
  },
  methods:{
    postTeacherInfo(){
      postTeacherInfo({
        teacherId:this.user.userId
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.teacherInfo = res.data
        }
      })
    },

    postGDTeamMemberNumber(){
      postGDTeamMemberNumber({
        gdTeamId:this.teamInfo.id
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.TeamMemberNumber = res.data
        }else{
          this.TeamMemberNumber = res.message
        }
      })
    },

    initialization(){
      this.postTeacherInfo()
      this.postGDTeamMemberNumber()
    }
  },
  created() {
    this.initialization()
  }
}
</script>

<style scoped lang="less">
.mainBox{
  width: 1128px;
  display: flex;
  justify-content: space-between;
  .left{
    width: 600px;
  }

  .right{


    .titleBox{
      font-size: 20px;
      font-weight: 600;
    }

    .el-progress {
      width: 220px;
    }

    .constItem{
      margin: 10px;
      display: flex;

    }
  }
}

</style>