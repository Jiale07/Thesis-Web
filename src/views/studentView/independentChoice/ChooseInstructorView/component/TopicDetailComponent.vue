<template>
  <div>
    <el-button size="mini" @click="showDialog(row.topicId)">详情</el-button>
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
          <el-descriptions-item label="描述:">{{ topicInfo.topicDescription}}</el-descriptions-item>
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
import {dateFormatter} from "../../../../../util/dateFormatter";

export default {
  name: "TopicDetailComponent",
  props:['row'],
  data(){
    return {
      dialogVisible:false,
      detailsShow:true,
      topicInfo:{
        topicName:'',
        description:'',
        createTime:'',
        updateTime:''
      },
      loading:true
    }
  },
  methods:{
    //题目详情查看
    showDialog(topicId){
      // console.log(topicId)
      this.postFindTopicDetail(topicId)
      this.dialogVisible = true
    },

    // 获取毕业设计题目详细信息
    postFindTopicDetail(topicId){
      postFindTopicDetail({
        topicId
      }).then(res=>{
        console.log(res)
        let result = res.data
        if (result.resultCode===200){
          let topicInfoDemo = result.data
          topicInfoDemo.topicCreateTime = dateFormatter(topicInfoDemo.topicCreateTime)
          topicInfoDemo.topicUpdateTime = dateFormatter(topicInfoDemo.topicUpdateTime)
          this.topicInfo = topicInfoDemo
          let _this = this
          setTimeout(function(){
            _this.detailsShow = false
            _this.loading = false
          },300)
        }else{
          this.$message({
            type:'error',
            message:result.message
          })
        }
      })
    },

    //毕业设计题目详情关闭前方法
    handleClose(){
      this.dialogVisible = false
      this.detailsShow = true
    },
  }
}
</script>

<style scoped>

</style>