<template>
  <div class="info-management-table-box">
    <vxe-grid
        class="vxe-grid-style"
        v-bind="customTableOptions"
    >
      <template #filter_radio="{column}">
        <filter-radio
            :prop-filter-option="getColumnOtherInfo(column).filterOptions"
            :props-title="column.title"
            :props-field="column.field"
            :props-value="getColumnOtherInfo(column).filterValue"
            @handle-filter-item-select="handleFilterChange($event, column)"
        >
        </filter-radio>
      </template>
    </vxe-grid>
  </div>

</template>

<script>
import FilterRadio from "./components/filterRadio.vue";
import {FilterComponentType} from '@/util/constant/component/infoManagementTable'

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
    return {}
  },
  components: {
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
          // height: "auto",
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
    getColumnOtherInfo(column) {
      return this.propsCustomTableColumns.find(item => item.field === column.field)
    },
    handleFilterChange(event, column) {
      let {value} = event
      let field = column.field
      let resultFilterInfoArray = this.propsCustomTableColumns.filter(item => [FilterComponentType.Radio].includes(item.filterComponentType))
      this.$emit('handle-filter-change', resultFilterInfoArray.map(item => {
        if (field === item.field) {
          return {
            key: item.field,
            value
          }
        } else {
          return {
            key: item.field,
            value: item.filterValue
          }
        }
      }), column.field)
    },
  },
  created() {

  }
}
</script>

<style scoped lang="less">
</style>
