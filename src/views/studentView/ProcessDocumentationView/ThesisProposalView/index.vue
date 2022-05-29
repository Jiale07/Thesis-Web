<template>
  <div :style="{minHeight:asideHeight+'px'}">
    <div class="myBoby">
      <div class="myContainer">
        <div class="myContent headerBox">
          <el-page-header @back="goBack" content="开题报告" class="header">
          </el-page-header>
        </div>
      </div>
      <div v-if="isJoinGDTeam.isJoin" class="myContainer">
        <div class="myContent">
          <BasicInformation
              :studentId="user.userId"
          ></BasicInformation>
          <div>
            <el-descriptions title="题目信息" :column="4"></el-descriptions>
            <el-form :model="ThesisProposalFrom" status-icon ref="ThesisProposalFrom" label-width="160px" class="demo-ruleForm">
              <el-form-item
                  label="毕业设计题目"
                  prop="thesisName"
                  :rules="{
                    required: true ,message:'内容不能为空',trigger:'blur'
                  }">
                <el-input v-if="!isAudit" v-model="ThesisProposalFrom.thesisName" placeholder="请输入内容"></el-input>
                <span v-if="isAudit">{{ThesisProposalFrom.thesisName}}</span>
              </el-form-item>
              <el-form-item
                  label="题目类型"
                  prop="thesisCategory"
                  :rules="{
                    required: true ,message:'内容不能为空',trigger:'blur'
                  }">
                <el-select v-if="!isAudit" v-model="ThesisProposalFrom.thesisCategory" placeholder="请选择">
                  <el-option
                      v-for="item in topicCategoryList"
                      :key="item.id"
                      :label="item.categoryName"
                      :value="item.id">
                  </el-option>
                </el-select>
                <span v-if="isAudit">{{filterTopicCategory(ThesisProposalFrom.thesisCategory)}}</span>
              </el-form-item>
              <el-form-item
                  v-for="(item,index,key) in ThesisProposalFrom.inputList"
                  :key="`${item.inputSettingId}`+key"
                  :label="item.titleName"
                  :prop="'inputList.'+index+'.content'"
                  :rules="rules">
                <div v-if="!isAudit">
                  <div>
                    <quill-editor
                        v-model="item.content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                    </quill-editor>
                  </div>
                  <!-- 富文本内容 -->
                  <div class="text"></div>
                </div>
                <div v-if="isAudit">
                  <div class="ql-container ql-snow" :style="{minHeight:120+'px'}">
                    <div class="ql-editor">
                      <div class="details_box"  v-html="item.content"/>
                    </div>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="上传附件">
                <el-upload
                    v-if="!isAudit"
                    class="upload-demo"
                    ref="upload"
                    :multiple="false"
                    :action="uploadUrl"
                    :headers="importHeaders"
                    :data="data"
                    :on-preview="handlePreview"
                    :before-remove="beforeRemove"
                    :on-remove="handleRemove"
                    :on-exceed="handleExceed"
                    :on-change="handleChange"
                    :on-success="handleSuccess"
                    :file-list="fileList"
                    :auto-upload="true">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <div slot="tip" class="el-upload__tip">上传文件不超过20mb</div>
                </el-upload>
                <div v-if="isAudit">
                  <div class="accessoryFileListBox">
                    <div>
                      <h4>附件：</h4>
                    </div>
                    <div v-if="fileList!==null">
                      <div v-for="(item,key) in fileList " :key="item.name+key" class="accessoryFileItemBox">
                        <div>{{ item.name }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form-item>
            </el-form>
            <div  class="submitButtonBox">
              <el-button v-if="!isAudit" type="primary" size="mini" @click="submit('ThesisProposalFrom')">提交</el-button>
              <div v-if="!isApproved">
                <span>审核结果为：审核不通过</span>
                <el-button type="warring"  @click="reedit(ThesisProposalFrom.thesisProposalId)">重新编辑</el-button>
              </div>

            </div>
          </div>
          <div v-if="isAudit">
            <div
                class="auditBox"
                v-for="(item,key) in auditInputList"
                :key="'auditInput'+key"
            >
              <el-divider></el-divider>
              <div>
                <div>
                  <h4>{{item.titleName}}</h4>
                </div>
                <div>
                  <el-form :label-position="labelPosition" label-width="80px">
                    <el-form-item label="审核结果" >
                      <span v-if="item.auditStatusId!==''">{{getAuditStatusName(item.auditStatusId)}}</span>
                      <span v-if="item.auditStatusId===''">暂无审核结果</span>
                    </el-form-item>
                    <el-form-item label="审核意见">
                      <span v-if="item.inputComment!==''"> {{item.inputComment}}</span>
                      <span v-if="item.inputComment===''">暂无审核评语</span>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
      </div>
      <div v-if="!isJoinGDTeam.isJoin" class="myContainer">
        <div class="myContent">
          <div class="resultBox">
            <div class="iconBox">
              <i class="el-icon-warning iconStyle"></i>
            </div>
            <div class="titleBox">
              <span class="title">警告提示</span>
            </div>
            <div class="messageBox">
              <span class="message">{{isJoinGDTeam.message}}</span>
            </div>
            <div class="buttonBox">
              <el-button @click="goBack">返回</el-button>
              <el-button type="primary" @click="goSelectionThesis">前往选题</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getTopicCategoryList} from "../../../../axios/public/GDTopicCategoyrAbout";
