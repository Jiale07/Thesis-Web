<template>
  <div style="top:100px;width:300px">
    <el-form :model="form" label-width="120px">
      <el-form-item label="请输入文件名" required>
        <el-input v-model="form.fileName" auto-complete="off" class="el-col-width" required></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="handleDownLoad">下载</el-button>
      </el-form-item>
      <el-form-item>
        <el-upload
            class="upload-demo"
            ref="upload"
            :action="uploadUrl"
            :headers="importHeaders"
            :data="data"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import {mapState} from "vuex";
import {download, getFileName} from "../../../axios/public/testView";

export default {
  name: "TestView",
  data(){
    return {
      form:{
        fileName:'1515314707986288642',
      },
      uploadUrl:'/thesisApi/public/upload',
      fileList:[],
      importHeaders:{
        token:localStorage.getItem('token')
      },
      data:{
        userId:''
      }
    }
  },
  computed:{
    ...mapState('loginAbout',['user'])
  },
  methods:{
    handleDownLoad(){
      let fileId = this.form.fileName
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
          console.log("err:",err)
        })
      })
    },

    submitUpload() {
        this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  },

  created() {
    console.log(this.user.userId)
    this.data.userId = this.user.userId
  }
}
</script>

<style scoped>
.uploadButtonBox{
  display: flex;
}
</style>