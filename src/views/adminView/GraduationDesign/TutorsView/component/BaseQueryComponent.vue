<template>
  <div>
    <div class="selectGroup">
      <div class="selectContainer">
        <span>学院:</span>
        <el-select v-model="collegeId" placeholder="请选择">
          <el-option
              v-for="item in this.collegeList"
              :key="item.id"
              :label="item.collegeName"
              :value="item.id"
              :disabled="item.disabled">
          </el-option>
        </el-select>
<!--        <el-select v-model="roleId" placeholder="请选择">-->
<!--          <el-option-->
<!--              v-for="item in this.roleList"-->
<!--              :key="item.id"-->
<!--              :label="item.roleName"-->
<!--              :value="item.id"-->
<!--              :disabled="item.disabled">-->
<!--          </el-option>-->
<!--        </el-select>-->
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
  name: "BaseQueryComponent",
  props:['postTutorsPage'],
  data(){
    return {
      option:'',
      radio:'2001'
    }
  },
  computed:{
    ...mapState('tutorStore',['pageInfo','collegeList','selectGroup','roleList']),

    collegeId: {
      get() {
        return this.$store.state.tutorStore.selectGroup.collegeId
      },
      set(value) {
        this.$store.commit('tutorStore/updateSearchCollegeId',value)
      }
    },

    roleId: {
      get() {
        return this.$store.state.tutorStore.selectGroup.roleId
      },
      set(value) {
        this.$store.commit('tutorStore/updateSearchRoleId',value)
      }
    },
  },
  methods:{
    conditionsSearch(){
      this.postTutorsPage(this.pageInfo.current_page,this.pageInfo.page_size)
    },
    ClearOptionsValue() {
      this.$store.commit('tutorStore/ClearOptionsValue')
      this.postTutorsPage(this.pageInfo.current_page,this.pageInfo.page_size)
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

.radioBox{
  margin: 0 10px;
}
</style>