<template>
  <div class="myBady" >
    <div class="myContainer ">
      <div class="main">
        <div class="left">
          <div class="infoItemBox">
            <div class="infoItem myContent">
              <div class="imageBox">
                <el-image
                    :src="teacherResume.imageUrl"
                    class="imageStyle"
                    v-if="!(teacherResume.imageUrl==='' || teacherResume.imageUrl===null)">
                </el-image>
                <div class="errorImage" v-if="(teacherResume.imageUrl==='' || teacherResume.imageUrl===null)">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </div>
              <span class="title">基本信息</span>
              <div>
                <div class="textBox">
                  <span class="text">教师名称：{{teacherInfo.teacherName}}</span>
                </div>
                <div class="textBox">
                  <span class="text">教职工号：{{teacherInfo.teacherId}}</span>
                </div>
                <div class="textBox">
                  <span class="text">从属学院：{{teacherInfo.collegeName}}</span>
                </div>
                <div class="textBox">
                  <span class="text">出生日期：{{teacherResume.birthdate}}</span>
                </div>
                <div class="textBox">
                  <span class="text">籍贯：{{teacherResume.birthplace}}</span>
                </div>
              </div>
            </div>
            <div class="infoItem myContent">
              <span class="title">学习生涯</span>
              <div class="textBox">
                <span class="text">毕业学校：{{teacherResume.graduateSchool}}</span>
              </div>
              <div class="textBox">
                <span class="text">毕业专业：{{teacherResume.graduateMajor}}</span>
              </div>
              <div class="textBox">
                <span class="text">学历：{{teacherResume.education}}</span>
              </div>
            </div>
            <div class="infoItem myContent">
              <span class="title">联系方式</span>
              <div class="textBox">
                <span class="text">邮箱：{{teacherResume.email}}</span>
              </div>
              <div class="textBox">
                <span class="text">联系电话：{{teacherResume.phone}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="myContent right">
          <div>
            <div class="title">
              <span>教育背景</span>
            </div>
            <div>
              <div class="ql-container ql-snow">
                <div class="ql-editor">
                  <div class="details_box"  v-html="teacherResume.educationBackground"/>
                </div>
              </div>
            </div>
            <el-divider></el-divider>
          </div>
          <div>
            <div class="title">
              <span>工作经验</span>
            </div>
            <div>
              <div class="ql-container ql-snow">
                <div class="ql-editor">
                  <div class="details_box"  v-html="teacherResume.workExperience"/>
                </div>
              </div>
            </div>
            <el-divider></el-divider>
          </div>
          <div>
            <div class="title">
              <span>研究方向</span>
            </div>
            <div>
              <div class="ql-container ql-snow">
                <div class="ql-editor">
                  <div class="details_box"  v-html="teacherResume.researchDirection"/>
                </div>
              </div>
            </div>
            <el-divider></el-divider>
          </div>
          <div class="title">
            <span>其他</span>
          </div>
          <div>
            <div class="ql-container ql-snow">
              <div class="ql-editor">
                <div class="details_box"  v-html="teacherResume.other"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'

import 'quill/dist/quill.snow.css'

import 'quill/dist/quill.bubble.css'
import {postTeacherResume} from "../../axios/public/TeacherResumeAbout";

export default {
  name: "TeacherResume",
  props:['teacherId'],
  data(){
    return {
      teacherInfo:{
      },
      teacherResume:{
        birthdate:null,
      },
      // teacherPicture:'https://wx2.sinaimg.cn/mw2000/006wsEQdly8gt871j3ccrj30ro0rowh3.jpg'
      // teacherPicture:'https://wx3.sinaimg.cn/mw2000/d8ede7bcly1h0s05s8dk5j20u012rk4a.jpg'
      // teacherPicture:''
    }
  },

  methods:{

    postTeacherResume(teacherId){
      postTeacherResume({
        teacherId
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.teacherInfo = res.data
          this.teacherResume = res.data.teacherResume

          let birthdate = this.teacherResume.birthdate
          if (birthdate){
            let date=new Date(this.teacherResume.birthdate);
            let year = date.getFullYear();
            let month = date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
            let day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
            let dateFormatterString = year+"年"+month+"月"+day+"日"
            this.teacherResume.birthdate = dateFormatterString
          }
        }
      })
    }
  },
  created() {
    this.postTeacherResume(this.teacherId)
  }
}
</script>

<style scoped lang="less">
.myBady {
  .myContainer {
    margin: auto;
    max-width: 1280px;

    .main{
      display: flex;
      justify-content: space-between;


      .left{
        width: 300px;

        .title{
          font-size: 22px;
          font-weight: bold;
          color: #3170A7;
        }


        .imageBox{
          height: 200px;
          margin-bottom: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          background: #f5f7fa;


          .imageStyle{
            max-width: 150px;
            max-height: 200px;
          }

          .errorImage{
            width: 150px;
            height: 200px;
            font-size: 40px;
            color: #909399;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        .infoItemBox{

        }

        .infoItem{
          margin-bottom: 10px;

          .textBox{
            margin-top: 10px;

            .text{
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }

        }
      }

      .right{
        margin-left: 10px;
        width: 100%;

        .title{
          font-size: 22px;
          font-weight: bold;
          color: #3170A7;
        }

      }
    }

    .myContent {
      padding: 20px 15px;
      background-color: #ffffff;
      border-radius: 15px;
    }

  }
}

//去除默认的边框
.ql-snow{
  border: 0;
}
</style>