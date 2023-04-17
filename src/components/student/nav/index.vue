<template>
  <div class="Nav">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
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
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Nav",
  props: ['menu'],
  data() {
    return {
      activeIndex: '1',
      navMenu: []
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
    }
  },
  created() {
    this.initMenu()
  }
}
</script>

<style scoped lang="less">

.Nav {

}
</style>