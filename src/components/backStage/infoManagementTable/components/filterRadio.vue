<template>
  <el-popover
      placement="bottom"
      trigger="click"
      v-model="visible"
  >
    <div class="popover-content-box">
      <div
          v-for="(filterItem, index) in propFilterOption"
          :key="`${propsField}-${index}`"
          class="filter-item-box"
          @click="handLeFilterItemSelect(filterItem)"
      >
        <span :class="handleFilterItemStyle(filterItem)">{{ filterItem.label }}</span>
      </div>
    </div>
    <div slot="reference" class="reference-box">
      {{ propsTitle }}
      <svg-icon icon-class="filter"></svg-icon>
    </div>
  </el-popover>
</template>

<script>
export default {
  name: 'filterRadio',
  props: {
    propFilterOption: {
      type: Array,
      default: () => []
    },
    propsField: String,
    propsTitle: String,
  },
  data() {
    return {
      visible: false,
      currSelectFilterItemValue: 0
    }
  },
  methods: {
    handLeFilterItemSelect(filterItem) {
      this.currSelectFilterItemValue = filterItem.value
      this.visible = false
      this.$emit("handle-filter-item-select", filterItem)
    },
    handleFilterItemStyle(filterItem) {
      if (this.currSelectFilterItemValue === filterItem.value) {
        return 'filter-item-selected-style'
      } else {
        return ''
      }
    }
  },
}
</script>

<style scoped lang="less">
.reference-box {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.popover-content-box {

}
.filter-item-box {
  padding: 5px;
}
.filter-item-box:hover {
  background-color: #ecf5ff;
}
.filter-item-selected-style {
  color: #409eff;
}
</style>