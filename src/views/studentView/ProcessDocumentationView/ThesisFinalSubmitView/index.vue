<template>
  <div :style="{minHeight:asideHeight+'px'}">
    <div class="myContainer">
      <HeaderComponent title="毕业论文"/>
      <div v-loading="loading" class="myContent">
        <div v-if="isHaveSubmitted">
          <div>
            <ThesisBasicInformationComponent
                :studentId="studentId"
            >
            </ThesisBasicInformationComponent>
          </div>
          <el-divider></el-divider>
          <div>
            <el-form
                :label-position="labelPosition"
                label-width="80px"
                ref="ThesisFinalForm"
                :model="ThesisFinalForm">
              <el-form-item
                  v-for="(item,index,key) in ThesisFinalForm.ThesisInputSetting"
                  :key="item.id+key"
                  :label="item.titleName"
                  :prop="'ThesisInputSetting.'+index+'.inputContent'"
                  :rules="rules">
                <div >
                  <quill-editor
                      v-model="item.inputContent"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                      @change="onEditorChange($event)">
                  </quill-editor>
                </div>
                <!-- 富文本内容 -->
                <div class="text"></div>
              </el-form-item>
              <el-form-item label="上传附件">
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    :multiple="false"
                    :action="uploadUrl"
                    :headers="importHeaders"
                    :data="userInfo"
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
              </el-form-item>
            </el-form>
            <div class="buttonGroup">
              <el-button type="primary" @click="submit('ThesisFinalForm')">提交</el-button>
            </div>
          </div>
        </div>
        <div v-if="!isHaveSubmitted">
          <el-row  type="flex" justify="center" align="middle">
            <el-col :sm="12" :lg="6">
              <el-result icon="info" title="信息提示" :subTitle="isHaveSubmittedMessage">
                <template slot="extra">
                  <el-button type="primary" size="medium" @click="goBack">返回</el-button>
                </template>
              </el-result>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import ThesisBasicInformationComponent from "../components/ThesisBasicInformationComponent.vue";
import {getThesisInputSettingList} from "@/axios/studentView/processDocumentation/ThesisSubmitAbout";
import {postDeletedFileLogic} from "@/axios/studentView/processDocumentation/ThesisProposal";
import {
  postThesisFinalSubmit,
  postVerifyHaveSubmitted
} from "@/axios/studentView/processDocumentation/ThesisFInalSubmitAbout";
import {mapState} from "vuex";
import HeaderComponent from "@/views/studentView/ProcessDocumentationView/components/header.vue";

export default {
  name: "ThesisFinalSubmitView",
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
      studentId:'',
      labelPosition: 'right',
      ThesisFinalForm:{
        ThesisInputSetting:[],
      },
      rules:{
        required: validateIsEmpty, message: '内容不能为空', trigger: ['blur', 'change'],type:'string'
      },
      editorOption:{
        modules:{
          toolbar:[
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ]
        }
      },
      uploadUrl:'/thesisApi/public/upload',
      importHeaders:{
        token:''
      },
      userInfo:{
        userId:''
      },
      fileList:[],
      fileInfoId:'',


      isHaveSubmitted:false,
      isHaveSubmittedMessage:"",
      loading:true,
    }
  },
  computed:{
    ...mapState('loginAbout',['user','token'])
  },
  components:{
    HeaderComponent,
    ThesisBasicInformationComponent
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },

    checkEmpty(rule, value, callback){
      if (!value) {
        callback(new Error('编写内容不能为空'));
      }else{
        callback();
      }
    },

    getThesisInputSettingList(thesisInputList){
      getThesisInputSettingList().then(result=>{
        let res = result.data
        if (res.resultCode===200){
          let data = res.data
          data.forEach(DElement=>{
            DElement.inputContent=''
            if (thesisInputList !== null && thesisInputList !== '' && thesisInputList !== undefined){
              thesisInputList.forEach(listElement=>{
                if (DElement.id===listElement.gdthesisInputSettingId){
                  DElement.inputContent = listElement.inputContent
                }
              })
            }
          })
          this.ThesisFinalForm.ThesisInputSetting = data
        }
      })
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

    beforeRemove(file){
      return new Promise((resolve, reject) => {
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(file)
          postDeletedFileLogic({
            fileId: file.response.data.id
          }).then(result => {
            let res = result.data
            if (res.resultCode === 200) {
              this.$message({
                type: 'success',
                message: res.message
              })
              resolve(true)
            } else {
              this.$message({
                type: 'error',
                message: res.message
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
    },
    handleRemove() {

    },
    handlePreview(file) {
      console.log(file);
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
      if(fileSize>50){
        fileList.forEach((element,index)=>{
          if (file.uid===element.uid){
            fileList.splice(index, 1);
            this.$message({
              type:'warning',
              message:'上传文件的大小不能大于50MB'
            })
          }
        })
      }
    },
    handleSuccess(response){
      this.fileInfoId = response.data.id
    },

    submit(formName){
      this.$refs[formName].validate((valid)=>{
        if (valid){
          if (this.fileInfoId===''){
            const p = new Promise((resolve,reject)=>{
              this.$confirm('尚未提交附件，是否确认提交论文？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                resolve("确认")
              }).catch(() => {
                reject("已取消")
              });
            })
            p.then(() => {
              this.submitOperation()
            },error=>{
              this.$message({
                type: 'info',
                message: error
              });
            })
          }else{
            this.submitOperation()
          }
        }
      })
    },

    submitOperation(){
      let studentId = this.studentId
      let fileInfoId = this.fileInfoId
      let inputList = []
      this.ThesisFinalForm.ThesisInputSetting.forEach(element=>{
        inputList.push({
          gdthesisInputSetting:element.id,
          inputContent:element.inputContent
        })
      })
      let form = {
        studentId,
        fileInfoId,
        inputList,
      }
      let json = JSON.stringify(form)
      postThesisFinalSubmit(json).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.$message({
            type:'success',
            message:res.message
          })
          this.$router.push({
            name:'ThesisFinalView'
          })
        }else{
          this.$message({
            type:'error',
            message:res.message
          })
        }
      })
    },

    initialization(studentId){
      let p = new Promise((resolve,reject)=>{
        postVerifyHaveSubmitted({
          studentId
        }).then(result=>{
          let res = result.data
          if (res.resultCode!==200){
            resolve(res.message)
          }else{
            reject(res.message)
          }
        })
      })
      p.then(value => {
        this.getThesisInputSettingList()
        this.isHaveSubmitted = true
        this.isHaveSubmittedMessage = value
      },error=>{
        this.isHaveSubmitted = false
        this.isHaveSubmittedMessage = error
      })
      setTimeout(()=>{
        this.loading = false
      },500)
    },
  },

  created() {
    this.studentId = this.user.userId
    this.importHeaders.token = this.token
    this.initialization(this.user.userId)
  },

  beforeDestroy() {
    this.loading = true
  }

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


    .buttonGroup{
      display: flex;
      justify-content: center;
      line-height: 60px;
    }
  }

  .myContent:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
