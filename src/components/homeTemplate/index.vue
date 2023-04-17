<template>
  <div>
    <el-container :style="{minHeight:asideHeight+'px'}">
      <el-header height="120px">
        <Header
            :title="title"
            :userInfo="userInfo"
        ></Header>
        <Nav :menu="menu"></Nav>
      </el-header>
      <el-main>
        <div class="left">
          <slot name="left"></slot>
        </div>
        <div class="right">
          <slot name="right"></slot>
        </div>
      </el-main>
      <Footer/>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/header/index.vue";
import Nav from "@/components/student/nav/index.vue";
import {getAsideHeight} from "@/util/tool";
import Footer from "@/components/footer/index.vue";

export default {
  name: "index",
  props: {
    title: {
      type: String,
      default: ''
    },
    userInfo: {
      type: Object,
      default: () => {
        return {
          username: 'User Name'
        }
      }
    },
    menu: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      asideHeight: '',
    }
  },
  components: {Header, Nav, Footer},
  mounted() {
    //获取窗口高度
    this.asideHeight = getAsideHeight()
  },
}
</script>

<style scoped lang="less">
@import "/src/assets/styles/css/public";
.el-header, .el-main, .el-footer {
  padding: 0;
}


.el-header {
  height: 120px;
}

.el-main {
  display: flex;
  justify-content: flex-start;

  .right {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .left {

  }
}
</style>