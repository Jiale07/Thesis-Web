<template>
  <div>
    <div class="breadcrumbBox">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/team' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/thesisProposalSubmittedTable' }">开提报告列表（已提交）</el-breadcrumb-item>
        <el-breadcrumb-item>开题报告审批</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-descriptions title="基本信息">
      <el-descriptions-item label="学生名称">{{ ThesisProposalAuditVO.studentName }}</el-descriptions-item>
      <el-descriptions-item label="学号">{{ ThesisProposalAuditVO.studentId }}</el-descriptions-item>
      <el-descriptions-item label="学生学院">{{ ThesisProposalAuditVO.collegeName }}</el-descriptions-item>
      <el-descriptions-item label="学生专业">
        <el-tag size="small">{{ ThesisProposalAuditVO.majorName }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="教职工号">{{ ThesisProposalAuditVO.teacherId }}</el-descriptions-item>
      <el-descriptions-item label="教师名称">{{ ThesisProposalAuditVO.teacherName }}</el-descriptions-item>
    </el-descriptions>

    <el-descriptions title="毕业设计题目信息">
      <el-descriptions-item label="题目">{{ ThesisProposalAuditVO.thesisName }}</el-descriptions-item>
      <el-descriptions-item label="题目类型">{{ ThesisProposalAuditVO.thesisCategoryName}}</el-descriptions-item>
    </el-descriptions>
    <div class="itemBox"
         v-for="(item,key) in ThesisProposalInputSetting" :key="key">
      <div>
        {{item.titleName}}
      </div>
      <div class="ql-container ql-snow" :style="{minHeight:120+'px'}">
        <div class="ql-editor">
          <div class="details_box"  v-html="item.content"/>
        </div>
      </div>
    </div>
    <div class="accessoryFileListBox">
      <div>
        <h4>附件：</h4>
      </div>
      <div v-if="FileInfo!==null">
        <div class="accessoryFileItemBox">
          <div>{{FileInfo.fileNameOld}}</div>
          <div @click="download(FileInfo.id)">
            <span class="textButton">下载该文件</span>
          </div>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div
        class="auditBox"
        v-for="(item,key) in auditInputList"
        :key="'auditInput'+key"
    >
      <div v-if="item.isShow">
        <div>
          <h4>{{item.titleName}}</h4>
        </div>
        <el-form :label-position="labelPosition" label-width="80px" :model="auditForm">
          <el-form-item label="审核结果">
            <el-select v-model="item.auditStatusId" placeholder="请选择">
              <el-option
                  v-for="item in auditStatusOptions"
                  :key="item.id"
                  :label="item.auditStatusName"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核意见">
            <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="item.inputComment">
            </el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" @click="submitAudit(item)">提交</el-button>
        </div>
      </div>
      <div v-if="!item.isShow">
        <div>
          <h4>{{item.titleName}}</h4>
        </div>
        <div>
          <el-form :label-position="labelPosition" label-width="80px" :model="auditForm">
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
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {
  getTPAISettingList,
  postFileInfoByFileId,
  postSubmitTPAI,
  postThesisProposalAuditVO,
  postThesisProposalInputSettingList, postTPAIList, postVerifyIsAuditByDepartmentHead
} from "@/axios/teacher/GDTeamAbout/ThesisProposalAudit";
import {download, getFileName} from "@/axios/public/testView";
import {postAuditStatusCategoryList} from "@/axios/public/AuditStatusCategoryAbout";

export default {
  name: "ThesisProposalAuditView",
  props:['tpId','WebViewRoleId'],
  data(){
    return {
      ThesisProposalAuditVO:{},
      ThesisProposalInputSetting:[],
      FileInfo:null,

      labelPosition: 'right',
      auditForm:{
        auditStatus:'',
        comment:''
      },

      auditInputList:[],

      auditStatusOptions:[],

      isAuditOfDepartmentHead:false
    }
  },
  computed:{
    ...mapState("loginAbout",['user']),
    ...mapState('thesisProposalAudit',['thesisProposalId','webViewRoleId'])
  },
  methods:{
    mainContentInitialization(thesisProposalId){
      let p = new Promise((resolve,reject)=>{
        postThesisProposalAuditVO({thesisProposalId}).then(result=>{
          let res = result.data
          if (res.resultCode===200){
            this.ThesisProposalAuditVO = res.data
            resolve(res.data)
          }else if(res.resultCode===204){
            reject(res.message)
          }
        })
      })
      p.then(value => {
        postFileInfoByFileId({fileId:value.fileId}).then(result=>{
          let res = result.data
          if (res.resultCode===200){
            this.FileInfo = res.data
          }
        })

        postThesisProposalInputSettingList().then(result=>{
          let res = result.data
          if (res.resultCode===200){
            let data = res.data
            let input = value.thesisProposalInputsList
            data.forEach(Delement=>{
              input.forEach(Ielement=>{
                if (Delement.id===Ielement.tpInputSettingId){
                  Delement.content = Ielement.inputContent
                }
              })
            })
            this.ThesisProposalInputSetting = res.data

          }
        })

      },error=>{
        this.$message({
          type:'warning',
          message:error,
        })
      })
    },

    postThesisProposalInputSettingList(){
      postThesisProposalInputSettingList().then(result=>{
        let res = result.data
        if (res.resultCode===200){
          let data = res.data
          let input = this.ThesisProposalAuditVO.thesisProposalInputsList
          data.forEach(Delement=>{
            input.forEach(Ielement=>{
              if (Delement.id===Ielement.tpInputSettingId){
                Delement.content = Ielement.inputContent
              }
            })
          })
         this.ThesisProposalInputSetting = res.data

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

    /*
    获取开提报告审核页面的审核输入设置
    通过与用户的id进行匹配，显示该用户拥有角色的输入框

    判断角色对该开题报告是否已经提交了
    若已有提交，将该提交的内容获取到页面中在对应的输入框中显示。
    若没有则放入空字符串
     */

    getTPAISettingList(THAIList){
      getTPAISettingList().then(result=>{
        let res = result.data
        if(res.resultCode===200){
          let data = res.data
          let userRoleList = this.user.roleIdList
          data.forEach(DElement=>{
            userRoleList.forEach(element=>{
              DElement.auditStatusId = ''
              DElement.inputComment = ''
              if (element===DElement.roleId && this.webViewRoleId.toString()===DElement.roleId.toString() && !this.isAuditOfDepartmentHead){
                DElement.isShow = true
              }
            })
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

    auditInputInitialization(thesisProposalId){
      this.postVerifyIsAuditByDepartmentHead(thesisProposalId)
      let p = new Promise((resolve,reject)=>{

        postTPAIList({
          thesisProposalId,
        }).then(result=>{
          let res = result.data
          if (res.resultCode===200){

            resolve(res.data)
          }else{
            reject()
          }
        })
      })

      p.then(value=>{
        this.getTPAISettingList(value)

      },error=>{
        this.getTPAISettingList(error)
      })
    },


    postAuditStatusCategoryList(){
      postAuditStatusCategoryList().then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.auditStatusOptions = res.data
        }
      })
    },

    submitAudit(item){
      let teacherId = this.user.userId
      if (!(item.auditStatusId!==""&& item.auditStatusId!==null)){
        this.$message({
          type:'warning',
          message:"审核结果不能为空"
        })
        return
      }
      if (!(item.inputComment!=="" && item.inputComment!==null)){
        this.$message({
          type:'warning',
          message:"审核意见不能为空"
        })
        return
      }

      let TPAIObject = {
        id:item.TPAIId,
        teacherId,
        tpId:this.ThesisProposalAuditVO.thesisProposalId,
        tpaiSettingId:item.id,
        auditStatusId:item.auditStatusId,
        inputComment:item.inputComment
      }
      postSubmitTPAI(TPAIObject).then(result=>{
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

    postVerifyIsAuditByDepartmentHead(thesisProposalId){
      postVerifyIsAuditByDepartmentHead({thesisProposalId}).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.isAuditOfDepartmentHead = true
        }
      })
    }
  },
  created() {
    if(this.tpId!==null && this.tpId!=='' &&this.tpId!==undefined){
      this.$store.commit("thesisProposalAudit/setThesisProposalId",this.tpId)
      this.$store.commit("thesisProposalAudit/setWebViewRoleId",this.WebViewRoleId)
    }
    this.postAuditStatusCategoryList()

    this.mainContentInitialization(this.thesisProposalId)
    this.auditInputInitialization(this.thesisProposalId)
  },

  beforeDestroy() {
    this.$store.commit("thesisProposalAudit/clearData")
  }
}
</script>

<style scoped lang="less">
.breadcrumbBox{
  margin-bottom: 20px;
}
.itemBox{
  margin-bottom: 20px;
}
.itemBox:last-child{
  margin-bottom: 0;
}


.accessoryFileListBox{
  margin-bottom:30px;

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
}
.accessoryFileListBoxlast-child{
  margin-bottom: 0;
}

.accessoryFileItemBox:nth-child(even){
  background-color: #f3f3f3;
}

.auditBox{

}
</style>
