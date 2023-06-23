<template>
  <div class="body">
    <div class="myContainer">
      <HeaderComponent title="毕业论文"/>
      <div v-if="isHavePermission" class="myContent">
        <div>
          <ThesisBasicInformationComponent
              :studentId="studentId"
          >
          </ThesisBasicInformationComponent>
        </div>
        <el-divider></el-divider>
        <div>
          <div class="recordTitleBox">
            <div>
              <h4>提交记录</h4>
            </div>
            <div>
              <div v-if="!buttonInfo.CanSubmit">
                <span>审核结果：</span>
                <span>{{ buttonInfo.message }}</span>
              </div>
              <el-button v-if="buttonInfo.CanSubmit" type="primary" @click="toThesisSubmitView">提交论文</el-button>
            </div>
          </div>
          <el-table
              :empty-text="emptyText"
              :data="pageInfo.tableData"
              stripe
              style="width: 100%">
            <el-table-column
                v-for="(item, index) in tableColumn"
                :key="index"
                v-bind="item"
            >
            </el-table-column>
            <el-table-column
                prop="auditStatusName"
                label="审核状态">
              <template slot-scope="scope">
                <span v-if="scope.row.auditStatusName===null">尚未审核</span>
                <span v-if="scope.row.auditStatusName!==null">{{ scope.row.auditStatusName }}</span>
              </template>
            </el-table-column>
            <el-table-column
                prop="submitTime"
                label="提交时间">
            </el-table-column>
            <el-table-column align="right">
              <template slot-scope="scope">
                <el-button size="mini" @click="toThesisItemView(scope.row.thesisId)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div>
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
      </div>
      <div v-if="!isHavePermission" class="myContent">
        <el-row type="flex" justify="center" align="middle">
          <el-col :sm="12" :lg="6">
            <el-result icon="warning" title="警告提示" :subTitle="resultMessage">
              <template slot="extra">
                <el-button type="primary" size="medium" @click="goBack">返回</el-button>
              </template>
            </el-result>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import {
  postFinalAuditResults,
  postThesisSubmitTheRecordVOPage, postVerifyIsCanSubmitOfThesis
} from "@/axios/studentView/processDocumentation/ThesisAbout";
import ThesisBasicInformationComponent from '../components/ThesisBasicInformationComponent.vue'
import {mapState} from "vuex";
import HeaderComponent from '../components/header.vue'

export default {
  name: "ThesisView",
  data() {
    return {
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
        tableData: [{}],
      },
      tableColumn: [
        {
          type: 'index',
          width: '50px',
        }, {
          prop: 'fileName',
          label: '论文文件名称',
        },
      ],

      studentId: '',
      tableData: [],
      emptyText: '',


      buttonInfo: {
        CanSubmit: false,
        message: ''
      },

      isHavePermission: false,
      resultMessage: '',
    }
  },
  computed: {
    ...mapState('loginAbout', ['user'])
  },
  components: {
    HeaderComponent,
    ThesisBasicInformationComponent
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },

    handleSizeChange(val) {
      this.postThesisSubmitTheRecordVOPage(this.pageInfo.current_page, val, this.studentId)
    },
    handleCurrentChange(val) {
      this.postThesisSubmitTheRecordVOPage(val, this.pageInfo.page_size, this.studentId)
    },

    postThesisSubmitTheRecordVOPage(currentPage, pageSize, studentId) {
      postThesisSubmitTheRecordVOPage({
        currentPage,
        pageSize,
        studentId
      }).then(result => {
        let res = result.data
        if (res.resultCode === 200) {
          //当前页数
          this.pageInfo.current_page = res.data.current
          //总条数
          this.pageInfo.total = res.data.total
          //结果集
          let records = res.data.records
          records.forEach(element => {
            element.submitTime = this.$dayjs(element.submitTime).format("YYYY-MM-DD hh:mm:ss")
          })

          this.pageInfo.tableData = records
          //最大页数
          this.pageInfo.page_count = res.data.pages
        } else {
          this.emptyText = res.message
        }
      })
    },

    toThesisSubmitView() {
      this.$router.push({
        name: 'ThesisSubmitView'
      })
    },

    toThesisItemView(thesisId) {
      this.$router.push({
        name: 'ThesisDetailView',
        params: {
          propsThesisId: thesisId
        }
      })
    },

    postFinalAuditResults(studentId) {
      postFinalAuditResults({
        studentId
      }).then(result => {
        let res = result.data
        if (res.resultCode === 200) {
          this.buttonInfo.CanSubmit = this.stringToBoolean(res.data.isButtonShow)
          this.buttonInfo.message = res.data.message
        }
      })
    },

    stringToBoolean(str) {
      switch (str.toLowerCase()) {
        case "true":
        case "yes":
        case "1":
          return true;
        case "false":
        case "no":
        case "0":
        case null:
          return false;
        default:
          return Boolean(str);
      }
    },

    initialization(studentId) {
      let p = new Promise((resolve, reject) => {
        postVerifyIsCanSubmitOfThesis({studentId}).then(result => {
          let res = result.data
          if (res.resultCode === 200) {
            resolve()
          } else if (res.resultCode === 204) {
            reject(res.message)
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      })
      p.then(value => {
        this.postThesisSubmitTheRecordVOPage(this.pageInfo.current_page, this.pageInfo.page_size, this.studentId)
        this.postFinalAuditResults(this.studentId)
        setTimeout(() => {
          this.isHavePermission = true
        }, 0)
        this.resultMessage = value
      }, error => {
        this.resultMessage = error
      })
    }
  },
  created() {
    this.studentId = this.user.userId
    this.initialization(this.studentId)
  }
}
</script>

<style scoped lang="less">
.body {
  min-height: 100vh;
}

.myContainer {
  margin: 0 auto;
  width: 1280px;

  .myContent {
    background-color: #ffffff;
    border-radius: 15px;
    padding: 15px 25px;
  }

  .recordTitleBox {
    display: flex;
    justify-content: space-between;
  }

  .headerBox {
    margin-bottom: 10px;
  }
}

.myPageStyle {
  padding-top: 10px;
  text-align: center;
}
</style>
