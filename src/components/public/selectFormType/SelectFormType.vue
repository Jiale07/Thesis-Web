<template>
  <div>
    <el-dialog

        title="选择表单类型"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
        @closed="handleClosedEvent"
    >
      <div v-loading="loading">
        <div class="form-item">
          <span>表单类型</span>
          <el-select v-model="currFormTypeId" placeholder="请选择">
            <el-option
                v-for="item in formTypeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleCallbackEvent">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {formType} from "@/axios/customForm/formType";

export default {
  name: "SelectFormType",
  props: {
    buttonText: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      formTypeList: [],
      formTypeOption: [],
      currFormTypeId: null,
    }
  },
  methods: {
    handleButtonClick() {
      this.init()
    },
    handleClose() {
      this.changeDialogVisible()
    },
    changeDialogVisible() {
      this.dialogVisible = !this.dialogVisible
    },
    handleCallbackEvent(){
      if (this.$isEmpty(this.currFormTypeId)) {
        this.$message.warning("尚未表单模板类型")
        return
      }
      const result = this.formTypeList.find(item => item.id === this.currFormTypeId)
      this.$emit('callback', result)
      this.changeDialogVisible()
    },
    handleClosedEvent() {
      this.currFormTypeId = null
      this.$emit('closed-event')
    },
    init() {
      this.loading = true
      return formType().then(res => {
        let {resultCode, data} = res.data
        if (resultCode === 200) {
          this.formTypeList = data
          this.formTypeOption = data.map(item => {
            return {
              label: item.name,
              value: item.id,
            }
          })
        }
      }).finally(() => {
        this.loading = false
      })
    },
    async create() {
      await this.init()
    }
  },
  created() {
    this.init()
  }
}
</script>

<style scoped lang="less">
.form-item {
  display: flex;
  align-items: center;

  span {
    margin-right: 10px;
  }
}
</style>
