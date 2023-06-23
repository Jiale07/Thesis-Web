<template>
  <div class="config-item">
    <div class="label-box">
      <span>{{label}}:</span>
    </div>
    <div v-if="typeVerify(ConfigComponentKey.InputNumber)">
      <el-input-number size="mini" v-model="value" @change="handleInputNumberChange" :min="0" label="描述文字"></el-input-number>
    </div>
    <div v-else-if="typeVerify(ConfigComponentKey.Radio)">
      <el-radio v-model="value" label="1">备选项</el-radio>
      <el-radio v-model="value" label="2">备选项</el-radio>
    </div>
  </div>
</template>

<script>
import { ConfigComponentKey } from "@/util/constant/customForm"
export default {
  name: "editConfig",
  props: {
    configKey: {
      type: String,
      default: ''
    },
    type: {
      type: Number,
      default: undefined,
    },
    defaultValue: {
      type: [String, Number],
      default: null,
    },
    label: {
      type: [String],
      default: '',
    }
  },
  data() {
    return {
      value: null
    }
  },
  computed: {
    ConfigComponentKey() {
      return ConfigComponentKey
    },
  },
  methods: {
    typeVerify(typeNumber) {
      return this.type === typeNumber
    },

    handleInputNumberChange(value) {
      this.$emit('value-change', {
        configKey: this.configKey,
        value,
      })
    }
  },
  created() {
    this.value = this.defaultValue
  }
}
</script>

<style scoped lang="less">

.config-item {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .label-box {

  }
}

</style>
