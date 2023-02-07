<template>
  <div class="setting-view-box">
    <div class="container">
      <el-button @click="addStudentRule">添加</el-button>
      <numbering-rule-table
          class="table-box"
          :prop-custom-table-columns="columns"
          :prop-table-config="tableConfig"
          :prop-table-data="tableData"
          @on-delete="handleDeleteRule"
          @on-cell-click="handleCellClick"
      >
      </numbering-rule-table>
    </div>
    <edit-number-role
        v-if="editRuleDialogVisible"
        :dialogTitle="dialogTitle"
        :isAutoAddEmptyItem="false"
        :numbering-rule-data="numberingRuleData"
        @on-close="handleClose"
        @refresh-data="refreshData"
    >
    </edit-number-role>
  </div>

</template>

<script>
import NumberingRuleTable from "@/views/adminView/numberingRule/component/numberingRuleTable.vue";
import EditNumberRole from "@/views/adminView/numberingRule/component/editNumberRule.vue";
import {deletedNumberingRuleById, getNumberingRulList} from "@/axios/adminView/numberingRuleSetting";
import {NumberingType} from "@/util/numberingRule";
import $dayjs from "dayjs";

export default {
  name: 'studentIDRule',
  data() {
    return {

      tableConfig: [],
      tableData: [],

      editRuleDialogVisible: false,
      dialogTitle: '',
      numberingRuleData: {},
      commitType: null,
    }
  },
  computed: {
    columns() {
      return [
        {
          field: 'serialNumber',
          title: '序号',
          width: '50px',
          align: 'center',
          slots: {
            default: 'order_number'
          }
        },
        {
          field: 'name',
          title: '名称'
        },
        {
          field: 'createTime',
          title: '创建时间',
          formatter: this.formatDate
        },
        {
          field: 'updateTime',
          title: '更新时间',
          formatter: this.formatDate
        }
      ]
    }
  },
  components: {
    NumberingRuleTable,
    EditNumberRole,
  },
  methods: {
    addStudentRule() {
      this.dialogTitle = '添加编号规则'
      this.editRuleDialogVisible = true
      this.numberingRuleData = {}
      this.commitType = 'create'
    },
    handleClose() {
      this.editRuleDialogVisible = false
    },
    initData() {
      getNumberingRulList({
        numberingRuleType: NumberingType.StudentID
      }).then(result => {
        const res = result.data
        if (res.resultCode === 200) {
          this.tableData = res.data
        }
      })
    },
    formatDate({cellValue}) {
      return $dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss")
    },
    handleDeleteRule(row) {
      deletedNumberingRuleById({
        id:row.id
      }).then(result => {
        const res = result.data
        if (res.resultCode === 200) {
          this.$message.success(res.message)
          this.refreshData()
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    refreshData() {
      this.initData()
    },
    handleCellClick({row, column}) {
      if (column.field !== 'serialNumber') {
        this.dialogTitle = '更改编号规则'
        this.numberingRuleData = row
        this.editRuleDialogVisible = true
        this.commitType = 'update'
      }
    },
  },
  created() {
    this.initData()
  }
}
</script>

<style scoped lang="less">
.setting-view-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;

  .container {
    display: flex;
    flex-direction: column;
    overflow: auto;
    flex: 1;
    padding: 10px;
    border-radius: 10px;
    background-color: #ffffff;

    .table-box {
      flex: 1;
      overflow: hidden;
    }
  }
  .container:nth-child(n):not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
