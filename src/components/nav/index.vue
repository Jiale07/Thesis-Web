<template>
  <div class="Nav">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :style="{height: '60px'}"
    >
      <el-submenu
          v-for="(item,key) in navMenu"
          :index="item.index"
          :key="key"
          :disabled="item.isDisabled"
      >
        <template v-slot:title>{{ item.label }}</template>
        <el-menu-item
            v-for="(childrenItem,key) in item.children"
            :key="key"
            :index="childrenItem.index"
            @click="toView(childrenItem.path)"
            :disabled="childrenItem.isDisabled">
          {{ childrenItem.label }}
        </el-menu-item>
      </el-submenu>
      <div class="user-box">
        <div class="user-button-item">
          <el-dropdown @command="handleCommand" :style="{height: '100%'}">
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
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Nav",
  props: {
    menu: {
      type: Array,
      default: () => [],
    },
    userInfo: {
      type: Object,
      default: () => {
        return {
          username: 'User Name'
        }
      },
      required: true
    }
  },
  data() {
    return {
      activeIndex: '1',
      navMenu: []
    }
  },
  computed: {
    username() {
      return this.userInfo.username
    }
  },
  methods: {
    toView(page) {
      this.$router.push(page)
    },
    // 默认没有children或children长度为0，则isDisabled = true， isHide = true，即使配置了isDisabled和isHide，格式话后的结果也是一样
    menuFilter(list) {
      return list
          .map(item => {
            if (Object.keys(item).includes('children')) {
              item['children'] = this.menuFilter(item['children'])
              if (Object.keys(item).includes('children') && !item['children'].length) {
                // 当没有子菜单的时候，禁止使用父级菜单。
                item['isDisabled'] = true
                item['isHide'] = true
              }
            }
            return {
              ...item
            }
          })
          .filter(item => !item.isHide)
    },
    formatMenu(list, parentIndex) {
      return list.map((item, index) => {
        let currIndex = index + 1 // 从1开始
        if (Object.keys(item).includes('children') && item['children'].length) {
          item['children'] = this.formatMenu(item['children'], currIndex)
        }
        return {
          ...item,
          index: parentIndex ? `${parentIndex}-${currIndex}` : `${currIndex}` // index自动装配
        }
      })
    },
    initMenu() {
      this.navMenu = this.formatMenu(this.menuFilter(this.$cloneDeep(this.menu)))
    },

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
    this.initMenu()
    console.log('userInfo', this.userInfo)
  }
}
</script>

<style scoped lang="less">
.Nav {
  display: flex;
  justify-content: center;
  background-color: #ffffff;
}

.el-menu-demo {
  width: 1280px;
  display: flex;
  align-items: center;
}

.user-box {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: right;
  align-items: center;

  .user-button-item {
    display: flex;
    align-items: center;
    height: 100%;

    .user {
      height: 100%;
      display: flex;
      align-items: center;

      .userIcon {
        margin: auto 10px;
        height: 30px;
        width: 30px;
        border-radius: 50%;
      }

      .userName {
        transition: color 0.3s;
        margin-right: 10px;
        color: #909399;
      }
    }
  }

  .user-button-item:hover /deep/ .userName {
    color: #30318f;
  }

}
</style>
