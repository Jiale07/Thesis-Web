<template>
  <div class="setting-header container">
    <div class="myContainer myHeader">
      <el-page-header @back="onClickBack" :content="headerTitle">
      </el-page-header>
    </div>
  </div>
</template>

<script>
export default {
  name: "settingViewHeader",
  props: {
    titleText: {
      type: String,
      default: ''
    }
  },

  goBack: {
    type: Function,
    default: ()=> {
      this.$router.go(-1)
    }
  },
  computed: {
    headerTitle() {
      return this.titleText || ''
    }
  },
  data() {
    return {}
  },
  methods: {
    onClickBack(){
     this.goBack
    },
  }
}
</script>

<style scoped lang="less">
.setting-header {

}

.container {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #ffffff;
}
</style>