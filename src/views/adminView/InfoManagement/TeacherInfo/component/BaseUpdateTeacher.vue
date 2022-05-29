<template>
  <div>
    <el-button
        size="mini"
        @click="handleEdit(index,row)">Edit</el-button>
    <div class="myDialogStyle">
      <el-dialog title="添加专业信息" :visible.sync="DialogFormVisible">
        <el-form :model="TeacherFormNew">
          <el-form-item label="学号" :label-width="formLabelWidth">
            <el-input v-model="TeacherFormNew.id"/>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="TeacherFormNew.teacherName"/>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="TeacherFormNew.password" show-password/>
          </el-form-item>
<!--          <el-form-item label="角色" :label-width="formLabelWidth">-->
<!--            <el-select v-model="TeacherFormNew.roleId" clearable placeholder="请选择">-->
<!--              <el-option-->
<!--                  v-for="item in roles"-->
<!--                  :key="item.id"-->
<!--                  :label="item.name"-->
<!--                  :value="item.id">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item label="学院" :label-width="formLabelWidth">
            <el-select v-model="collegeId" clearable placeholder="请选择">
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
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="submitStudent">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {updateTeacher} from "../../../../../axios/adminView/infoManagement/TeacherInfo";
import {fFRoleListByMatches} from "../../../../../axios/adminView/RoleManagement/RoleInfo";

export default {
  name: "BaseUpdateTeacher",
  props:['index','row','getTeacherInfo','currentPage','pageSize'],
  data(){
    return {
      TeacherFormNew:{
        id:'',
        teacherName:'',
        password:'',
        collegeId:'',
        isDeleted:0,
      },
      TeacherFormOld:[],
      submitFrom:[],
      roles:[],
      DialogFormVisible:false,
      //表格宽度设置
      formLabelWidth: '120px',

    }
  },
  computed:{
    ...mapState('teacherInfo',['publicOption']),

    collegeId: {
      get() {
        return this.TeacherFormNew.collegeId
      },
      set(value) {
        this.TeacherFormNew.collegeId = value
      }
    },
  },
  methods:{
    handleEdit(index,row){
      this.DialogFormVisible = true
      this.TeacherFormOld = row
      this.TeacherFormNew.id = row.id
      this.TeacherFormNew.password = row.password
      this.TeacherFormNew.roleId = row.roleId
      this.TeacherFormNew.collegeId = row.collegeId
      this.TeacherFormNew.teacherName = row.teacherName
      this.DialogFormVisible = true
    },

    submitStudent(){
      this.submitFrom = this.TeacherFormNew
      let isUpdate = false
      let TeacherFormOld = this.TeacherFormOld
      let TeacherFormNew = this.TeacherFormNew
      if(TeacherFormNew.id !== TeacherFormOld.id ||
          TeacherFormNew.password !== TeacherFormOld.password ||
          TeacherFormNew.roleId !== TeacherFormOld.roleId ||
          TeacherFormNew.collegeId !== TeacherFormOld.collegeId ||
          TeacherFormNew.teacherName !== TeacherFormOld.teacherName
      ){
        isUpdate = true
      }else{
        isUpdate = false
      }
      let teacher = this.TeacherFormNew
      if (isUpdate){
        updateTeacher(teacher).then(res=>{
          let result = res.data
          if (result.resultCode === 200){
            this.$message({
              type:'success',
              message:result.message
            })
            this.getTeacherInfo(this.currentPage,this.pageSize)
          }else{
            this.$message({
              type:'error',
              message:result.message
            })
          }
        })
      }else{
        this.$message({
          type:'warning',
          message:'信息尚未更改'
        })
      }
    },

    getRoleTeacherInfo(){
      fFRoleListByMatches({
        matches:2
      }).then(res=>{
        let result = res.data
        if (result.resultCode){
          this.roles = result.data
        }else{
          this.$message({
            type:'error',
            message:result.message
          })
        }
      })
    },

    closeDialog(){
      this.DialogFormVisible = false
      this.TeacherFormNew={
        id:'',
        teacherName:'',
        password:'',
        collegeId:'',
        isDeleted:0,
      }
    }
  },
  created() {
    this.getRoleTeacherInfo()
  }
}
</script>

<style scoped>
.myDialogStyle{
  text-align: left;
}
.el-input{
  width: 300px;
}
</style>