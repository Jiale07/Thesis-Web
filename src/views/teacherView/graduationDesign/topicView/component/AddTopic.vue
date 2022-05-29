<template>
  <div>
    <div class="myContainer main">
      <el-form ref="form" :model="form" :label-width="formLabelWidth">
        <el-form-item label="课题名称">
          <el-input v-model="form.topicName"></el-input>
        </el-form-item>
        <el-form-item label="课题类型" :label-width="formLabelWidth">
          <el-select v-model="form.categoryId" placeholder="请选择">
            <el-option
                v-for="item in TopicCategory"
                :key="item.id"
                :label="item.categoryName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="可被选数量">
          <el-input-number v-model="form.optionalNumber" :min="1" :max="5" ></el-input-number>
        </el-form-item>
        <el-form-item label="课题描述">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addTopicFunc">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {addTopic} from "../../../../../axios/teacher/GraduationDesignAbout/TopicView";
import {getTopicCategoryList} from "../../../../../axios/public/GDTopicCategoyrAbout";
import {mapState} from "vuex";

export default {
  name: "addTopic",
  data(){
    return {
      form: {
        creatorId:'',
        topicName: '',
        categoryId:'',
        description:'',
        optionalNumber:1,
        isDeleted:0
      },
      TopicCategory:'',
      formLabelWidth:"120px"
    }
  },

  computed:{
   ...mapState('loginAbout',['user'])
  },
  methods: {
    addTopicFunc(){
      let addFrom = this.form
      addFrom.creatorId = this.user.userId
      console.log(this.form.description)
      addTopic(this.form).then(res=>{
        let result = res.data
        if (result.resultCode){
          this.$message({
            type:'success',
            message:result.message
          })
          this.$router.go(0)
        }else{
          this.$message({
            type:'error',
            message:result.message
          })
        }
      })
    },

    getTopicCategoryList(){
      getTopicCategoryList().then(res=>{
        let result = res.data
        if(result.resultCode===200){
          this.TopicCategory = result.data
        }
      })
    },
  },
  created() {
    this.getTopicCategoryList()
  }
}
</script>

<style scoped lang="less">
.myContainer{
  padding: 10px;
}

.main{
  margin: 0 auto;
  width: 600px;

  .line{
    text-align: center;
  }
}
</style>