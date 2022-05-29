<template>
  <div :style="{minHeight:asideHeight+'px'}">
    <div class="myHeader">
      <div class="buttonBox">
        <el-button size="mini" @click="toEditResume">编辑简介</el-button>
      </div>
    </div>
    <TeacherResume
      :teacherId="teacherId"
    ></TeacherResume>
  </div>
</template>

<script>
import TeacherResume from '../../../../components/TeacherResume'
export default {
  name: "ResumeView",
  data(){
    return {
      asideHeight:'',
    }
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },

    toEditResume(){
      this.$router.push({
        name:'EditResume',
        params:{
          'teacherId':this.teacherId
        }
      })
    }
  },
  computed:{
    teacherId:{
      get(){
        return this.$store.state.loginAbout.user.userId
      }
    }
  },
  components:{
    TeacherResume,
  },

  created() {
  },

  mounted() {
    //获取窗口高度
    this.asideHeight = document.documentElement.clientHeight;
    window.onresize = () => {
      return (() => {
        this.asideHeight = document.documentElement.clientHeight;
      })()
    }
  },
}
</script>

<style scoped lang="less">
.myHeader{

  .buttonBox{
    display: flex;
    justify-content: right;
    margin-right: 10px;
  }
}

.myContainer{
  margin: 0 auto 10px;
  max-width: 1280px;
  padding: 20px 0 20px 10px;
  background-color: #ffffff;
  border-radius: 15px;
}
</style>