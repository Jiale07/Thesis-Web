<template>
  <div class="titleBox">
    <div class="left">
      <span class="title">
       毕业论文管理系统
      </span>
      <span class="title">{{ formatTitle }}</span>
    </div>
    <div class="right">
      <el-dropdown @command="handleCommand">
        <div class="user">
          <el-image class="userIcon"></el-image>
          <span class="userName">{{ username }}</span>
        </div>
        <el-dropdown-menu v-slot:default>
          <el-dropdown-item command="clickLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>

export default {
  name: "Header",
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
    }
  },
  data() {
    return {}
  },
  computed: {
    formatTitle() {
      return `${this.title}界面`
    },
    username() {
      return this.userInfo.username
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'clickLogout') {
        this.clickLogout()
      }
    },

    clickLogout() {
      this.$store.commit('loginAbout/logout')
      this.$router.push('/login')
    }
  },
  created() {

  },
}
</script>

<style scoped lang="less">
.titleBox {
  display: flex;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
  background-color: #3170A7;

  .title {
    font-size: 28px;
    margin-left: 30px;
    color: #ffffff;
  }

  .right {
    margin-right: 10px;
    display: flex;
    justify-content: flex-end;

    .user {
      display: flex;
      justify-content: space-between;
      text-align: center;

      .userIcon {
        margin: auto 10px;
        height: 30px;
        width: 30px;
        border-radius: 50%;
      }

      .userName {
        margin-right: 10px;
        color: #ffffff;
      }
    }

    .user:hover {
      background-color: #2ca9e1;
    }

  }

}
</style>