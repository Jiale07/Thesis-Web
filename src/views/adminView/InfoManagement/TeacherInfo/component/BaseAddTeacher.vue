<template>
  <div>
    <div>
      <el-button @click="addTeacherDialog" type="primary">
        <i class="el-icon-plus"></i>
        添加</el-button>
    </div>
    <div>
      <el-dialog title="添加新的教师账号" :visible.sync="DialogFormVisible" @close="closeDialog">
        <el-form :model="TeacherFormNew">
          <el-form-item label="学号" :label-width="formLabelWidth">
            <el-input v-model="TeacherFormNew.id"/>
            <el-button @click="getNewTeacherIdEvent">获取新的id</el-button>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="TeacherFormNew.teacherName"/>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="TeacherFormNew.password" show-password/>
          </el-form-item>
          <el-form-item label="角色" :label-width="formLabelWidth">
            <el-select v-model="TeacherFormNew.roleId" clearable placeholder="请选择">
              <el-option
                  v-for="item in roles"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学院" :label-width="formLabelWidth">
            <el-select v-model="TeacherFormNew.collegeId" clearable placeholder="请选择">
              <el-option
                  v-for="item in this.publicOption.CollegeOptions"
                  :key="item.id"
                  :label="item.collegeName"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div>
          <el-button @click="DialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitStudent">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {addTeacher, getNewTeacherId} from "../../../../../axios/adminView/infoManagement/TeacherInfo";
import {mapState} from "vuex";
import {fFRoleListByMatches} from "../../../../../axios/adminView/RoleManagement/RoleInfo";

export default {
  name: "BaseAddTeacher",
  props:['getTeacherInfo','currentPage','pageSize'],
  data(){
    return {
      TeacherFormNew:{
        id:'',
        teacherName:'',
        password:'',
        collegeId:'',
        roleId:'',
        isDeleted:0,
      },
      roles:[
      ],
      DialogFormVisible:false,
      //表格宽度设置
      formLabelWidth: '120px',
    }
  },
  computed:{
    ...mapState('teacherInfo',['publicOption']),

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
    addTeacherDialog(){
      this.DialogFormVisible = true
    },

    getNewTeacherIdEvent(){
      getNewTeacherId().then(res=>{
        let result = res.data;
        if (result.resultCode){
          this.$message({
            type:'success',
            message:'获取成功'
          })
          let newStudentIdStr = JSON.parse(result.data);
          this.TeacherFormNew.id = newStudentIdStr['key1']
        }else{
          this.$message({
            type:'error',
            message:result.message
          })
        }
      },error=>{
        this.$message({
          type:'error',
          message:error.message
        })
      })
    },

    getRoleTeacherInfo(){
      fFRoleListByMatches({
        matches:2
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.roles = res.data
        }else{
          this.$message({
            type:'error',
            message:res.message
          })
        }
      })
    },

    submitStudent(){
      addTeacher(this.TeacherFormNew).then(res=>{
        let result = res.data;
        if (result.resultCode===200){
          this.$message({
            type:'success',
            message:'获取成功'
          })
          this.getTeacherInfo(this.currentPage,this.pageSize,this.collegeId)
          this.closeDialog()
        }else{
          this.$message({
            type:'error',
            message: result.message
          })
        }
      })
    },

    closeDialog(){
      this.TeacherFormNew = {
        id:'',
        teacherName:'',
        password:'',
        collegeId:'',
        roleId:'',
        isDeleted:0,
      }
      this.DialogFormVisible=false
    }
  },
  created(){
    this.getRoleTeacherInfo()
  }
}
</script>

<style scoped>
.el-input{
  width: 300px;
}
</style>