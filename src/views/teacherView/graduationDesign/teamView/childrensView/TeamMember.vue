<template>
  <div>
    <template>
      <el-table
          :data="tableData"
          stripe
          style="width: 100%">
        <el-table-column
            type="index"
            width="50">
        </el-table-column>
        <el-table-column
            prop="studentName"
            label="学生姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="毕业设计题目">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div @click="toStudentDetail(scope.row)">
              <span class="textButton">更多信息</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import {postTeamMemberByTeacherId} from "../../../../../axios/teacher/GDTeamAbout/GDTeamMember";
import {mapState} from "vuex";

export default {
  name: "TeamMember",
  data() {
    return {
      tableData: []
    }
  },
  computed:{
    ...mapState('teamAboutStore',['teamInfo'])
  },
  methods:{
    toStudentDetail(row){
      alert(row.name)
    },

    postTeamMemberByTeacherId(gdTeamId){
      postTeamMemberByTeacherId({
        gdTeamId
      }).then(result=>{
        let res = result.data
        if (res.resultCode === 200){
          this.tableData = res.data
        }
      })
    }
  },
  created() {
    this.postTeamMemberByTeacherId(this.teamInfo.id)
  }
}
</script>

<style scoped lang="less">
.textButton{
  color: #007bbb;
}

.textButton:hover{
  cursor:pointer
}
</style>