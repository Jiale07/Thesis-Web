<template>
  <div class="searchInputBox">
    <div class="searchItem">
      <span class="myLabel">学院:</span>
      <el-tooltip class="item" effect="dark" content="当前已禁止查看其他学院的毕业设计课题" placement="top">
        <el-select v-model="CollegeId" disabled  placeholder="请选择">
          <el-option
              v-for="item in collegeList"
              :key="item.id"
              :label="item.collegeName"
              :value="item.id">
          </el-option>
        </el-select>
      </el-tooltip>
    </div>
    <div class="searchItem">
      <span class="myLabel">题目种类:</span>
      <el-select v-model="CategoryId" clearable filterable placeholder="请选择">
        <el-option
            v-for="item in topiCategoryList"
            :key="item.id"
            :label="item.categoryName"
            :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div class="searchItem">
      <el-input v-model="TopicName" placeholder="题目名称" class="searchInput"></el-input>
    </div>
    <div class="searchItem">
      <el-input v-model="TeacherName" placeholder="教师名称" class="searchInput"></el-input>
    </div>
    <div class="searchItem">
      <el-button type="primary" @click="searchMentor">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script>
import {
  getCollegeList
} from "../../../../../axios/studentView/independentChoice/choiceInstructorView";
import {mapState} from "vuex";
import {getTopicCategoryList} from "../../../../../axios/public/GDTopicCategoyrAbout";

export default {
  name: "SearchComponent",
  props:['postTopicPage'],
  data(){
    return {
      collegeList:'',
      topiCategoryList:'',

      //控制初始显示
      //结合v-model="activeNames"使用
      // activeNames: ['1']
    }
  },
  computed:{
    ...mapState('choiceInstructor',['pageInfo']),
    CollegeId:{
      get(){
        return this.$store.state.choiceInstructor.searchData.collegeId
      },
      set(value){
        this.$store.commit('choiceInstructor/setSearchCollegeId',value)
      }
    },
    CategoryId:{
      get(){
        return this.$store.state.choiceInstructor.searchData.categoryId
      },
      set(value){
        this.$store.commit('choiceInstructor/setSearchCategoryId',value)
      }
    },
    TeacherName:{
      get(){
        return this.$store.state.choiceInstructor.searchData.teacherName
      },
      set(value){
        this.$store.commit("choiceInstructor/setSearchTeacherName",value)
      }
    },
    TopicName:{
      get(){
        return this.$store.state.choiceInstructor.searchData.topicName
      },
      set(value){
        this.$store.commit('choiceInstructor/setSearchTopicName',value)
      }
    }
  },
  methods:{
    getCollegeInfoList(){
      getCollegeList().then(res=>{
        let result = res.data
        if (result.resultCode === 200){
          this.collegeList = result.data
        }else{
          this.$message({
            type:'error',
            message:result.message
          })
        }
      })
    },
    searchMentor(){
      this.postTopicPage(
          this.pageInfo.current_page,
          this.pageInfo.page_size,
          this.TeacherName,
          this.CollegeId,
          this.CategoryId,
          this.TopicName,)
    },

    reset(){
      this.$store.commit('choiceInstructor/emptySearch')
      setTimeout(()=>{
        this.postTopicPage(
            this.pageInfo.current_page,
            this.pageInfo.page_size,
            this.TeacherName,
            this.CollegeId,
            this.CategoryId,
            this.TopicName,)
      },0)
    },

    getTopicCategory(){
      getTopicCategoryList().then(res=>{
        let result = res.data
        if (result.resultCode===200){
          this.topiCategoryList = result.data
        }
      })
    },



  },
  created() {
    this.getCollegeInfoList()
    this.getTopicCategory()
  },

  beforeDestroy(){
    this.$store.commit('choiceInstructor/emptySearch','all')
  }
}
</script>

<style scoped lang="less">
.searchInputBox{
  padding: 10px;
  display: flex;
  justify-content: left;

  .searchInput{
    width: 420px;
  }

  .searchItem{
    margin-right: 20px;

    .el-input {
      width: 220px;
    }
  }
}
</style>