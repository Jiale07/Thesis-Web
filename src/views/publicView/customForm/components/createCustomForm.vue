<template>
  <div>
    <div
        v-for="(cItem) in componentList"
        :key="cItem.id"
        class="component-item">
      <div class="label">{{ cItem.label }}</div>
      <div>
        <el-input
            v-if="cItem.key === ComponentKey.TextInput"
            v-bind="cItem.config"
            v-model="cItem.value"
            show-word-limit
        ></el-input>
        <el-input-number
            v-else-if="cItem.key === ComponentKey.NumberInput"
            v-model="cItem.value"
            v-bind="cItem.config"
        ></el-input-number>
        <el-date-picker
            v-else-if="cItem.key === ComponentKey.DateSelect"
            v-model="cItem.value"
            v-bind="cItem.config"
            type="date"
            placeholder="选择日期">
        </el-date-picker>
      </div>
    </div>
  </div>
</template>

<script>

import {ComponentKey} from "@/util/constant/customForm";

export default {
  name: 'createCustomForm',
  props: {
    componentList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ComponentKey() {
      return ComponentKey
    },
  },
  data() {
    return {}
  },
}
</script>

<style scoped lang="less">
@import "/src/assets/styles/css/public";

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
