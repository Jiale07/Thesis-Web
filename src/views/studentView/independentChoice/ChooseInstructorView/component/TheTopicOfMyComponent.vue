<template>
  <div>
    <el-button @click="handleDrawer" type="primary" style="margin-left: 16px;">
      我的选题
    </el-button>

    <el-drawer
        title="我的选题"
        :visible.sync="drawer"
        >
      <div class="descriptionsBox" v-show="topicVisible">
        <el-descriptions title="题目信息" :column="2">
          <el-descriptions-item label="题目名称">{{ topicInfo.topicName }}</el-descriptions-item>
          <el-descriptions-item label="题目类型">{{ topicInfo.categoryName }}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions>
          <el-descriptions-item label="题目描述">{{ topicInfo.description }}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions>
          <el-descriptions-item label="指导老师">{{ topicInfo.teacherName }}</el-descriptions-item>
          <el-descriptions-item label="审批结果"><span class="message">{{ topicInfo.isPassedMessage }}</span></el-descriptions-item>
        </el-descriptions>
        <el-descriptions>
          <el-descriptions-item label="选中题目时间">
            <el-tag size="small">{{topicInfo.gdtscreateTime}}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="descriptionsBox" v-show="!topicVisible">
        {{message}}
      </div>

      <div class="buttonBox">
        <el-button type="warning" v-show="buttonVisible()" @click="reconfirm">取消选中</el-button>
        <el-button @click = "handleBack">返回</el-button>
      </div>
    </el-drawer>

  </div>
</template>

<script>
import {
  cancelSelected,
  postSelectionTopicResult
} from "../../../../../axios/studentView/independentChoice/choiceInstructorView";
import {mapState} from "vuex";

export default {
  name: "TheTopicOfMyComponent",
  data() {
    return {
      drawer: false,
      topicVisible:true,
      isPassedArr:[
        {
          id:1,
          message:'已通过'
        },{
          id:2,
          message:'未通过'
        },{
          id:0,
          message:'待审批'
        }
      ],

      reconfirmButtonVisible:false,
      topicInfo: {
        topicName:null,
        categoryName:null,
        description:null,
        teacherName:null,
        isPassed:null,
        gdtscreateTime:null,
        gdtsupdateTime:null,
        creatorId:null,
        topicId:null,
      },
      message:null,

    }
  },
  computed:{
    ...mapState('loginAbout',['user'])
  },
  methods:{
    handleDrawer(){
      this.postTopicOfMy(this.user.userId)
      this.drawer = true
    },

    handleBack(){
      this.drawer = false
    },

    buttonVisible(){
      if (this.topicInfo.topicId===null || this.topicInfo.topicId===''){
        return false
      }else{
        if(this.topicInfo.isPassed === 1){
          return false
        }else{
          return true
        }
      }
    },

    postTopicOfMy(studentId){
      postSelectionTopicResult({
        studentId
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          let data = res.data
          let isPassedArr = this.isPassedArr
          data.gdtscreateTime = this.$dayjs(data.gdtscreateTime).format("YYYY-MM-DD hh:mm:ss")
          data.gdtsupdateTime = this.$dayjs(data.gdtsupdateTime).format("YYYY-MM-DD hh:mm:ss")
          isPassedArr.filter(element=>{
            if (data.isPassed===element.id){
             data.isPassedMessage = element.message
            }
          })
          this.topicInfo = data
        }else if (res.resultCode===204){
          this.topicVisible = false
          this.message = res.message
        }
      })
    },

    reconfirm(){
      this.$confirm("确认取消选中?")
          .then(() => {
            this.uncheckedTopic(this.topicInfo.topicId);
          },).catch(() => {})
    },

    uncheckedTopic(topicId) {
      cancelSelected({
        studentId:this.user.userId,
        topicId
      }).then(result=>{
        let res = result.data
        if (res.resultCode === 200){
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
</script>

<style scoped lang="less">
.descriptionsBox{
  margin: 20px;


  .message{
    color: #F40;
  }
}

.buttonBox{
  margin: 20px;
  display: flex;

  .el-button{
    width: 100%;
  }
}


</style>