<template>
  <div class="body">
    <div class="header">
      <Nav :userInfo="userInfo"></Nav>
    </div>
    <div class="main">
      <NavLeft></NavLeft>
      <div class="router-box">
        <router-view :key="$route.fullPath"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import NavLeft from './component/NavLeft/index'
import {postAdminInfo} from "@/axios/adminView/homeView";
import {mapState} from "vuex";
import Nav from "@/components/nav/index.vue";


export default {
  name: "AdminHome",
  data() {
    return {
      userTitle: '管理员',
      userInfo: {
        userId: '',
        username: 'AdminName'
      }
    }
  },
  computed: {
    ...mapState('loginAbout', ['user'])
  },
  components: {
    Nav,
    NavLeft
  },
  methods: {
    postAdminInfo(adminId) {
      postAdminInfo({
        adminId
      }).then(result => {
        let res = result.data
        if (res.resultCode === 200) {
          this.userInfo.userId = res.data.id
          this.userInfo.userName = res.data.adminName
        }
      })
    }
  },
  created() {
    this.postAdminInfo(this.user.userId)
  }
}
</script>

<style scoped lang="less">
.body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {

}

.main {
  display: flex;
  flex: 1;

  .router-box {
    padding: 10px;
    width: 100%;
  }
}

.myContainer {
  position: sticky;
  top: 0;
}

.myAside {

  background-color: #a1a1a1;
  width: 200px;
}
</style>
