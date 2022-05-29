<template>
  <div :style="{minHeight:asideHeight+'px'}">
    <div class="myContainer">
      <div class="myContent headerBox">
        <el-page-header @back="goBack" content="毕业论文" class="header">
        </el-page-header>
      </div>
      <div v-if="isCanSubmit" class="myContent">
        <div>
          <ThesisBasicInformationComponent
              :studentId="studentId"
          ></ThesisBasicInformationComponent>
        </div>
        <div class="executeButton">
          <div>
            <h4>操作:</h4>
          </div>
          <div>
            <el-button v-show="isHaveSubmit" type="primary" size="mini" @click="toThesisFinalSubmitView">提交论文（最终版）</el-button>
            <el-button v-show="!isHaveSubmit" size="mini" disabled>已提交</el-button>
          </div>
        </div>
        <div>
          <template>
            <el-table
                :empty-text="emptyText"
                :data="tableData"
                stripe
                style="width: 100%">
              <el-table-column
                  prop="fileName"
                  label="文件名称"
                  width="180">
              </el-table-column>
              <el-table-column
                  prop="submitTime"
                  label="上传时间"
                  width="180">
              </el-table-column>
              <el-table-column
                  prop="fileType"
                  label="文件类型">
              </el-table-column>
              <el-table-column align="right">
                <template slot="header">

                </template>
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="downloadFunc(scope.row)">下载</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
      <div v-if="!isCanSubmit" class="myContent">
        <el-row type="flex" justify="center" align="middle">
          <el-col :sm="12" :lg="6">
            <el-result :icon="result.type" :title="result.title" :subTitle="result.message">
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
import ThesisBasicInformationComponent from "../component/ThesisBasicInformationComponent";
import {
  postThesisFinalByStudentId,
  postVerifyIsCanSubmit
} from "../../../../axios/studentView/processDocumentation/ThesisFInalSubmitAbout";
import {dateFormatter} from "../../../../util/dateFormatter";
import {mapState} from "vuex";
import {download, getFileName} from "../../../../axios/public/testView";

export default {
  name: "ThesisFinalView",
  data(){
    return {
      asideHeight:'',
      studentId:'',
      tableData:[],
      emptyText:'',
      isHaveSubmit:true,

      isCanSubmit:false,
      result:{
        type:'',
        Message:'',
        title:'',
      }
    }
  },
  computed:{
    ...mapState('loginAbout',['user'])
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },

    postThesisFinalByStudentId(studentId){
      let _this = this
      postThesisFinalByStudentId({studentId}).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          let data = res.data
          data.forEach(element=>{
            element.submitTime = dateFormatter(element.submitTime)
          })
          _this.isHaveSubmit = false
          _this.tableData = res.data
        }else{
          _this.emptyText = res.message
        }
      })
    },

    downloadFunc(row){
      let fileId = row.fileId
      getFileName({fileInfoId:fileId}).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          let fileName = res.data
          download({fileId}).then(fileRes=>{
            let data = fileRes.data
            let url = window.URL.createObjectURL(new Blob([data]));
            let link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click()
          },err=>{
            this.$message({
              type:'error',
              message:err
            })
          })
        }else{
          this.$message({
            type:'error',
            message:res.message
          })
        }
      })
    },

    toThesisFinalSubmitView(){
      this.$router.push({
        name:"ThesisFinalSubmitView"
      })
    },

    initialization(studentId){
      postVerifyIsCanSubmit({studentId}).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.result.title = "验证成功"
          this.result.type = "success"
          this.result.message = res.message
          this.isCanSubmit = true
        }else if (res.resultCode===204){
          this.result.title = "验证成功"
          this.result.type = "warning"
          this.result.message = res.message
        }else{
          this.result.title = "验证失败"
          this.result.type = "error"
          this.result.message = res.message
        }
      })
    }
  },
  components:{
    ThesisBasicInformationComponent
  },
  created() {
    this.studentId = this.user.userId
    this.postThesisFinalByStudentId(this.studentId)
    this.initialization(this.studentId)
  },

  mounted() {

    //获取窗口高度
    this.asideHeight = document.documentElement.clientHeight;
    window.onresize = () => {
      return (() => {
        this.asideHeight = document.documentElement.clientHeight;
      })()
    }
  },


}
</script>

<style scoped lang="less">
.myContainer{
  margin: 0 auto;
  width: 1280px;
  padding-bottom: 10px;

  .myContent {
    background-color: #ffffff;
    border-radius: 15px;
    padding: 15px 25px;

    .executeButton{
      display: flex;
    }
  }

  .myContent:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>