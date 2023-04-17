<template>
  <div :style="{minHeight:asideHeight+'px'}">
    <div class="myContainer">
      <div class="myContent">
        <el-page-header @back="goBack" content="详情页面" class="header">
        </el-page-header>
      </div>

      <div class="myContent">
        <div class="announcementDetail" v-loading="isLoading">
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

</template>

<script>
import { postAnnouncementById, postCreatorNameByCreatorId} from "../../../axios/public/ReadTheAnnouncement";

export default {
  name: "ReadTheAnnouncement",
  props:['announcementId'],
  data(){
    return {
      asideHeight:'',

      Announcement:{
        announcementName:'公告题目',
        createTime:'XXXX-XX-XX',
        announcementContent:'公告内容'
      },
      creatorName:'CreatorName',

      isLoading:true
    }
  },
  computed:{

  },
  methods:{
    goBack(){
      this.$router.go(-1)
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
    if (this.announcementId!==undefined){
      this.$store.commit('readTheAnnouncement/setAnnouncementId',this.announcementId)
      this.initialization(this.announcementId)
    }else{
      this.initialization(this.$store.state.readTheAnnouncement.announcementId)
    }
    setTimeout(()=>{
      this.isLoading = false
    },300)
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
.announcementDetail{
  margin-top: 20px;
  box-shadow: 0 0 3px;
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


.myContainer{
  margin: 0 auto;
  max-width: 1280px;

  .myContent{
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #ffffff;
  }
}

</style>