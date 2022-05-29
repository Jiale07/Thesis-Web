<template>
  <div :style="{minHeight:asideHeight+'px'}">
    <div class="myContainer">
      <div class="myHeader"></div>
      <el-page-header @back="goBack" content="教师简介">
      </el-page-header>
    </div>
    <TeacherResume
      :teacherId="teacherId"
    ></TeacherResume>
  </div>
</template>

<script>
import TeacherResume from '../../../../components/TeacherResume'

export default {
  name: "BrowseTeacherResume",
  props:['teacherId'],
  data(){
    return {
      asideHeight:'',
    }
  },
  components:{
    TeacherResume
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    }
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

<style scoped>
.myContainer{
  margin: 0 auto 10px;
  max-width: 1260px;
  padding: 20px 10px;
  background-color: #ffffff;
  border-radius: 15px;
}

.myHeader{

}
</style>