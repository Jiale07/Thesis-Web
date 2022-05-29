<template>
  <div>
    <div class="selectGroup">
      <div class="selectContainer">
        <span>学院:</span>
        <el-select v-model="collegeId" placeholder="请选择">
          <el-option
              v-for="item in this.publicOption.CollegeOptions"
              :key="item.id"
              :label="item.collegeName"
              :value="item.id"
              :disabled="item.disabled">
          </el-option>
        </el-select>
      </div>
      <div class="selectContainer">
        <span>专业:</span>
        <el-select v-model="majorId" placeholder="请选择">
          <el-option
              v-for="item in search.option.MajorOptions"
              :key="item.id"
              :label="item.majorName"
              :value="item.id"
              :disabled="item.disabled">
          </el-option>
        </el-select>
      </div>
      <div class="selectContainer">
        <span>班级:</span>
        <el-select v-model="classId" disabled  placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
          </el-option>
        </el-select>
      </div>
      <div class="selectContainer">
        <el-button type="primary" @click="conditionsSearch()">条件搜索</el-button>
        <el-button type="primary" @click="ClearOptionsValue">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "SelectGroup",
  props:['getAccountList','getMajorInfo'],
  data(){
    return {
      options:''
    }
  },
  computed:{
    ...mapState('studentInfo',['selectGroup','search','publicOption','pageInfo']),
    // eslint-disable-next-line vue/no-dupe-keys
    collegeId: {
      get() {
        return this.$store.state.studentInfo.selectGroup.collegeId
      },
      set(value) {
        this.$store.commit('studentInfo/updateSearchCollegeId',value)
        this.getMajorInfo(value)
        this.$store.commit('studentInfo/updateSearchMajorId','')
      }
    },
    majorId:{
      get() {
        return this.$store.state.studentInfo.selectGroup.majorId
      },
      set(value) {
        this.$store.commit('studentInfo/updateSearchMajorId',value)
      }
    },
    classId:{
      get() {
        return this.$store.state.studentInfo.selectGroup.classId
      },
      set(value) {
        this.$store.commit('studentInfo/updateSearchClassId',value)
      }
    }
  },
  methods:{
    conditionsSearch(){
      this.getAccountList(1,10)
    },
    // ...mapMutations(['ClearOptionsValue']),
    ClearOptionsValue(){
      this.$store.commit('studentInfo/ClearOptionsValue')
      this.getAccountList(this.pageInfo.current_page,this.pageInfo.page_size)
    }
  },
}
</script>

<style scoped lang="less">
.selectGroup{
  display: flex;
  background-color: #ffffff;
  line-height: 60px;

  .selectContainer{
    margin-left: 20px;
  }
}

.el-select{
  margin-left: 10px;
}
</style>