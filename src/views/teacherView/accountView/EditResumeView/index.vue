<template>
  <div :style="{minHeight:asideHeight+'px'}">
    <div class="myContainer">
        <div class="myContent">
          <el-page-header @back="goBack" content="详情页面" class="header">
          </el-page-header>
        </div>
        <div class="myContent">
          <div class="main">
            <div class="fromBox">
              <el-form ref="teacherResume" :rules="rules" :model="teacherResume" label-width="120px">
                <div class="titleBox">
                  <span class="title">上传头像</span>
                  <span class="hint">上传图片大小最大为:2MB，照片类型为:.jpg。建议上传4:3照片</span>
                </div>
                <el-form-item prop="url">
                  <el-upload
                      ref="upload"
                      :disabled="false"
                      :headers="headers"
                      :data="userInfo"
                      class="avatar-uploader"
                      action="/thesisApi/public/uploadImage"
                      :show-file-list="false"
                      :auto-upload="true"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="teacherResume.imageUrl" :src="teacherResume.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <div class="titleBox">
                  <span class="title">基础信息</span>
                </div>
                <el-form-item label="名称">
                  <el-input v-model="teacherInfo.teacherName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="教师工编号">
                  <el-input v-model="teacherInfo.teacherId" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="学院">
                  <el-input v-model="teacherInfo.collegeName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="出生日期">
                  <el-date-picker
                      v-model="teacherResume.birthdate"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="date"
                      placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="籍贯">
                  <el-input v-model="teacherResume.birthplace"></el-input>
                </el-form-item>
                <div class="titleBox">
                  <span class="title">学习生涯</span>
                </div>
                <el-form-item label="毕业学院">
                  <el-input v-model="teacherResume.graduateSchool"></el-input>
                </el-form-item>
                <el-form-item label="毕业专业">
                  <el-input v-model="teacherResume.graduateMajor"></el-input>
                </el-form-item>
                <el-form-item label="学历">
                  <el-input v-model="teacherResume.education"></el-input>
                </el-form-item>
                <div class="titleBox">
                  <span class="title">联系方式</span>
                </div>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="teacherResume.email"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                  <el-input v-model="teacherResume.phone"></el-input>
                </el-form-item>

                <div class="titleBox">
                  <span class="title">更多信息</span>
                </div>
                <el-form-item label="教育背景">
                  <div>
                    <quill-editor
                        v-model="teacherResume.educationBackground"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                    </quill-editor>
                    <!-- 富文本内容 -->
                    <div class="text"></div>
                  </div>
                </el-form-item>
                <el-form-item label="工作经验">
                  <div>
                    <quill-editor
                        v-model="teacherResume.workExperience"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                    </quill-editor>
                    <!-- 富文本内容 -->
                    <div class="text"></div>
                  </div>

                </el-form-item>
                <el-form-item label="研究方向">
                  <div>
                    <quill-editor
                        v-model="teacherResume.researchDirection"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                    </quill-editor>
                    <!-- 富文本内容 -->
                    <div class="text"></div>
                  </div>
                </el-form-item>
                <el-form-item label="其他">
                  <div>
                    <quill-editor
                        v-model="teacherResume.other"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                    </quill-editor>
                    <!-- 富文本内容 -->
                    <div class="text"></div>
                  </div>
                </el-form-item>
              </el-form>
            </div>
            <div class="submitBox">
              <div class="submit">
                <el-button type="primary" @click="submitTeacherInfo('teacherResume')">保存</el-button>
                <el-button @click="goBack">取消</el-button>
              </div>
            </div>
          </div>
        </div>

    </div>
  </div>
</template>

<script>
import {postTeacherResume,postUpdateTeacherResume } from "../../../../axios/public/TeacherResumeAbout";
import {mapState} from "vuex";
// import {dateFormatter} from "../../../../util/dateFormatter";