import {
  deletedThesisProposalLogic,
  getThesisProposalInputSettingList,
  postDeletedFileLogic,
  postFindFileInfoById,
  postSubmitThesisProposal,
  postThesisProposalAuditInputList,
  postThesisProposalAuditInputSettingList,
  postThesisProposalByStudentId,
  postTPInputListByTPId,
  postVerifyJoinGDTeam,
  postVerifyTheThesisProposalIsAudit
} from "../../../../axios/studentView/processDocumentation/ThesisProposal";
import {mapState} from "vuex";
import {postAuditStatusCategoryList} from "../../../../axios/public/AuditStatusCategoryAbout";
import BasicInformation from "./component/BasicInformation"

export default {
  name: "ThesisProposalView",
  data(){
    let validateIsEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("内容不能为空"))
      }else{
        callback();
      }
    };
    return {
      asideHeight:'',
      topicCategoryList:[],

      editorOption:{
        modules:{
          toolbar:[
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ]
        }
      },

      rules:{
        required: validateIsEmpty, message: '内容不能为空', trigger: ['blur', 'change'],type:'string'
      },
      ThesisProposalFrom:{
        thesisProposalId:null,
        thesisName:'',
        thesisCategory:'',
        inputList:[],
      },
      uploadUrl:'/thesisApi/public/upload',
      importHeaders:{
        token:this.token
      },
      data:{
        userId:''
      },
      fileList:[],
      fileInfoId:'null',
      //控制是否已有提交的开题报告
      isSubmit:false,
      isAudit:false,
      isJoinGDTeam:{
        isJoin:false,
        message:''
      },
      auditInputList:[],
      labelPosition: 'right',
      auditStatusOptions:[],

      //重新编辑按钮
      isApproved:true
    }
  },
  computed:{
    ...mapState('loginAbout',['user','token'])
  },
  components:{
    BasicInformation
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },

    goSelectionThesis(){
      this.$router.push({
        name:'ChooseInstructor'
      })
    },

    filterTopicCategory(topicCategoryId){
      let topicCategoryName=''
      this.topicCategoryList.forEach(e=>{
        if (e.id === topicCategoryId){
          topicCategoryName = e.categoryName
        }
      })
      return topicCategoryName
    },

    getTopicCategoryList(){
      getTopicCategoryList().then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.topicCategoryList = res.data
        }
      })
    },

    getThesisProposalInputSettingList(){
      getThesisProposalInputSettingList().then(result=>{
        let data = result.data.data
        for(let i = 0;i<data.length;i++){
          this.ThesisProposalFrom.inputList.push({
            inputSettingId:`${data[i].id}`,
            content:'',
            titleName:data[i].titleName
          })
        }
      })
    },

    // 提交
    submit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let thesisName = this.ThesisProposalFrom.thesisName
          let thesisCategory = this.ThesisProposalFrom.thesisCategory
          let inputList = this.ThesisProposalFrom.inputList
          let fileInfoId = this.fileInfoId
          let studentId = this.user.userId
          let form= {
            thesisName,
            thesisCategory,
            studentId,
            fileInfoId,
            inputList,
          }
          let json = JSON.stringify(form)
          postSubmitThesisProposal(json).then(result=>{
            let res = result.data
            if (res.resultCode===200){
              this.$message({
                type:'success',
                message:res.message
              })
              this.$router.go(0)
            }else{
              this.$message({
                type:'error',
                message:res.message
              })
            }
          })
        } else {

          return false;
        }
      });

    },

    // 富文本事件
    //失去焦点事件
    onEditorBlur(){

    },
    //获得焦点事件
    onEditorFocus(){

    },
    //内容改变事件
    onEditorChange(){

    },

    submitUpload() {
      this.$refs.upload.submit();
    },

    beforeRemove(file){
      let p = new Promise((resolve,reject)=>{
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          postDeletedFileLogic({
            fileId:file.fileId
          }).then(result=>{
            let res = result.data
            if(res.resultCode===200){
              this.$message({
                type:'success',
                message:res.message
              })
              resolve(true)
            }else{
              this.$message({
                type:'error',
                message:res.message
              })
              reject(false)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
          reject(false)
        });
      })
      return p
    },

    handleRemove() {

    },

    handlePreview() {
      // file
    },

    handleExceed(){

    },
    handleChange(file, fileList) {
      //限制上传文件数量
      if (fileList.length > 1) {
        fileList.splice(1, 1);
        this.$message.error('只能上传一个文件');
      }
      //限制上传文件大小
      let fileSize = Number(file.size/1024/1024)
      if(fileSize>5){
        fileList.forEach((element,index)=>{
          if (file.uid===element.uid){
            fileList.splice(index, 1);
            this.$message({
              type:'warning',
              message:'上传文件的大小不能大于5MB'
            })
          }
        })
      }
    },

    handleSuccess(response){
      this.fileInfoId = response.data.id
    },

    postFindFileInfoById(fileId){
      postFindFileInfoById({fileId}).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          let fileInfo = res.data
          this.fileList.push({
            'fileId':fileInfo.id,
            'name':fileInfo.fileNameOld
          })
        }
      })
    },

    initialization(studentId){
      postVerifyJoinGDTeam({studentId}).then(result=>{
        let res = result.data
        if (res.resultCode===204){
          this.isJoinGDTeam.isJoin = false
          this.isJoinGDTeam.message = res.message
        }else if(res.resultCode===200){
          this.isJoinGDTeam.isJoin = true
          this.getTopicCategoryList()
          this.getThesisProposalInputSettingList()
          let p = new Promise((resolve,reject)=>{
            postThesisProposalByStudentId({studentId}).then(result=>{
              let res = result.data
              if (res.resultCode===200){
                let tp = res.data
                this.ThesisProposalFrom.thesisProposalId = tp.id
                this.ThesisProposalFrom.thesisName = tp.thesisName
                this.ThesisProposalFrom.thesisCategory = tp.thesisCategoryId
                this.postFindFileInfoById(tp.accessoryFileId)
                //设定已有提交的开题报告
                this.isSubmit = true
                resolve(tp.id)
              }else{
                reject(res.message)
              }
            })
          })
          p.then((value => {
            this.postVerifyTheThesisProposalIsAudit(value)
            this.postThesisProposalAuditInputList(value)
            postTPInputListByTPId({TPId:value}).then(result=>{
              let res = result.data
              if (res.resultCode===200){
                let inputListContent = res.data
                this.ThesisProposalFrom.inputList.forEach(Eis=>{
                  inputListContent.forEach(Etpic=>{
                    if (Eis.inputSettingId===Etpic.tpInputSettingId){
                      Eis.id = Etpic.id
                      Eis.content = Etpic.inputContent
                    }
                  })
                })
              }
            })
          }),error=>{
            alert(error)
          })
        }
      })
    },


    postVerifyTheThesisProposalIsAudit(thesisProposalId){
      postVerifyTheThesisProposalIsAudit({thesisProposalId}).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.isAudit = true
          this.isApproved = res.data.isApproved
        }
      })
    },

    postThesisProposalAuditInputSettingList(THAIList){
      postThesisProposalAuditInputSettingList().then(result=>{
        let res = result.data
        if(res.resultCode===200){
          let data = res.data
          data.forEach(DElement=>{
            if (THAIList!==undefined){
              THAIList.forEach(ListElement=>{
                if (DElement.id===ListElement.tpaiSettingId){
                  DElement.TPAIId = ListElement.id
                  DElement.auditStatusId = ListElement.auditStatusId
                  DElement.inputComment = ListElement.inputComment
                }
              })
            }
          })
          this.auditInputList = data
        }
      })
    },

    postThesisProposalAuditInputList(thesisProposalId){
      let p = new Promise((resolve,reject)=>{
        postThesisProposalAuditInputList({thesisProposalId}).then(result=>{
          let res = result.data
          if (res.resultCode===200){
            resolve(res.data)
          }else{
            reject()
          }
        })
      })
      p.then(value=>{
        this.postThesisProposalAuditInputSettingList(value)
      },error=>{
        this.postThesisProposalAuditInputSettingList(error)
      })
    },

    getAuditStatusName(auditStatusId){
      let auditStatusName = ''
      this.auditStatusOptions.forEach(element=>{
        if (element.id ===auditStatusId){
          auditStatusName = element.auditStatusName
        }
      })
      return auditStatusName
    },

    postAuditStatusCategoryList(){
      postAuditStatusCategoryList().then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.auditStatusOptions = res.data
        }
      })
    },

    reedit(thesisProposalId){
      deletedThesisProposalLogic({thesisProposalId}).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.$router.go(0)
        }else{
          this.$message({
            type:'error',
            message:"系统错误"
          })
        }
      })
    }
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

  created() {
    let userId = this.user.userId
    this.data.userId = userId
    this.importHeaders.token = this.token
    this.initialization(userId)
    this.postAuditStatusCategoryList()
  }
}
</script>

<style scoped lang="less">
.myBoby{
  .myContainer{
    margin: 0 auto;
    width: 1280px;
    .myContent{
      background-color: #ffffff;
      border-radius: 15px;
      padding: 15px 25px;
      .resultBox{
        width: 400px;
        margin: 30px auto;
        .iconBox{
          text-align: center;
          .iconStyle{
            color: #e6a23c;
            font-size: 80px;
            margin: 30px;
          }
        }
        .titleBox{
          text-align: center;
          margin-bottom: 20px;

          .title{
            color: #5e6d82;
          }
        }
        .messageBox{
          margin-bottom: 10px;
          text-align: center;
          .message{
            color: #5e6d82;
          }
        }
        .buttonBox{
          text-align: center;
        }
      }
      .submitButtonBox{
        margin-top: 30px;
        text-align: center;
      }
    }
    .headerBox{
      margin-bottom: 10px;
    }
  }
}
</style>