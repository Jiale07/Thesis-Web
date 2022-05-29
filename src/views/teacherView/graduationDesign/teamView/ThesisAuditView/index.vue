<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/team' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>小组成员论文提交情况</el-breadcrumb-item>
        <el-breadcrumb-item>学生论文提交记录</el-breadcrumb-item>
        <el-breadcrumb-item>毕业论文审核</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <ThesisBasicInformationComponent
          :studentId="studentId"
      ></ThesisBasicInformationComponent>
    </div>
    <div
        class="mainContentItemBox"
        v-for="(item,key) in ThesisInputSetting"
        :key="item.id+key">
      <div class="titleBox">
        <span class="title">{{item.titleName}}</span>
      </div>
      <div>
        <div class="ql-container ql-snow" :style="{minHeight:120+'px'}">
          <div class="ql-editor">
            <div class="details_box"  v-html="item.inputContent"/>
          </div>
        </div>
      </div>
    </div>
    <div class="accessoryFileListBox">
      <div>
        <h4>附件：</h4>
      </div>
      <div v-if="isHaveFile">
        <div class="accessoryFileItemBox">
          <div>{{fileInfo.fileNameOld}}</div>
          <div @click="download(fileInfo.id)">
            <span class="textButton">下载该文件</span>
          </div>
        </div>
      </div>
      <div v-if="!isHaveFile">
        <span>暂无附件</span>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="auditBox">
      <h4>导师审核：</h4>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="审核结果" prop="auditStatusId">
          <el-select v-model="ruleForm.auditStatusId" placeholder="请选择">
            <el-option
                v-for="item in auditStatesCategoryOptions"
                :key="item.id"
                :label="item.auditStatusName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="意见或建议" prop="content">
          <el-input type="textarea" v-model="ruleForm.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import ThesisBasicInformationComponent from "../component/ThesisBasicInformationComponent"
import {
  getThesisInputSettingList,
  postSubmitAuditStatueOfTheThesis, postThesisAccessoryFileInfo, postThesisAuditRecord,
  postThesisInputListByThesisId
} from "../../../../../axios/teacher/GDTeamAbout/ThesisAuditViewAbout";
import {postAuditStatusCategoryList} from "../../../../../axios/public/AuditStatusCategoryAbout";
import {mapState} from "vuex";
import {download, getFileName} from "../../../../../axios/public/testView";

export default {
  name: "ThesisAuditView",
  props:['propsThesisId'],
  data(){
    let checkAuditStatusId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('审核结果不能为空'));
      }else {
        callback()
      }
    };
    let validateContent = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('审核意见或建议不能为空'));
      } else {
        // if (this.ruleForm.checkPass !== '') {
        //   this.$refs.ruleForm.validateField('checkPass');
        // }
        callback();
      }
    };
    return {
      ThesisInputSetting:[],
      ruleForm:{
        id:'',
        auditStatusId:'',
        content:'',
      },
      auditStatesCategoryOptions:[],

      rules: {
        auditStatusId: [
          { validator: checkAuditStatusId, trigger: 'blur' }
        ],
        content: [
          { validator: validateContent, trigger: 'blur' }
        ],
      },

      fileInfo:{},
      isHaveFile:false
    }
  },
  computed:{
    ...mapState('loginAbout',['user']),
    ...mapState('thesisAuditViewStore',['thesisId']),
    ...mapState("thesisRecordOfStudentStore",['studentId'])
  },
  components:{
    ThesisBasicInformationComponent
  },
  methods:{
    getThesisInputSettingList(ThesisInputList){
      getThesisInputSettingList().then(result=>{
        let res = result.data
        if (res.resultCode===200){
          let data = res.data
          data.forEach(DElement=>{
            if (ThesisInputList!=null && ThesisInputList!=='' && ThesisInputList!==undefined){
              ThesisInputList.forEach(listElement=>{
                if (DElement.id===listElement.gdthesisInputSettingId){
                  DElement.inputContent = listElement.inputContent
                }
              })
            }
          })
          this.ThesisInputSetting = data
        }
      })
    },

    initialization(gdThesisId){
      this.postAuditStatusCategoryList()
      let p = new Promise((resolve,reject)=>{
        postThesisInputListByThesisId({gdThesisId}).then(result=>{
          let res = result.data
          if (res.resultCode===200){
            resolve(res.data)
          }else{
            reject()
          }
        })
      })

      p.then(value=>{
        this.getThesisInputSettingList(value)
      },error=>{
        this.getThesisInputSettingList(error)
      })
    },

    postAuditStatusCategoryList(){
      postAuditStatusCategoryList().then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.auditStatesCategoryOptions = res.data
        }
      })
    },

    postThesisAuditRecord(gdThesisId){
      postThesisAuditRecord({gdThesisId}).then(result=>{
        let res = result.data
        console.log(res)
        if (res.resultCode===200){
          this.ruleForm.id = res.data.id
          this.ruleForm.auditStatusId = res.data.auditStatusId
          this.ruleForm.content = res.data.content
        }
      })
    },

    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let form = this.ruleForm
          form.gdthesisId = this.thesisId
          form.teacherId = this.user.userId
          postSubmitAuditStatueOfTheThesis(form).then(result=>{
            let res = result.data
            if(res.resultCode===200){
              this.$message({
                type:'success',
                message:res.message
              })
              this.$router.go(-1)
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

    postThesisAccessoryFileInfo(gdThesisId){
      postThesisAccessoryFileInfo({gdThesisId}).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.fileInfo = res.data
          this.isHaveFile = true
        }else{
          console.log(res.message)
        }
      })
    },

    download(fileId){
      getFileName({fileInfoId:fileId}).then(result=>{
        let fileName = result.data.data
        download({fileId}).then(res=>{
          let data = res.data
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
            message:err.message
          })
        })
      })
    },
  },
  created() {
    if (this.propsThesisId!=='' && this.propsThesisId!==null && this.propsThesisId!==undefined){
      this.$store.commit("thesisAuditViewStore/setThesisId",this.propsThesisId)
    }
    this.postThesisAccessoryFileInfo(this.thesisId)
    this.postThesisAuditRecord(this.thesisId)
    this.initialization(this.thesisId)
  }
}
</script>

<style scoped lang="less">

.mainContentItemBox{
  margin-bottom: 20px;
}
.titleBox{
  line-height: 30px;
}

.accessoryFileItemBox{
  width: 420px;
  display: flex;
  justify-content: space-between;
  line-height: 30px;

  .textButton{
    padding: 5px;
    color: #007bbb;
    transition: all 0.2s

  }

  .textButton:hover{
    padding: 5px;
    cursor:pointer;
    color: #ffffff;
    background-color: #2ca9e1;
    border-radius: 5px;
  }
}

</style>