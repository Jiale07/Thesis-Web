<template>
  <div class="student-info-management-box container">
    <info-management-header
        title="学生信息管理页面"
        :buttonList="headerButtonList"
        @on-click="handleHeaderClick"
        @on-refresh="refreshToStudentInfoList"
    ></info-management-header>
    <div class="content-box">
      <info-management-table
          :propLoading="loading"
          :prop-border="'inner'"
          :props-custom-table-columns="customTableColumns"
          :table-data="pageInfo.tableData"
          @handle-filter-change="handleFilterChange"
      >
      </info-management-table>
    </div>
    <div class="footer-box">
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
// import BaseAddStudent from './component/BaseAddStudent'
// TODO 学生信息更新后续会重新再写一个版本
// import BaseUpdateStudent from './component/BaseUpdateStudent'
import InfoManagementHeader from "@/components/admin/infoManagementHeader/index.vue";
import {
  deletedStudent,
  getStudentInfo,
  // getDefaultRoleList,
} from "@/axios/adminView/infoManagement/StudentInfo";
import {getCollegeList, getMajorList} from "@/axios/adminView/public";
import {mapState} from "vuex";
import {getRoleList} from "@/axios/public/RoleAbout";
import InfoManagementTable from "../../../../components/backStage/infoManagementTable/index.vue";
import {cloneDeep} from "lodash";
import $dayjs from "dayjs";
import {FilterComponentType} from '@/util/constant/component/infoManagementTable'
import {uuis} from '@/util/uuis'


