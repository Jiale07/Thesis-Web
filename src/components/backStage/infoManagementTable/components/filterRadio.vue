<template>
  <el-popover
      placement="bottom"
      trigger="click"
      v-model="visible"
  >
    <div  class="popover-content-box">
      <div v-if="propFilterOption.length">
        <div
            v-for="(filterItem, index) in propFilterOption"
            :key="`${propsField}-${index}`"
            class="filter-item-box"
            @click="handLeFilterItemSelect(filterItem)"
        >
          <span :class="handleFilterItemStyle(filterItem)">{{ filterItem.label }}</span>
        </div>
      </div>
      <div v-else>
        <div class="empty-box">
          <span>请选择学院</span>
        </div>
      </div>
    </div>
    <div slot="reference" class="reference-box">
      {{ propsTitle }}
      <svg-icon :icon-class="svgIconClass"></svg-icon>
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
    propsValue: [String, Number],
  },
  data() {
    return {
      visible: false,
      currSelectFilterItemValue: 0 // 全部
    }
  },
  computed: {
    svgIconClass() {
      return this.propsValue !== 'all' ? 'filter-blue' : 'filter'
    }
  },
  methods: {
    handLeFilterItemSelect(filterItem) {
      this.visible = false
      this.$emit("handle-filter-item-select", filterItem)
    },
    handleFilterItemStyle(filterItem) {
      if (this.propsValue === filterItem.value) {
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
  cursor: pointer;
}

.filter-item-box:hover {
  background-color: #ecf5ff;
}

.filter-item-selected-style {
  color: #409eff;
}

.empty-box {
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: #909399;
  }
}
</style>