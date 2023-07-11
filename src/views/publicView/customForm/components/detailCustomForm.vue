<template>
  <div>
    <div
        v-for="(cItem) in componentList"
        :key="cItem.id"
        class="component-item">
      <div class="label">{{ cItem.label }}</div>
      <div>
        <span>{{cItem.value}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailCustomForm',
  props: {
    componentList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="less">
.component-item {
  display: flex;
  align-items: center;

  .label {
    margin-right: 10px;
  }
}

.component-item:not(:last-child) {
  margin-bottom: 10px;
}
</style>
