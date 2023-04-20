<template>
  <div class="body">
    <div class="myContainer">
      <div class="myContent header">
        <el-page-header @back="goBack" content="学生选题" title="返回首页">
        </el-page-header>
      </div>
      <div class="myContent">
        <div>
          <TheTopicOfMyComponent>
          </TheTopicOfMyComponent>
          <SearchComponent
              :postTopicPage="postTopicPage"
          ></SearchComponent>
        </div>
        <el-divider></el-divider>
        <div class="resultMain">
          <el-table
              :data="tableData"
              :empty-text="emptyText"
              v-loading="loading"
              stripe
              @row-click="handleTableRowClick($event)"
              style="width: 100%">
            <el-table-column
                v-for="(item, index) in tableColumnList"
                :key="`${item.prop}-${index}`"
                v-bind="item"
            >
              <template slot-scope="scope">
                <div
                    v-if="item.isTooltip"
                >
                  <el-tooltip class="item" v-bind="item.tooltipConfig">
                    <span
                        @click="item.clickFunction(scope.row.teacherId)"
                        :style="{cursor: 'pointer'}"
                    >
                      {{ scope.row[item.prop] }}
                    </span>
                  </el-tooltip>
                </div>
                <div v-else>
                  <span>{{ scope.row[item.prop] }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div class="buttonBox" v-if="isPassed">
                  <el-button
                      v-for="(item, index) in operationList"
                      :key="`${item.key}-${index}`"
                      :size="item.buttonSize"
                      :type="item.buttonType"
                      :disabled="item.disabled"
                      v-show="handleOperationShow(scope.row, item.key)"
                      @click="item.handleClick(scope.row)"
                  >
                    <span>{{ item.label }}</span>
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageInfo.currentPage"
              :page-sizes="pageInfo.pageSizes"
              :page-size="pageInfo.pageSize"
              :page-count="pageInfo.pageCount"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageInfo.total"
              class="myPageStyle">
          </el-pagination>
        </div>
      </div>
    </div>

    <TopicDetailComponent
        v-if="detailsDialogVisible"
        :topic-id="currTopicId"
        @change-dialog-visible="changeDialogVisible"
    >
    </TopicDetailComponent>
  </div>
</template>


<script>
import SearchComponent from './component/SearchComponent'
import TopicDetailComponent from './component/TopicDetailComponent'
import TheTopicOfMyComponent from './component/TheTopicOfMyComponent'
import {
  cancelSelected,
  changeSelected, findCollegeIdByStudentId,
  findStudentSelectedByStudentId,
  findTopicPage,
  selectedTopic
} from "@/axios/studentView/independentChoice/choiceInstructorView";
import {mapState} from "vuex";
import row from "element-ui/packages/row";
export default {
  name: "ChooseInstructor",
  data() {
    return {
      topicSelectedStateInfo: '',
      // asideHeight: '',
      isPassed: true,
      emptyText: '',
      loading: true,

      tableColumnList: [
        {
          prop: 'topicName',
          label: '题目名称',
          width: '420',
        },
        {
          prop: 'optionalNumber',
          label: '可选被选数量',
        },
        {
          prop: 'selectionCount',
          label: '已经被选数量',
        },
        {
          prop: 'teacherName',
          label: '导师名称',
          clickFunction: this.toBrowseTeacherResume,
          isTooltip: true,
          tooltipConfig: {
            content: "点击查看教师简介",
            placement: 'top',
            effect: 'dark'
          }
        },
        {
          prop: 'collegeName',
          label: '教师所属学院',
        }
      ],
      operationList: [
        {
          key: 'select',
          label: '选中',
          isButton: true,
          buttonSize: 'mini',
          buttonType: 'primary',
          disabled: false,
          handleClick: this.selectedIt
        },
        {
          key: 'cancel',
          label: '取消',
          isButton: true,
          buttonSize: 'mini',
          buttonType: 'danger',
          disabled: false,
          handleClick: this.cancelSelectedFunction
        }, {
          key: 'changeSelect',
          label: '改选',
          isButton: true,
          buttonSize: 'mini',
          buttonType: 'warning',
          disabled: false,
          handleClick: this.changeSelectedFunction
        }
      ],
      detailsDialogVisible: false,
      currTopicId: '',

      pageInfo:{
        //当前页数
        currentPage: 1,
        total:0,
        //每页显示条目个数
        pageSize:10,
        pagerCount:0,
        //最大页数
        pageCount:0,
        pageSizes:[5, 10, 15, 20],
      },
      tableData: [],
      collegeId: undefined
    }
  },
  components: {
    SearchComponent,
    TopicDetailComponent,
    TheTopicOfMyComponent
  },
  computed: {
    row() {
      return row
    },
    ...mapState('loginAbout', ['user']),
  },
  methods: {
    // 返回首页
    goBack() {
      this.$router.push("/student")
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.postTopicPage()
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val
      this.postTopicPage()
    },
    postTopicPage() {
      const params = {
        currentPage: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize,
        teacherName: undefined,
        collegeId: this.collegeId,
        categoryId: undefined,
        topicName: undefined,
      }
      findTopicPage(params).then(res => {
        let result = res.data
        let {current, total, records, pages, message} = res.data.data
        if (result.resultCode === 200) {
          this.pageInfo.currentPage = current
          this.pageInfo.total = total
          this.tableData = records
          this.pageInfo.pageCount = pages
        } else {
          this.emptyText = message
          this.tableData = []
        }
        setTimeout(() => {
          this.loading = false
        }, 0)
      })
    },
    //选中毕业设计课题
    selectedIt(row) {
      selectedTopic({
        studentId: this.user.userId,
        topicId: row.topicId
      }).then(res => {
        let result = res.data
        if (result.resultCode === 200) {
          this.$message({
            type: 'success',
            message: result.message
          })
          this.$router.go(0)
        } else {
          this.$message({
            type: 'error',
            message: result.message
          })
        }
      })
    },
    // 改选毕业设计题目
    changeSelectedFunction(topicSelectedStateInfo, row) {
      changeSelected({
        studentId: this.user.userId,
        newTopicId: row.topicId,
      }).then(res => {
        let result = res.data
        if (result.resultCode === 200) {
          this.$message({
            type: 'success',
            message: result.message
          })
          this.$router.go(0)
        } else {
          this.$message({
            type: 'error',
            message: result.message
          })
        }
      })
    },
    // 取消选中已选中的毕业设计题目
    cancelSelectedFunction(row) {
      cancelSelected({
        studentId: this.user.userId,
        topicId: row.topicId
      }).then(res => {
        let result = res.data
        if (result.resultCode === 200) {
          this.$message({
            type: 'success',
            message: result.message
          })
          this.$router.go(0)
        } else {
          this.$message({
            type: 'error',
            message: result.message
          })
        }
      })
    },
    // 验证是否选题
    verificationFunction() {
      findStudentSelectedByStudentId({
        studentId: this.user.userId
      }).then(res => {
        let result = res.data
        if (result.data !== null) {
          this.topicSelectedStateInfo = result.data
          if (result.data.isPassed === 1) {
            this.isPassed = false
          }
        }
      })
    },
    handleOperationShow(row, key) {
      switch (key) {
        case 'select': {
          if (this.topicSelectedStateInfo === '') {
            return row.selectionCount < row.optionalNumber;
          } else {
            return false
          }
        }
        case 'cancel': {
          if (row.selectionCount >= row.optionalNumber) {
            return row.topicId !== this.topicSelectedStateInfo.topicId;
          } else {
            return false
          }
        }
        case 'changeSelect': {
          if (this.topicSelectedStateInfo !== '') {
            if (row.topicId === this.topicSelectedStateInfo.topicId) {
              return false
            } else {
              return row.selectionCount < row.optionalNumber;
            }
          } else {
            return false
          }
        }
        default: {
          return false
        }
      }
    },
    //获取学院列表
    postFindCollegeIdByStudentId() {
      findCollegeIdByStudentId({
        studentId: this.user.userId
      }).then(result => {
        let res = result.data
        if (res.resultCode === 200) {
          this.CollegeId = res.data
        }
      })
    },
    toBrowseTeacherResume(teacherId) {
      this.$router.push({
        name: 'BrowseTeacherResume',
        params: {
          'teacherId': teacherId
        }
      })
    },
    handleTableRowClick({topicId}) {
      this.currTopicId = topicId
      this.changeDialogVisible()
    },
    changeDialogVisible() {
      this.detailsDialogVisible = !this.detailsDialogVisible
    },
    async initialize() {
      this.postFindCollegeIdByStudentId()
      this.verificationFunction()
      await findCollegeIdByStudentId({
        studentId: this.user.userId
      }).then(result => {
        let res = result.data
        if (res.resultCode === 200) {
          this.collegeId = res.data
          this.postTopicPage()
        } else {
          this.$message.warning(res.message)
        }
      })
    }
  },
  created() {
    this.initialize()
  },
}
</script>

<style scoped lang="less">
.body {
  display: flex;
  height: 100vh;

  .myContainer {
    flex: 1;
    margin: 0 auto;
    max-width: 1280px;
  }
}

.el-page-header {

}

.myContent {
  padding: 20px 10px;
  background-color: #ffffff;
  border-radius: 15px;

}

.header {
  margin-bottom: 10px;
}

.myPageStyle {
  padding-top: 10px;
  text-align: center;
}

.resultMain {
  .buttonBox {
    display: flex;
    justify-content: space-around;
  }

  .item {
    margin-bottom: 15px;

    .topicItem {
      padding: 5px 0;
      display: flex;
      justify-content: space-between;
    }

    .topicItem:last-of-type {
      padding-bottom: 0;
    }
  }
}


.textBox {
  padding: 10px;

  .myLabel {
    margin-right: 10px;
  }
}


</style>