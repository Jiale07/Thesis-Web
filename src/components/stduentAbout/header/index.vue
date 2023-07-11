<template>
  <div class="header-body container">
    <div class="call-back-box" @click.stop="handleCallBack">
      <i class="el-icon-back"></i>
      <span>{{backTitle}}</span>
    </div>
    <div>
      <span>{{title}}</span>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  props: {
    backTitle: {
      type: String,
      default: '返回'
    },
    title: {
      type: String,
      default: ''
    },
    callBack: {
      type: Function,
      default: () => false
    }
  },
  data() {
    return {}
  },
  methods: {
    handleCallBack() {
      if (this.callBack) {
        this.$router.back()
      } else {
        this.callBack()
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "/src/assets/styles/css/public";
.header-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.call-back-box {
  cursor: hand
}
</style>
