<template>
  <div class="body">
    <div height="120px" class="header">
      <Nav :menu="navMenu" :userInfo="userInfo"></Nav>
    </div>
    <div class="main-box">
      <div class="main">
        <div class="left">
          <slot name="left"></slot>
        </div>
        <div class="right">
          <slot name="right"></slot>
        </div>
      </div>
    </div>
    <Footer class="footer"></Footer>
  </div>
</template>

<script>
import Nav from "@/components/nav/index.vue";
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
    return {}
  },
  computed: {
    navMenu() {
      return this.menu
    }
  },
  components: {Nav, Footer},
}
</script>

<style scoped lang="less">
@import "/src/assets/styles/css/public";
.header {

}

.body {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .header {

  }

  .main-box {
    flex: 1;
    display: flex;
    justify-content: center;

    .main {
      width: 1660px;
      display: flex;
      overflow: auto;

      .left {
        min-width: 300px;
        overflow: auto;
      }

      .right {
        overflow: auto;
      }
    }

    .footer {

    }
  }


}
</style>
