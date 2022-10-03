<template>
  <div>
    <el-dialog :title="dialogTitle" width="720px" :visible.sync="dialogVisible" :before-close="handleClose">
      <div
          v-for="(formItem, index) in getFormItems"
          :key="`dialog-form-${formItem.prop}-${index}`"
          class="edit-box">
        <div class="edit-label">
          <span>{{ formItem.label }}</span>
        </div>
        <div v-if="formItem.type === 'Number'">
          <el-input-number v-model="editForm[formItem.prop]" :min="1" :max="99" label="描述文字"></el-input-number>
        </div>
        <div v-else-if="formItem.type === 'String'" class="edit-text">
          <el-input v-model="editForm[formItem.prop]" autocomplete="off"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {cloneDeep} from "lodash";
export default {
  name: "settingCreateDialog",
  props: {
    title: String,
    sourceForm: {
      type: Object,
      defaults: ()=> {},
    },

    dialogFormItems: Array,
  },
  data() {
    return {
      dialogVisible: true,
      formLabelWidth: "120px",

      editForm: {
        serialNumber: 0,
        titleName: ''
      },

      emptyEditForm: {
        serialNumber: 0,
        titleName: ''
      },
    }
  },
  computed: {
    dialogTitle() {
      return this.$isEmpty(this.title) ? this.title : ''
    },
    getFormItems() {
      return this.dialogFormItems
    }
  },
  methods: {
    handleClose() {
      this.$emit('on-click-close')
    },

    submit() {
      this.$emit('on-submit', this.editForm)
    },

    initDialogForm() {
      if (!this.$isEmpty(this.sourceForm)) {
        this.editForm = cloneDeep(this.sourceForm)
      } else {
        this.editForm = this.emptyEditForm
      }
    }
  },
  created() {
    this.initDialogForm()
  }
}
</script>

<style scoped lang="less">
.edit-box {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .edit-label {
    width: 120px;
  }

  .edit-text {
    flex: 1;
  }
}

.edit-box:not(:last-child){
  margin-bottom: 10px;
}

</style>