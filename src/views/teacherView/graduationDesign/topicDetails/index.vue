<template>
  <div :style="{minHeight:asideHeight+'px'}">
<!--    毕业设计题目编号-->
<!--    题目名称-->
<!--    设计描述-->
<!--    创建者名称-->
<!--    所属学院（通过creator_id查询对用导师的学院相关信息。-->
<!--    题目类型-->
<!--    题目类型描述（可有，没有）-->

    <div class="myHeader myContainer">
      <el-page-header @back="goBack" content="毕业设计题目详情">
      </el-page-header>
    </div>

    <div class="myMain myContainer" v-show="isLoading">
      <el-skeleton :rows="6" animated />
    </div>
    <div class="myMain myContainer" v-show="!isLoading">
      <div class="detailsBox">
        <el-descriptions class="margin-top" title="毕业设计题目详情" :column="3" border>
          <template slot="extra">
            <div v-show="!updateInputShow">
              <el-button type="primary" size="small" @click="updateInputShowFunc">更新</el-button>
            </div>
            <div v-show="updateInputShow">
              <el-button type="primary" size="small" @click="updateInputShow = !updateInputShow">取消</el-button>
              <el-button type="primary" size="small" @click="updateSubmit">提交更新</el-button>
            </div>
          </template>
          <el-descriptions-item >
            <template slot="label" >
              <i class="el-icon-tickets"></i>
              题目名称
            </template>
            {{TopicInfo.topicName}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              题目编号
            </template>
            {{TopicInfo.topicId}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              创建者名称
            </template>
            {{TopicInfo.teacherName}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
<!--              <i class="el-icon-user"></i>-->
              可被选数量
            </template>
            <span v-show="!updateInputShow">{{TopicInfo.optionalNumber}}</span>
            <el-input-number
                v-model="updateFrom.topicProperty.optionalNumber"
                v-show="updateInputShow"
                :min="1"
                :max="5">
            </el-input-number>
          </el-descriptions-item>
          <el-descriptions-item span="4">
            <template slot="label">
              <i class="el-icon-office-building"></i>
              题目类型
            </template>
            <span v-show="!updateInputShow">{{TopicInfo.categoryName}}</span>
            <el-select
                v-model="updateFrom.topicProperty.categoryId"
                placeholder="请选择"
                v-show="updateInputShow">
              <el-option
                  v-for="item in topicCategoryList"
                  :key="item.id"
                  :label="item.categoryName"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-descriptions-item>
          <el-descriptions-item span="4">
            <template slot="label">
              <i class="el-icon-location-outline"></i>
              题目描述
            </template>

            <span v-show="!updateInputShow">
              {{TopicInfo.topicDescription}}
            </span>
            <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="updateFrom.topic.description"
                v-show="updateInputShow">
            </el-input>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </div>
</template>

<script>
import {postFindTopicDetail} from "../../../../axios/teacher/GraduationDesignAbout/TopicDetailView";
import {
  updateTopic,
} from "../../../../axios/teacher/GraduationDesignAbout/TopicDetailView";
import {getTopicCategoryList} from "../../../../axios/public/GDTopicCategoyrAbout";

export default {
  name: "TopicDetails",
  props:['topicId'],
  data(){
    return {
      TopicInfo:{
        id:'',
        topicName:'',
        topicDescription:'',
        creatorId:'',
        categoryId:'',
        optionalNumber:'',
      },
      asideHeight:'',
      isLoading:true,
      updateInputShow:false,
      updateFrom:{
        topic:{
          description:''
        },
        topicProperty:{
          categoryId:'',
          optionalNumber:1
        }
      },
      topicCategoryList:[],
      topicInfo:{
        topicId:null,
        description:null,
        topicPropertyId:null,
        categoryId:null,
        optionalNumber:null
      }
    }
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },

    updateInputShowFunc(){
      this.updateFrom.topic.description = this.TopicInfo.topicDescription
      this.updateFrom.topicProperty.categoryId = this.TopicInfo.categoryId
      this.updateFrom.topicProperty.optionalNumber = this.TopicInfo.optionalNumber
      getTopicCategoryList().then(res=>{
        let result = res.data
        if(result.resultCode===200){
          this.topicCategoryList = result.data
        }
      })
      this.updateInputShow = !this.updateInputShow
    },
    getTopicInfo(topicId){
      postFindTopicDetail({
        topicId
      }).then(res => {
        let result = res.data
        if (result.resultCode === 200) {
          this.TopicInfo = result.data
          setTimeout(()=>{
            this.isLoading=false
          },0)
        } else {
          this.$message({
            type: 'error',
            message: result.message
          })
        }
      })
    },

    updateSubmit(){
      if(this.updateFrom.topic.description !== this.TopicInfo.topicDescription){
        this.topicInfo.topicId = this.TopicInfo.topicId
        this.topicInfo.description = this.updateFrom.topic.description
      }
      if(this.updateFrom.topicProperty.categoryId !== this.TopicInfo.categoryId){
        this.topicInfo.topicPropertyId = this.TopicInfo.topicPropertyId
        this.topicInfo.categoryId = this.updateFrom.topicProperty.categoryId
      }
      if (this.updateFrom.topicProperty.optionalNumber !== this.TopicInfo.optionalNumber){
        this.topicInfo.topicPropertyId = this.TopicInfo.topicPropertyId
        this.topicInfo.optionalNumber = this.updateFrom.topicProperty.optionalNumber
      }
      if (this.topicInfo.description!==null || this.topicInfo.categoryId!==null || this.topicInfo.optionalNumber){
        updateTopic({
          topicId:this.topicInfo.topicId,
          description:this.topicInfo.description,
          topicPropertyId:this.topicInfo.topicPropertyId,
          categoryId:this.topicInfo.categoryId,
          optionalNumber:this.topicInfo.optionalNumber
        }).then(res=>{
          let result = res.data
          if(result.resultCode===200){
            this.$message({
              type:"success",
              message:result.message
            })
          }else{
            this.$message({
              type:"error",
              message:result.message
            })
          }
        })
        this.$router.go(0)
      }else{
        this.$message({
          type:'warning',
          message:'信息没有发生修改'
        })
      }
    }
  },

  created() {
    let topicId
    if (this.topicId!==undefined){
      // 页面刷新前存入数据到sessionStorage中
      window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("topicDetails/topicId",this.topicId)
      })
      topicId = this.topicId
    }else{
      topicId = sessionStorage.getItem("topicDetails/topicId")
    }
    this.getTopicInfo(topicId)
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
.myHeader{

}
.myContainer{
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px 10px 20px 10px;
  background-color: #ffffff;
  border-radius: 15px;

  span{
    margin-right: 30px;
  }


  .detailsBox{


  }

}
.myMain{
  margin-top: 10px;
}
</style>