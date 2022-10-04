<template>
  <div>
    <el-table
        :data="getTableData"
        style="width: 100%"
        :empty-text="tableDataIsEmptyMessage">
      <template  v-for="(column, index) in tableColumn">
        <el-table-column
            v-if="!['operation'].includes(column.prop)"
            :key="`table-${column.prop} - ${index}`"
            :label="column.label"
            :prop="column.prop"
            :width="column.width"
            :header-align="column.headerAlign"
            :align="column.align">
        </el-table-column>
        <el-table-column v-else-if="['operation'].includes(column.prop)" :key="`table-${column.prop} - ${index}`">
          <template slot-scope="scope">
            <div :class="column.className">
              <div
                  v-for="(buttonItem, index) in column.children"
                  :key="`table-button-${buttonItem.prop}-${index}`"
                  class="button-box">
                <el-button
                    :size="buttonItem.size"
                    :type="buttonItem.type"
                    @click="buttonItem.clickFunction(scope.row)">{{ buttonItem.label }}</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "settingTable",
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },

    tableColumn: {
      type: Array,
      default: () => [],
    }
  },
  computed: {
    getTableData() {
      return this.tableData || []
    },

    tableDataIsEmptyMessage() {
      return "暂无数据"
    },
  },
  data() {
    return {

    }
  },
  methods: {
    handleDelete(row){
      this.$emit('on-click-delete', row)
    }
  }
}
</script>

<style scoped lang="less">
.display-flex {
  display: flex;
  align-items: center;
}

.justify-end {
  justify-content: flex-end;
}

.button-box {
  margin-left: 10px;
}
</style>