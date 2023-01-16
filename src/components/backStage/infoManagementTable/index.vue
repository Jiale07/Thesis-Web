<template>
  <div class="info-management-table">
    <vxe-grid
        class="vxe-grid-style"
        v-bind="customTableOptions"
        :cloumns="propsCustomTableColumns"
    >
      <template #filter_radio="{column}" >
        <filter-radio
          :prop-filter-option="getColumnFilterOption(column)"
          :props-title="column.title"
          :props-field="column.field"
          @handle-filter-item-select="handleFilterItemSelect($event, column)"
        >
        </filter-radio>
      </template>
    </vxe-grid>
  </div>
</template>

<script>
// import SvgIcon from "@/components/svgIcon/index.vue";
import FilterRadio from "./components/filterRadio.vue";
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
    },
    propLoading: {
      type: Boolean,
      default: false,
    },
    propBorder: String
  },
  data() {
    return {
      filterValueArray: []
    }
  },
  components: {
    // SvgIcon,
    FilterRadio
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
          columns: this.propsCustomTableColumns,
          data: this.tableData,
          rowConfig: {
            // isCurrent: true,
            isHover: true,
          },

        }
      ]
    },
  },
  watch: {},
  methods: {
    handleFilterChange({field, values}) {
      this.$emit("handle-filter-change", {field, values})
    },
    getColumnFilterOption(column) {
      return this.propsCustomTableColumns.find(item => item.field === column.field).filterOptions
    },
    handleFilterItemSelect(event, column) {
      let {field} = column
      let {value} = event
      let filterSelectedObj = this.filterValueArray.find(item =>  item.key === field)
      if (filterSelectedObj) {
        filterSelectedObj.value = value
      } else {
        this.filterValueArray.push({
          key: field,
          value
        })
      }
      this.$emit('handle-filter-change', {
        key: field,
        value,
      })
    },
  },
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


.custom-radio-group {

}

.filterBox {
  position: absolute;
  background-color: #ffffff;
  padding: 16px;
  border-radius: 10px;
}
</style>