export default {
  name: "EditResume",
  props:['teacherId'],
  data(){
    let validateEmail = (rule,value,callback)=>{
      if (value===''&&value!==null&&value!==undefined) callback()
      if(!this.isEmail(value)){
        callback(new Error("邮箱格式错误"))
      }else{
        callback()
      }
    }

    let validatePhone = (rule,value,callback)=>{
      if (value!==''&&value!==null&&value!==undefined){
        if (value.length!==11){
          callback(new Error("电话长度应为11位"))
        }else{
          callback()
        }
      }else{
        callback()
      }

    }

    return {
      asideHeight:'',
      imageUrl: '',
      teacherInfo:{
        teacherId:'',
        teacherName:'',
        collegeName:'',
      },
      oldTeacherResume:{
        birthdate:'',
        birthplace:'',
        graduateSchool:'',
        graduateMajor:'',
        education:'',
        email:'',
        phone:'',
        imageUrl:'',
        educationBackground:'',
        workExperience:'',
        researchDirection:'',
        other:''

      },
      teacherResume:{
        birthdate:'',
        birthplace:'',
        graduateSchool:'',
        graduateMajor:'',
        education:'',
        email:'',
        phone:'',
        imageUrl:'',
        educationBackground:'',
        workExperience:'',
        researchDirection:'',
        other:''
      },
      rules:{
        email:[
          {
            validator:validateEmail,trigger:'blur'
          }
        ],
        phone:[
          {
            validator:validatePhone,rigger:'blur'
          }
        ]
      },

      editorOption:{
        modules:{
          toolbar:[
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            ['clean'],
          ]
        }
      },

      headers:{
        token:this.token
      },
      userInfo:{
        userId:this.teacherId
      }
    }
  },
  computed:{
    ...mapState('loginAbout',['user','token'])
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },

    isEmail(s){
      return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(s)
    },

    handleAvatarSuccess(res) {
      console.log(res)
      this.teacherResume.imageUrl =res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        return false
      }
      return isJPG && isLt2M;
    },

    postTeacherResume(teacherId){
      postTeacherResume({
        teacherId
      }).then(result=>{
        let res = result.data
        if(res.resultCode===200){
          console.log(res)
          let data = Object.assign({},res.data.teacherResume)
          this.teacherInfo.teacherId = res.data.teacherId
          this.teacherInfo.teacherName = res.data.teacherName
          this.teacherInfo.collegeName = res.data.collegeName

          for (let name in data ) {
            this.teacherResume[name] = data[name]
            this.oldTeacherResume[name] = data[name];
          }
        }
      })
    },

    submitUpload() {
      this.$refs.upload.submit();
    },

    submitTeacherInfo(fromName){
      this.$refs[fromName].validate((valid)=>{
        if (valid){
          let newObject = this.teacherResume
          let oldObject = this.oldTeacherResume
          if (!this.isObjectValueEqual(newObject,oldObject)){
            let teacherResume = newObject
            delete teacherResume.createTime
            delete teacherResume.updateTime
            postUpdateTeacherResume(teacherResume).then(result=>{
              let res = result.data
              if (res.resultCode){
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
          }else{
            this.$message({
              type:'warning',
              message:'信息尚未改动，不进行更新操作'
            })
          }
        }else{
          return false
        }
      })

    },

    isObjectValueEqual(a, b) {
      //取对象a和b的属性名
      let aProps = Object.getOwnPropertyNames(a);
      let bProps = Object.getOwnPropertyNames(b);
      //判断属性名的length是否一致
      if (aProps.length !== bProps.length) {
        return false;
      }
      try{
        //循环取出属性名，再判断属性值是否一致
        for (let i = 0; i < aProps.length; i++) {
          let propName = aProps[i];
          if (aProps[i]==='__ob__'){
            throw new Error('end')
          }
          if (a[propName] !== b[propName]) {
            return false;
          }
        }
      }catch (e){
        if(e.message === "end"){
          return true;
        }
      }
    },

    //失去焦点事件
    onEditorBlur(){

    },
    //获得焦点事件
    onEditorFocus(){

    },
    //内容改变事件
    onEditorChange(){

    },
  },
  created() {
    this.postTeacherResume(this.user.userId)
    this.headers.token = this.token
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

  .myContent{
    margin: 0 auto 10px;
    padding: 10px;
    width: 1280px;
    background-color: #ffffff;
    border-radius: 15px;
  }


  .header{
    padding: 10px;
  }

  .main{
    margin: 0 auto;
    width: 720px;

    .titleBox{
      margin-bottom: 10px;

      .title{
        color: #2ca9e1;
        font-size: 18px;
        font-weight: bold;
      }

      .hint{
        font-size: 12px;
        color:#8c939d;
      }
    }

    .imageBox{
      margin-top: 20px;


    }

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: auto;
      height: 178px;
      display: block;
    }

    .fromBox{
      margin: 10px 0;
    }

    .submitBox{
      margin-top: 20px;
      display: flex;
      justify-content: center;

      .submit{
        margin-top: 20px;
      }
    }
  }
}
</style>