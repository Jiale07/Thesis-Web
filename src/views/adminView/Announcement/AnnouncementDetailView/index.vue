<template>
  <div>
    <div class="myContainer">
      <el-page-header @back="goBack" content="公告详情页面">
      </el-page-header>
    </div>
    <div class="myContainer">
      <div v-if="Announcement===null||Announcement===undefined" class="errorBox">
        <div class="titleBox">
          <span>没有找到对应的公告详情信息</span>
        </div>
        <div>
          <div class="hintBox">
            <span>你可以选择：</span>
          </div>
          <div>
            <el-button type="primary" @click="toAnnouncementView">前往公告信息页面</el-button>
            <el-button @click="toHome">返回主页</el-button>
          </div>
        </div>
      </div>
      <div v-if="!(Announcement===null||Announcement===undefined)" v-loading="loading">
        <el-descriptions title="公告属性" >
          <template slot="extra">
            <UpdateAnnouncement
              :Announcement="Announcement"
              :AVisibleList="AVisibleList"
              :ACategory="ACategory"
            ></UpdateAnnouncement>
          </template>
          <el-descriptions-item label="公告名称">{{Announcement.announcementName}}</el-descriptions-item>
          <el-descriptions-item label="公告类型">{{ ACategory.categoryName }}</el-descriptions-item>
          <el-descriptions-item label="公告发布时间（创建时间）">{{ Announcement.createTime }}</el-descriptions-item>
          <el-descriptions-item label="公告更新时间">{{ Announcement.updateTime }}</el-descriptions-item>
          <el-descriptions-item label="对角色可见">
            <el-tag size="small" v-for="(item,index,key) in AVisibleList" :key="key">{{ item.roleName }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
<!--        公告预览-->
        <div>
          <div>
            <span>预览1</span>
          </div>
          <div>
            <div class="announcementDetail">
              <div class="titleBox">
                <span class="title">{{ Announcement.announcementName }}</span>
              </div>
              <div class="propertyBox">
                <span class="propertyText">撰写人:{{creatorName}}{{"   "}}时间:{{Announcement.createTime}}</span>
              </div>
              <div>
                <div class="ql-container ql-snow">
                  <div class="ql-editor">
                    <div class="details_box"  v-html="Announcement.announcementContent"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  postAVListByAnnouncementId,
} from "../../../../axios/adminView/Announcement/AnnouncementDetail";
import UpdateAnnouncement from "./components/UpdateAnnouncementComponent";
import {
  postACById,
  postAnnouncementById,
  postCreatorNameByCreatorId
} from "../../../../axios/public/ReadTheAnnouncement";

export default {
  name: "AnnouncementDetail",
  props:['announcementId'],
  data(){
    return {
      preview:[],
      AVisibleList: {},
      Announcement:{},
      ACategory: {},
      creatorName:"",
      loading:true,
    }
  },
  components:{
    UpdateAnnouncement
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },
    toAnnouncementView(){
      this.$router.push({
        name:'Announcement'
      })
    },
    toHome(){
      this.$router.push({
        name:'Hello'
      })
    },

    postAVListByAnnouncementId(announcementId){
      postAVListByAnnouncementId({
        announcementId
      }).then(result=>{
        let res = result.data
        if(res.resultCode===200){
          this.AVisibleList = res.data
        }
      })
    },

    postACById(acId){
      postACById({
        acId
      }).then(result=>{
        let res = result.data
        if(res.resultCode===200){
          this.ACategory = res.data
        }
      })
    },

    postCreatorNameByCreatorId(creatorId){
      postCreatorNameByCreatorId({
        creatorId
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.creatorName = res.data.userName
        }
      })
    },

    initialization(announcementId){
      const p = new Promise((resolve,reject)=>{
        postAnnouncementById({
          announcementId
        }).then(result=>{
          let res = result.data
          if(res.resultCode===200){
            let data = res.data
            data.createTime = this.$dayjs(data.createTime).format("YYYY-MM-DD hh:mm:ss")
            data.updateTime = this.$dayjs(data.updateTime).format("YYYY-MM-DD hh:mm:ss")
            this.Announcement = res.data
            resolve(res.data.categoryId)
          }else{
            reject(null)
          }
        })
      })
      p.then(value => {
        if (value!=null){
          this.postACById(value)
          this.postAVListByAnnouncementId(announcementId)
          this.postCreatorNameByCreatorId(this.Announcement.creatorId)
          setTimeout(()=>{
            this.loading = false
          },0)
        }
      },error=>{
        if (error===null){
          this.$message({
            type:'error',
            message:"没有找改题目更多的信息"
          })
        }
      })
    }
  },
  created() {
    let p = new Promise((resolve,reject)=>{
      if(this.announcementId!==undefined){
        this.$store.commit('announcementDetail/setAnnouncementId',this.announcementId)
        resolve(this.announcementId)
      }else{
        reject(this.$store.state.announcementDetail.announcementId)
      }
    })

    p.then(value => {
      this.initialization(value)
    },error=>{
      this.initialization(error)
    })
  },
  mounted() {
  },
  beforeDestroy() {
    this.$store.commit('announcementDetail/empty')
  }
}
</script>

<style scoped lang="less">
.myContainer {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #ffffff;
}


.announcementDetail{
  margin-top: 20px;
  box-shadow: 0 0 10px;
  padding: 10px;

  .titleBox{
    text-align: center;

    .title{
      font-size: 20px;
      font-weight: 600;
    }
  }

  .propertyBox{
    text-align: center;

    .propertyText{
      color: #8c939d;
    }
  }

  //去除默认的边框
  .ql-snow{
    border: 0;
  }
}


.errorBox{
  text-align: center;

  .titleBox{
    margin: 30px;

    span{
      font-size: 20px;
    }
  }

  .hintBox{

    span{
      color: #FF4400;
    }
  }
}
</style>