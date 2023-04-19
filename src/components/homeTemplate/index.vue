<template>
  <div class="body">
    <div height="120px" class="header">
      <Header
          :title="title"
          :userInfo="userInfo"
      ></Header>
      <Nav :menu="menu"></Nav>
    </div>
    <div class="main">
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
    <Footer class="footer"></Footer>
  </div>
</template>

<script>
import Header from "@/components/header/index.vue";
import Nav from "@/components/student/nav/index.vue";
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
    }
  },
  components: {Header, Nav, Footer},
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


.body {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  height: 100vh;

  .header {

  }

  .main {
    display: grid;
    grid-template-columns: minmax(300px, 400px) minmax(300px, 1fr);
    flex: 1;
    overflow: auto;
    .left {
      overflow: auto;
    }
    .right {
      overflow: auto;
    }
  }

  .footer {

  }
}
</style>