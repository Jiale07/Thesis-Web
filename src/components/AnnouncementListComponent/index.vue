<template>
  <div>
    <div class="announcement">
      <div>
        <h4>公告</h4>
      </div>
      <el-divider></el-divider>
      <div class="item" v-for="(item,key) in AnnouncementList" :key="key" @click="toReadTheAnnouncement(item.id)">
        <span>{{ item.announcementName }}</span>
        <span>{{ item.createTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {postAnnouncementList} from "../../axios/public/ReadTheAnnouncement";
import {mapState} from "vuex";

export default {
  name: "AnnouncementListComponent",
  data(){
    return{
      AnnouncementList:[],
      AnnouncementBoxMessage:'',
      AnnouncementListNumber:6,
    }
  },
  computed:{
    ...mapState('loginAbout',['user','userInfo'])
  },
  methods:{
    toReadTheAnnouncement(announcementId){
      this.$router.push({
        name:'ReadTheAnnouncement',
        params:{
          'announcementId':announcementId
        }
      })
    },

    postAnnouncementList(number){
      let userId = this.user.userId
      postAnnouncementList({
        number,
        userId
      }).then(result=>{
        let res = result.data
        let resultCode = res.resultCode
        if (resultCode === 200){
          let data = res.data
          data.forEach(element=>{
            element.createTime = this.dateFormatterScoped(element.createTime)
            element.updateTime = this.dateFormatterScoped(element.updateTime)
          })
          this.AnnouncementList = data
        }else if(resultCode===204){
          this.AnnouncementBoxMessage = res.message
        }
      })
    },

    dateFormatterScoped(time){
      let date = new Date(time)
      let month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
      let day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
      return month+"-"+day
    },
  },

  created() {
    this.postAnnouncementList(this.AnnouncementListNumber)
  }
}
</script>

<style scoped lang="less">

.announcement{

  .item{
    display: flex;
    justify-content: space-between;
    padding: 0px 5px;
    line-height: 30px;
    margin-bottom: 10px;
    border-radius: 5px;
    transition: background-color 0.3s,color 0.5s;
  }

  .item:hover{

    background-color: #bbddff;
    cursor:pointer
  }
}
</style>