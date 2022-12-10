<template>
  <div class="query-filter">
    <div class="filter-item">
      <div
          v-for="(item, index) in srcFilterOptionArray"
          :key="`filter_${item.componentName}_${index}`"
          class="filter-option-item"
      >
        <div class="item-title">
          <span>{{ item.title }}：</span>
        </div>
        <div v-if="ComponentName[ComponentType.ElSelect]" class="operating-components">
          <el-select v-model="item.value" placeholder="请选择" @change="handlerChange(item)" :size="allButtonSize">
            <el-option
                v-for="(optionItem, index) in item.options"
                :key="`optionItem_${optionItem.key}_${index}`"
                :label="optionItem.label"
                :value="optionItem.value"
                :disabled="optionItem.disabled"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="button-box">
      <el-button type="primary" :size="allButtonSize" @click="resetFilterData">重置</el-button>
    </div>
  </div>
</template>

<script>
const ComponentType = {
  ElSelect: 1,
}
const ComponentName = {
  [ComponentType.ElSelect]: 'el-select'
}
export default {
  name: "QueryFilter",
  props: {
    srcFilterOptionArray: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      ComponentType,
      ComponentName,
    }
  },
  computed: {
    allButtonSize() {
      return 'mini'
    }
  },
  methods: {
    formatResultObj(filterOption) {
      return filterOption.map(item => {
        return {
          key: item.key,
          value: item.value,
        }
      })
    },

    resetFilterData() {
      this.$emit('reset-filter-data')
    },

    handlerChange(item) {
      this.$emit('on-filter-change', item)
    }
  }
}
</script>

<style scoped lang="less">
.query-filter {
  width: 100%;

  .filter-item {
    display: flex;
    justify-content: flex-start;

    .filter-option-item {
      display: flex;

      &:not(:last-child) {
        margin-right: 20px;
      }

      .item-title {

      }

      .operating-components {
      }
    }
  }
}

.button-box {
  display: flex;
  justify-content: flex-end;
}
</style>