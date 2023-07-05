<template>
  <div>
    <div>
      <ThesisBasicInformationComponent
          :studentId="studentId"
      ></ThesisBasicInformationComponent>
    </div>
    <div>
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
    </div>
    <el-divider></el-divider>
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
        <span>{{isHaveFileMessage}}</span>
      </div>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
import ThesisBasicInformationComponent from "../component/ThesisBasicInformationComponent"
import {
  postThesisFinalAccessoryFileInfo,
  thesisFinalInputList,
  thesisFinalInputSettingList
} from "@/axios/teacher/GDTeamAbout/ThesisFinalDetailAbout";
import {download, getFileName} from "@/axios/public/testView";
export default {
  name: "ThesisFinalDetailView",
  props:['studentId'],
  data(){
    return{
      ThesisInputSetting:[],
      isHaveFile:false,
      isHaveFileMessage:'',
      fileInfo:''
    }
  },
  components:{
    ThesisBasicInformationComponent
  },
  methods:{
    initialization(StudentId){
      let p = new Promise((resolve,reject)=>{
        thesisFinalInputSettingList().then(result=>{
          let res = result.data
          if (res.resultCode===200){
            resolve(res.data)
          }else if(res.resultCode===204){
            reject(res.message)
          }
        })
      })
      p.then(value=>{
        thesisFinalInputList({
          studentId:this.studentId
        }).then(result=>{
          let res = result.data
          if (res.resultCode===200){
            let inputList = res.data
            value.forEach(Ve=>{
              inputList.forEach(Ie=>{
                if (Ve.id===Ie.gdthesisInputSettingId){
                  Ve.inputContent = Ie.inputContent
                }
              })
            })
            this.ThesisInputSetting = value
          }else{
            this.$message.warning(res.message)
          }
          this.postThesisFinalAccessoryFileInfo(StudentId)
        })
      },error=>{
        this.$message.warning(error)
      })
    },

    postThesisFinalAccessoryFileInfo(studentId){
      postThesisFinalAccessoryFileInfo({
        studentId
      }).then(result=>{
        let res = result.data
        if(res.resultCode===200){
          this.fileInfo = res.data
          this.isHaveFile = true
        }else if (res.resultCode===204){
          this.isHaveFileMessage = res.message
          this.isHaveFile = false
        }else{
          this.isHaveFileMessage = res.message
          this.isHaveFile = false
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
    if(this.studentId!==undefined){
      this.$store.commit("thesisFinalDetail/setStudentId",this.studentId)
      this.initialization(this.studentId)
    }else{
      this.initialization(this.$store.state.thesisFinalDetail.studentId)
    }
  },
  beforeDestroy() {
    // this.$store.commit('thesisFinalDetail/closeState')
  }
}
</script>

<style scoped lang="less">
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
