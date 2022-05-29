<template>
  <div :style="{minHeight:asideHeight+'px'}">
    <div class="myHeader myContainer">
      <el-page-header @back="goBack" content="毕业设计课题管理">
      </el-page-header>
    </div>
    <div class="myMain myContainer">
      <div>
        <el-tabs type="handleClick">
          <el-tab-pane label="查看课题">
            <TopicShow></TopicShow>
          </el-tab-pane>
          <el-tab-pane label="添加课题">
            <AddTopic></AddTopic>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>

</template>

<script>
import TopicShow from "./component/TopicShow"
import AddTopic from "./component/AddTopic"

export default {
  name: "TopicView",
  data(){
    return{
      asideHeight:''
    }
  },
  components:{
    TopicShow,
    AddTopic
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    }
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
.myHeader{

}

.myContainer{
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px 0 20px 10px;
  background-color: #ffffff;
  border-radius: 15px;
}

.myMain{
  margin-top: 10px;
}

</style>