<template>
  <div>
    <el-dialog
        v-loading="loading"
        title="题目详情"
        :visible.sync="dialogVisible"
        width="35%"
        :before-close="handleClose">
      <el-skeleton :rows="4" animated v-show="detailsShow"/>
      <div v-show="!detailsShow">
        <el-descriptions :column="1">
          <el-descriptions-item label="题目名称:">{{ topicInfo.topicName }}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions :column="1">
          <el-descriptions-item label="描述:">{{ topicInfo.topicDescription }}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions :column="2">
          <el-descriptions-item label="创建时间:">{{ topicInfo.topicCreateTime }}</el-descriptions-item>
          <el-descriptions-item label="更新时间:">{{ topicInfo.topicUpdateTime }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  postFindTopicDetail
} from "../../../../../axios/studentView/independentChoice/choiceInstructorView";

export default {
  name: "TopicDetailComponent",
  props: {
    topicId: {
      type: [String, Number],
    }
  },
  data() {
    return {
      dialogVisible: true,
      detailsShow: true,
      topicInfo: {
        topicName: '',
        description: '',
        createTime: '',
        updateTime: ''
      },
      loading: true
    }
  },
  methods: {
    initTopicDetail(topicId) {
      postFindTopicDetail({
        topicId
      }).then(res => {
        let result = res.data
        if (result.resultCode === 200) {
          let topicInfoDemo = result.data
          topicInfoDemo.topicCreateTime = this.$dayjs(topicInfoDemo.topicCreateTime).format("YYYY-DD-MM hh:mm:ss")
          topicInfoDemo.topicUpdateTime = this.$dayjs(topicInfoDemo.topicUpdateTime).format("YYYY-DD-MM hh:mm:ss")
          this.topicInfo = topicInfoDemo
          let _this = this
          setTimeout(function () {
            _this.detailsShow = false
            _this.loading = false
          }, 300)
        } else {
          this.$message({
            type: 'error',
            message: result.message
          })
        }
      })
    },
    handleClose() {
      this.dialogVisible = false
      this.$emit('change-dialog-visible')
      this.detailsShow = true
    },
  },
  created() {
    if (this.topicId) {
      this.initTopicDetail(this.topicId)
    } else {
      this.loading = false
      this.detailsShow = false
    }
  }
}
</script>

<style scoped>

</style>