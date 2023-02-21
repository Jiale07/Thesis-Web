<template>
  <div class="main">
    <div class="title-box">
      <span class="title">
        {{ title }}
      </span>
      <svg-icon icon-class="refresh" class="refresh-icon" @click="handleRefresh"></svg-icon>
    </div>
    <div class="button-list-box">
      <el-button
          v-for="(item, index) in buttonList"
          :key="`button-${index}`"
          :type="item.type"
          @click="handleButtonClick(item.key)"
      >添加</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'infoManagementHeader',
  props: {
    title: {
      type: String,
      default: '',
    },
    buttonList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleButtonClick(key) {
      this.$emit('on-click', key)
    },
    handleRefresh() {
      this.$emit('on-refresh')
    }
  }

}
</script>

<style scoped lang="less">
.main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  .title-box {
    display: flex;
    align-items: center;

    .title {
      font-size: 24px;
      font-weight: bolder;
    }

    .refresh-icon {
      display: flex;
      align-items: center;
    }
  }

  .button-list-box {
    display: flex;
    justify-content: flex-end;
  }
}


</style>
