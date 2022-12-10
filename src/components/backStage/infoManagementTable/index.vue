<template>
  <div class="info-management-table">
    <vxe-grid
        class="vxe-grid-style"
        v-bind="customTableOptions"
    >
    </vxe-grid>
  </div>
</template>

<script>
export default {
  name: "InfoManagementTable",
  props: {
    propsCustomTableColumns: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => {
      },
    }
  },
  data() {
    return {
      tableOptions: {},
    }
  },
  computed: {
    customTableOptions() {
      return [
        {
          border: true,
          resizable: true,
          showOverflow: true,
          align: 'left',
          height: "auto",
          columns: this.propsCustomTableColumns,
          data: this.tableData,
        }
      ]
    },
  },
  watch: {},
  methods: {},
  created() {

  }
}
</script>

<style scoped lang="less">
.info-management-table {
  display: flex;
  flex-direction: column;
  overflow: auto;

  .vxe-grid-style {
    flex: 1;
  }
}
</style>