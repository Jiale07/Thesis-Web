<template>
  <div>
    <div class="container">
      <div class="header-box">
        <div @click="handleCallBack">
          <i class="el-icon-back"></i>
          <span>返回</span>
        </div>
        <div>
          <el-button type="primary" @click="handleButtonEvent">添加</el-button>
        </div>
      </div>
    </div>
    <div class="container">
      <vxe-grid
          v-loading="tableLoading"
          v-bind="vxeTableConfig"
          @cell-click="handleCellClick"
      >
        <template #operate="{row}">
          <el-button size="small" type="danger" icon="el-icon-delete" circle @click="handleDeleteFromType(row)"></el-button>
        </template>
      </vxe-grid>
    </div>

    <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
        @closed="handleDialogClosed"
    >
      <div>
        <div
          v-for="(item, index) in dialogFormList"
          :key="index"
          class="form-item"
        >
          <span>{{item.label}}:</span>
          <el-input
              v-if="item.component === 'input'"
              v-model="item.value"
          ></el-input>
          <el-input-number
              v-else-if="item.component === 'inputNumber'"
              v-model="item.value"
              v-bind="item.config"
          ></el-input-number>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {addFormType, deleteFormType, formType, updateFormType} from "@/axios/customForm/formType";
import {debounce} from "@/util/tool";

const DialogStateMap = {
  Create: 1,
  Edit: 2
}

export default {
  name: "customFormTypeManagement",
  data() {
    return {
      DialogStateMap,
      dialogState: DialogStateMap.Create,
      dialogVisible: false,
      dialogFormList: [
        {
          key: 'name',
          label: '类型名称',
          value: null,
          component: 'input'
        },
        {
          key: 'upperLimit',
          label: '可创建上限',
          value: 1,
          component: 'inputNumber',
          config: {
            min: 1
          }
        }
      ],
      tableLoading: false,
      currEditFormTypeId: null,
      currEditFromTypeObj: {},
      vxeTableConfig: {
        data: [],
        showOverflow: true,
        columns: [
          {
            field: 'name',
            title: '名称',
            width: '160px'
          },
          {
            field: 'upperLimit',
            title: '可创建表单模板上限',
          },
          {
            title: '操作',
            width: '100px',
            slots: {
              default: 'operate'
            }
          }
        ]
      },
    }
  },
  computed: {
    dialogTitle() {
      return this.dialogState === DialogStateMap.Create ? '添加表单类型' : '更改表单类型信息';
    }
  },
  methods: {
    handleCallBack() {
      this.$router.back()
    },
    handleButtonEvent() {
      this.dialogState = DialogStateMap.Create
      this.changeDialogVisible()
    },
    handleClose() {
      this.changeDialogVisible()
    },
    handleDialogClosed() {
      this.dialogFormList = this.dialogFormList.map(item => {return {...item, value: null}})
    },
    changeDialogVisible() {
      this.dialogVisible = !this.dialogVisible
    },
    handleSubmit: debounce(function (){
      const submitFunc = this.getSubmitFunc()
      if (!submitFunc || !this.dialogFormVerify()) {
        return
      }

      const objList = this.dialogFormList.map(item => {
        return {
          [item.key]: item.value
        }
      })
      let params = Object.assign({}, ...objList)
      let message = '添加成功'
      if (this.dialogState === DialogStateMap.Edit) {
        message = '更新成功'
        Object.assign(params, {id: this.currEditFromTypeObj.id})
      }
      submitFunc(params).then(res => {
        let {resultCode} = res.data
        if (resultCode === 200) {
          this.$message.success(message)
          this.init() // 重新加载
          this.changeDialogVisible()
        } else {
          this.$message.error('服务错误')
        }
      })
    }, 300),
    dialogFormVerify() {
      for(let i = 0; i < this.dialogFormList.length; i++) {
        if (this.$isEmpty(this.dialogFormList[i].value)) {
          this.$message.warning(`${this.dialogFormList[i].label}不能为空`)
          return false
        }
      }
      if (this.dialogState === DialogStateMap.Edit) {
        const hasChange =  this.dialogFormList.some(item => this.currEditFromTypeObj[item.key] !== item.value)
        if (!hasChange) {
          this.$message.warning(`表单信息没有改变`)
          return false
        }
      }
      return true
    },
    getSubmitFunc() {
      switch (this.dialogState) {
        case DialogStateMap.Create: {
          return addFormType
        }
        case DialogStateMap.Edit: {
          return updateFormType
        }
        default: {
          return false
        }
      }
    },
    handleDeleteFromType({id}) {
      this.$confirm('确认删除？')
        .then(() => {
          deleteFormType({id}).then(res => {
            let {resultCode} = res.data
            if (resultCode === 200) {
              this.$message.success("已删除")
              this.init()
            } else {
              this.$message.error('删除失败')
            }
          })
        })
        .catch(() => {
          this.$message.info('已经取消删除')
        });
    },
    handleCellClick({row}) {
      this.dialogState = DialogStateMap.Edit
      this.currEditFromTypeObj = row
      this.dialogFormList = this.dialogFormList.map(item => {
        return {
          ...item,
          value: row[item.key]
        }
      })
      this.changeDialogVisible()
    },
    getFormTypeList() {
      this.tableLoading = true
      formType().then(res => {
        let {data, resultCode} = res.data
        if (resultCode === 200) {
          this.vxeTableConfig.data = data
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    init() {
      this.getFormTypeList()
    }
  },
  created() {
    this.init()
  }
}
</script>

<style scoped lang="less">
.container {
  padding: 10px;
  background-color: #ffffff;
  border-radius: 15px;

}

.container:not(:last-child) {
  margin-bottom: 10px;
}

.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-item {
  display: flex;
  align-items: center;

  span {
    margin-right: 10px;
    white-space: nowrap;
  }
}

.form-item:not(:last-child) {
  margin-bottom: 10px;
}
</style>
