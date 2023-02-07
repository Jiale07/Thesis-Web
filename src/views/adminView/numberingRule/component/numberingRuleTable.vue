<template>
  <div class="table-box">
    <vxe-grid
        class="vxe-grid-style"
        v-bind="customTableOptions"
        @cell-mouseenter="handleMouseenter"
        @cell-mouseleave="handleMouseleave"
        @cell-click="handleCellClick"
    >
      <template #order_number="{row, rowIndex}">
        <svg-icon
            v-if="currHoverRowId === row.id"
            @click="handleDelete(row)"
            icon-class="delete"
        ></svg-icon>
        <span v-else>{{rowIndex + 1}}</span>
      </template>
    </vxe-grid>
  </div>
</template>

<script>
export default {
  name: "numberingRuleTable",
  props: {
    propCustomTableColumns: {
      type: Array,
      default: () => []
    },
    propTableConfig: {
      type: Array,
      default: () => {}
    },
    propTableData: {
      type: Array,
      default: () => {},
    }
  },
  data() {
    return {
      currHoverRowId: null,
    }
  },
  computed: {
    customTableOptions() {
      return [
        {
          showHeader: true,
          showHeaderOverflow: true,
          border: this.propBorder,
          loading: this.propLoading,
          resizable: true,
          showOverflow: true,
          align: 'left',
          height: "auto",
          columns: this.propCustomTableColumns,
          data: this.propTableData,
          rowConfig: {
            isHover: true,
          },
          tooltipConfig: {

          }
        }
      ]
    }
  },
  methods: {
    handleMouseenter({row}) {
      this.currHoverRowId = row.id
    },
    handleMouseleave() {
      this.currHoverRowId = null
    },
    handleDelete(row) {
      this.$emit('on-delete',row)
    },
    handleCellClick({row, column}) {
      this.$emit('on-cell-click', {row, column})
    }
  }
}
</script>

<style scoped lang="less">
.table-box {
  display: flex;
  flex-direction: column;
  overflow: auto;

  .vxe-grid-style {
    flex: 1;
  }
}

.SVGCustomStyleClass {
  cursor:pointer;
}
</style>
