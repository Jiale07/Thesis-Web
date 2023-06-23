<template>
  <div class="myContent headerBox">
    <el-page-header @back="goBack" :content="title" class="header">
    </el-page-header>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  props: {
    title: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  }
}
</script>

<style scoped lang="less">
.myContent {
  background-color: #ffffff;
  border-radius: 15px;
  padding: 15px 25px;
}

.headerBox {
  margin-bottom: 10px;
}
</style>
