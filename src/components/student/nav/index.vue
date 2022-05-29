<template>
  <div class="Nav">
    <!--        @select="handleSelect"-->
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
    >
      <el-submenu v-for="(item,key) in menu" :index="item.menuId" :key="key">
        <template slot="title">{{item.title}}</template>
        <el-menu-item
            v-for="(childrenItem,key) in item.children"
            :key="key"
            @click = "toView(childrenItem.path)"
            :disabled="childrenItem.isDisabled">
          {{childrenItem.text}}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Nav",
  props:['menu'],
  data(){
    return {
      activeIndex:'1'
    }
  },
  methods:{
    // handleSelect(key, keyPath) {
    //   console.log(key, keyPath);
    // },

    toView(page){
      this.$router.push(page)
    }
  }
}
</script>

<style scoped lang="less">

.Nav{

}
</style>