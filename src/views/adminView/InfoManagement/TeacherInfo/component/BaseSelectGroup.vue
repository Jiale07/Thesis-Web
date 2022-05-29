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
        <el-button type="primary" @click="conditionsSearch()">条件搜索</el-button>
        <el-button type="primary" @click="ClearOptionsValue()">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "BaseSelectGroup",
  props:['getTeacherInfo'],
  data(){
    return {
      options:''
    }
  },
  computed:{
    ...mapState('teacherInfo',['pageInfo','publicOption']),

    collegeId: {
      get() {
        return this.$store.state.teacherInfo.selectGroup.collegeId
      },
      set(value) {
        this.$store.commit('teacherInfo/updateSearchCollegeId',value)
      }
    },
  },
  methods:{
    conditionsSearch(){
      this.getTeacherInfo(this.pageInfo.current_page,this.pageInfo.page_size)
    },
    ClearOptionsValue() {
      this.$store.commit('teacherInfo/ClearOptionsValue')
      this.getTeacherInfo(this.pageInfo.current_page,this.pageInfo.page_size)
    }
  }
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