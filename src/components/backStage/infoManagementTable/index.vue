<template>
  <div class="info-management-table">
    <vxe-grid
        class="vxe-grid-style"
        v-bind="customTableOptions"
        :cloumns="propsCustomTableColumns"
        @filter-change="handleFilterChange"
    >
      <template #filter_radio="{column}" >
        <div class="header-container">
          <span @click="handleShowFilterContainer(column)">{{column.title}}</span>
          <svg-icon icon-class="filter"></svg-icon>
        </div>
      </template>
    </vxe-grid>

    <div v-if="'college' === currFilterColumn" class="filterBox">
      <vxe-list height="240" class="my-list" :data="currFilterOptions">
        <template #default="{ items }">
          <div
              class="my-list-item"
              v-for="(item, index) in items"
              :key="index"
          >{{ item.label }}</div>
        </template>
      </vxe-list>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@/components/svgIcon/index.vue";
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
      tableOptions: {},
      currFilterColumn: '',
      currFilterOptions: [],
      filterTop: 0,
    }
  },
  components() {
    SvgIcon
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
    handleShowFilterContainer() {
      // let {field} = colmun
      // let {filterOptions} = this.propsCustomTableColumns.find(item => item.field === field)
      // if (this.currFilterColumn === field) {
      //   this.currFilterColumn = ''
      //   this.currFilterOptions = []
      // } else {
      //   this.currFilterColumn = field
      //   this.currFilterOptions = filterOptions
      // }
    }
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

.header-container {
  display: flex;
  align-items: center;
}
</style>