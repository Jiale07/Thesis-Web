<template>
  <div :style="{minHeight:asideHeight+'px'}">
<!--    显示个人基础信息-->
    <div class="myContainer">
      <div class="myContent header">
        <el-page-header @back="goBack" title="返回主页" content="个人信息" class="header">
        </el-page-header>
      </div>
    </div>
    <div class="myContainer">
      <div class="myContent">
        <div>
          <el-row class="tac">
            <el-col :span="4">
              <el-menu
                  default-active="1-1"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose">
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>个人信息</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1" @click="toChildrenView('BasicInformation')">基础信息</el-menu-item>
                    <el-menu-item index="1-2" disabled>个人简介</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="2" >
                  <div @click="toChildrenView('EditPassword')">
                    <i class="el-icon-setting"></i>
                    <span slot="title">更改密码</span>
                  </div>
                </el-menu-item>
              </el-menu>
            </el-col>
            <el-col :span="20">
              <router-view></router-view>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
<!--    显示个人可更改的信息-->
  </div>
</template>

<script>
export default {
  name: "AccountHome",
  data(){
    return {
      asideHeight:'',
      activeIndex: '1',
    }
  },
  methods:{
    goBack(){
      this.$router.push({
        path:'/student'
      })
    },

    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

    handleOpen(){

    },

    handleClose(){

    },

    toChildrenView(ViewName){
      this.$router.push({
        name:ViewName
      })
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

<style scoped lang="less">
.myContainer {
  margin: 0 auto;
  width: 1280px;

  .myContent {
    background-color: #ffffff;
    border-radius: 15px;
    padding: 10px;

    .tac{
      min-height: 720px;
    }
  }
}

.myContainer:nth-child(n):not(:last-child){
  margin-bottom: 10px;
}
</style>
