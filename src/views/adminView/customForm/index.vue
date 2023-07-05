<template>
  <div class="custom-form-body">
    <div class="container">
      <div class="button-box">
        <el-button
            v-for="(item, index) in buttonList"
            :key="index"
            type="primary"
            @click="handleRouterPush(item.routerPathName)"
        >{{ item.label }}
        </el-button>
      </div>
      <vxe-grid
          v-bind="vxeTableConfig"
          @cell-click="handleCellClick"
      >
      </vxe-grid>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.current_page"
          :page-sizes="pageInfo.page_sizes"
          :page-size="pageInfo.page_size"
          :page-count="pageInfo.page_count"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          class="myPageStyle">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {getFormList} from "@/axios/customForm";

export default {
  name: "customForm",
  data() {
    return {
      vxeTableConfig: {
        data: [
          {
            name: '开题报告'
          }
        ],
        columns: [
          {
            field: 'name',
            title: '名称'
          }
        ]
      },
      buttonList: [
        {
          label: '添加',
          routerPathName: 'CreateCustomForm',
        },
        {
          label: '表单类型管理',
          routerPathName: 'CustomFormTypeManage',
        }
      ],
      pageInfo: {
        //当前页数
        current_page: 1,
        total: 50,
        //每页显示条目个数
        page_size: 10,
        pager_Count: 8,
        //最大页数
        page_count: 0,
        page_sizes: [5, 10, 15, 20],
        tableData: [{}],
      },

    }
  },
  methods: {
    handleSizeChange(value) {
      this.pageInfo.page_size = value
      this.getFormList()
    },
    handleCurrentChange(value) {
      this.pageInfo.current_page = value
      this.getFormList()
    },
    handleRouterPush(routerPathName) {
      if (routerPathName === 'CreateCustomForm') {
        this.$selectFormType((data) => {
          this.$router.push({
            name: routerPathName,
            params: {
              formType: data
            }
          })
        }, {dialogVisible: true})
      } else {
        this.$router.push({
          name: routerPathName
        })
      }
    },
    getFormList() {
      let params = {
        currentPage: this.pageInfo.current_page,
        pageSize: this.pageInfo.page_size
      }
      getFormList(params).then(res => {
        const {resultCode, data} = res.data
        if (resultCode === 200) {
          //当前页数
          this.pageInfo.currentPage = data.current
          //总条数
          this.pageInfo.total = data.total
          //结果集
          this.vxeTableConfig.data = data.records
          //最大页数
          this.pageInfo.pageCount = data.pages
        }
      })
    },
    handleCellClick({row}) {
      this.$router.push({
        name: 'CreateCustomForm',
        query: {
          formId: row.id
        }
      })
    },
    init() {
      this.getFormList()
    }
  },
  created() {
    this.init()
  }
}
</script>

<style scoped lang="less">
.custom-form-body {

  .button-box {
    margin-bottom: 10px;
  }

  .container {
    background-color: #ffffff;
    border-radius: 20px;
    padding: 10px;

  }
}
</style>