const filterFieldMap = {
  'college': 'collegeId',
  'major': 'majorId',
  'class': 'classId',
}
export default {
  name: "studentInfo",
  data() {
    return {
      tableKey: uuis(),
      passwordShow: false,
      emptyText: '',
      collegeOptions: [],
      majorOptions: [],
      collegeId: 0,
      filterData: [],
      pageInfo: {
        //当前页数
        current_page: 1,
        total: 100,
        //每页显示条目个数
        page_size: 10,
        pager_Count: 8,
        //最大页数
        page_count: 0,
        page_sizes: [5, 10, 15, 20],
        tableData: [],
      },
      queryFilterOptionArray: [
        {
          key: 'college',
          title: '学院',
          componentName: 'el-select',
          value: '',
          options: [],
          isHide: false,
        },
        {
          key: 'major',
          title: '专业',
          componentName: 'el-select',
          value: '',
          options: [],
          isHide: false,
        }
      ],
      loading: false,
      customTableColumns: [],
    }
  },
  computed: {
    ...mapState('studentInfo', ['search', 'publicOption']),
    // TODO 由于与自定表达有关，暂时不开发该头部
    headerButtonList() {
      return [
        {
          key: 'add',
          name: '添加',
          type: 'primary',
          isHead: true,
        },
      ].filter(item => !item.isHead)
    }
  },
  components: {
    InfoManagementHeader,
    InfoManagementTable,
    // BaseAddStudent,
    // BaseUpdateStudent,
  },
  watch: {
    majorOptions() {
      this.filterData.find(item => item.key === 'major').options = this.majorOptions
    }
  },
  methods: {
    handleDelete(index, row) {
      this.deletedStudent(row.id)
    },
    getStudentInfoList(params) {
      this.loading = true
      return getStudentInfo(params).then(res => {
        let result = res.data
        if (result.resultCode === 200) {
          if (result.data.records.length === 0) {
            this.getStudentInfoList(result.data.current - 1, this.pageInfo.page_size)
          }
          //当前页数
          this.pageInfo.current_page = result.data.current
          //总条数
          this.pageInfo.total = result.data.total
          //结果集
          this.pageInfo.tableData = result.data.records
          //最大页数
          this.pageInfo.page_count = result.data.pages
        } else {
          this.pageInfo.tableData = []
          this.emptyText = result.message
        }
        this.loading = false
      })
    },
    // 页面可见行数改变
    handleSizeChange(val) {
      let parmas = {
        currentPage: this.pageInfo.current_page,
        pageSize: val,
      }
      this.pageInfo.page_size = val
      this.getStudentInfoList(parmas)
    },
    //当前页切换
    handleCurrentChange(val) {
      this.pageInfo.current_page = val
      let params = {
        currentPage: val,
        pageSize: this.pageInfo.page_size
      }
      this.getStudentInfoList(params)
    },
    // 获取学院信息列表
    getCollegeInfo() {
      return getCollegeList().then(res => {
        if (res.data.resultCode === 200) {
          this.collegeOptions = this.formatQueryFilterOption('college', res.data.data)
        } else {
          this.$message({
            type: 'error',
            message: '没有找到更多信息'
          })
        }
      })
    },
    formatQueryFilterOption(key, data) {
      if (key === 'college') {
        let resultArray = []
        resultArray.push({
          key: 'all',
          label: '全部',
          value: 'all',
          disable: false,
        })
        return resultArray.concat(data.map(item => {
          return {
            key: item.id,
            label: item.collegeName,
            value: item.id,
            disable: false,
          }
        }))
      } else if (key === 'major') {
        let resultArray = []
        resultArray.push({
          key: 'all',
          label: '全部',
          value: 'all',
          disable: false,
        })
        return resultArray.concat(data.map(item => {
          return {
            key: item.id,
            label: item.majorName,
            value: item.id,
            disable: false,
          }
        }))
      }
    },
    // 获取专业信息列表
    getMajorInfo(collegeId) {
      return getMajorList({
        collegeId
      }).then(res => {
        if (res.data.resultCode === 200) {
          this.majorOptions = this.formatQueryFilterOption('major', res.data.data)
        } else {
          this.$message({
            type: 'error',
            message: '没有找到更多信息'
          })
        }
      })
    },
    deletedStudent(studentId) {
      deletedStudent({
        studentId
      }).then(res => {
        let result = res.data
        if (result.resultCode === 200) {
          this.$message({
            type: 'success',
            message: result.message
          })
          this.refreshToStudentInfoList()
        } else {
          this.$message({
            type: 'error',
            message: result.message
          })
        }
      })
    },
    getRoleList() {
      return getRoleList().then(result => {
        let res = result.data
        if (res.resultCode === 200) {
          let data = res.data
          let studentOption = []
          data.forEach(element => {
            if (element.id.toString() === "3001")
              studentOption.push(element)
          })
          this.$store.commit("studentInfo/updateRoleOptions", studentOption)
        }
      })
    },
    handlerSaveOptionsValue(valueArray) {
      let filterConditionsObj = {}
      valueArray.forEach(item => {
        filterConditionsObj[filterFieldMap[item.key]] = item.value
      })
      this.refreshToStudentInfoList(filterConditionsObj)
      let collegeId = valueArray.find(item => item.key === 'college').value
      if (!this.$isEmpty(collegeId)) {
        this.getMajorInfo(collegeId)
      }
    },
    initData() {
      this.customTableColumns = [
        {
          type: 'seq',
          title: ' ',
          width: '50px',
        },
        {
          field: 'id',
          title: '学号'
        },
        {
          field: 'studentName',
          title: '姓名'
        },
        {
          field: 'college',
          title: '学院',
          filterValue: 'all',
          formatter: this.formatCollege,
          filterOptions: this.collegeOptions,
          filterComponentType: FilterComponentType.Radio,
          slots: {
            header: 'filter_radio',
          },
        },
        {
          field: 'major',
          title: '专业',
          filterValue: 'all',
          formatter: this.formatMajor,
          filterOptions: this.majorOptions,
          filterComponentType: FilterComponentType.Radio,
          slots: {
            header: 'filter_radio'
          }
        },
        {
          field: 'class',
          title: '班级',
          formatter: this.formatClass,
        },
        {
          field: 'createTime',
          title: '创建时间',
          formatter: this.formatDate,
        },
        {
          field: 'updateTime',
          title: '更新时间',
          formatter: this.formatDate
        },
      ]
      const params = {
        currentPage: this.pageInfo.current_page,
        pageSize: this.pageInfo.page_size,
      }
      return this.getStudentInfoList(params)
    },
    initFilterData() {
      let optionList = this.queryFilterOptionArray
      optionList.find(item => item.key === 'college').options = this.collegeOptions
      optionList.find(item => item.key === 'major').options = this.majorOptions
      this.filterData = cloneDeep(this.queryFilterOptionArray)
    },
    initCustomTableColumns() {
      this.customTableColumns = [
        {
          type: 'seq',
          title: ' ',
          width: '50px',
        },
        {
          field: 'id',
          title: '学号'
        },
        {
          field: 'studentName',
          title: '姓名'
        },
        {
          field: 'college',
          title: '学院',
          filterValue: 'all',
          formatter: this.formatCollege,
          filterOptions: this.collegeOptions,
          filterComponentType: FilterComponentType.Radio,
          slots: {
            header: 'filter_radio',
          },
        },
        {
          field: 'major',
          title: '专业',
          filterValue: 'all',
          formatter: this.formatMajor,
          filterOptions: this.majorOptions,
          filterComponentType: FilterComponentType.Radio,
          slots: {
            header: 'filter_radio'
          }
        },
        {
          field: 'class',
          title: '班级',
          formatter: this.formatClass,
        },
        {
          field: 'createTime',
          title: '创建时间',
          formatter: this.formatDate,
        },
        {
          field: 'updateTime',
          title: '更新时间',
          formatter: this.formatDate
        },
      ]
    },
    refreshToStudentInfoList(filterConditionsObj) {
      const params = {
        currentPage: this.pageInfo.current_page,
        pageSize: this.pageInfo.page_size,
        ...filterConditionsObj,
      }
      this.getStudentInfoList(params)
    },
    formatCollege({row}) {
      return row.collegeName
    },
    formatMajor({row}) {
      return row.majorName
    },
    formatClass({row}) {
      return row.classId
    },
    formatDate({cellValue}) {
      return $dayjs(cellValue).format("YYYY-MM-DD HH:mm:ss")
    },
    // getInformation() {
    //   getDefaultRoleList({}).then(res => {
    //
    //   })
    // },
    async handleFilterChange(filterChangeArray, currChangeFilterField) {
      let filterParams = {}
      let columnInfo = this.customTableColumns.find(item => item.field === currChangeFilterField)
      let filterChangeObj = filterChangeArray.find(item => item.key === currChangeFilterField)
      switch (currChangeFilterField) {
        case 'college': {
          let majorColumnInfo = this.customTableColumns.find(item => item.field === 'major')
          if (filterChangeObj.value === 'all') {
            majorColumnInfo.filterOptions = []
            columnInfo.filterValue = 'all'
          } else {
            if (filterChangeObj.value !== 'all') {
              await this.getMajorInfo(filterChangeObj.value)
              majorColumnInfo.filterOptions = this.majorOptions
            } else {
              majorColumnInfo.filterOptions = []
            }
          }
          majorColumnInfo.filterValue = 'all'
          columnInfo.filterValue = filterChangeObj.value
          if (filterChangeObj.value !== 'all') {
            filterParams.collegeId = filterChangeObj.value
          }
          break
        }
        case 'major': {
          columnInfo.filterValue = filterChangeObj.value
          if (filterChangeObj.value !== 'all') {
            filterParams.majorId = filterChangeObj.value
          }
          break
        }
      }
      // 其他筛选项
      let tipFilterItemArray = filterChangeArray.map(item => item.key)
      let otherColumnInfoArray = this.customTableColumns.filter(item => tipFilterItemArray.includes(item.field) && item.field !== currChangeFilterField)
      otherColumnInfoArray.forEach(item => {
        if (item.filterValue !== 'all') {
          if (item.field === 'college') {
            filterParams['collegeId'] = item.filterValue
          } else if (item.field === 'major') {
            filterParams['majorId'] = item.filterValue
          } else {
            filterParams[item.field] = item.filterValue
          }
        }
      })
      this.$nextTick(() => {
        this.refreshToStudentInfoList(filterParams)
        this.tableKey = uuis()
      })
    },
    handleHeaderClick(key) {
      switch (key) {
        case 'add': {
          // 显示添加窗口
          break;
        }
      }
    },
  },
  async created() {
    await this.getCollegeInfo()
    await this.getRoleList()
    await this.initFilterData()
    await this.initData()
    this.initCustomTableColumns()
  },
}
</script>

<style scoped lang="less">
.container {
  border-radius: 10px;
  background-color: #ffffff;
}

.student-info-management-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;

  .header-box {
    padding: 10px 10px 0;
    flex-shrink: 0;
  }

  .content-box {
    padding: 0 10px;
    flex: 1;
  }

  .footer-box {
    padding: 0 10px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
