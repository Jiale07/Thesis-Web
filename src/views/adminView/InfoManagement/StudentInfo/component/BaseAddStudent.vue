<template>
  <div>
    <div>
      <el-button @click="addStudentDialog" type="primary">
        <i class="el-icon-plus"></i>
        添加
      </el-button>
    </div>
    <div>
      <el-dialog title="添加专业信息" :visible.sync="DialogFormVisible" @close="closeDialog">
        <el-form :model="StudentFormNew">
          <el-form-item label="学号" :label-width="formLabelWidth">
            <el-input v-model="StudentFormNew.id" :disabled="false"/>
            <el-button @click="getNewStudentIdEvent">获取新的id</el-button>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="StudentFormNew.studentName"/>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="StudentFormNew.password" show-password/>
          </el-form-item>
          <el-form-item label="角色" :label-width="formLabelWidth">
            <el-select v-model="StudentFormNew.roleId" clearable placeholder="请选择">
              <el-option
                  v-for="item in this.roleOptions"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
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
          <el-form-item label="专业" :label-width="formLabelWidth">
            <el-select v-model="majorId" clearable placeholder="请选择">
              <el-option
                  v-for="item in this.studentAdd.option.MajorOptions"
                  :key="item.id"
                  :label="item.majorName"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级" :label-width="formLabelWidth">
            <el-input-number v-model="classId" :min="1" :max="99" label="描述文字"></el-input-number>
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
import {getMajorList} from "@/axios/adminView/public";
import {addStudent, getNewStudentId} from "@/axios/adminView/infoManagement/StudentInfo";

export default {
  name: "BaseAddStudent",
  props:['getAccountList','currentPage','pageSize'],
  data(){
    return{
      StudentFormNew:{
        id:'',
        studentName:'',
        collegeId:'',
        majorId:'',
        classId:'',
        isDeleted:0,
        password:'',
        roleId:'',
      },
      DialogFormVisible:false,
      //表格宽度设置
      formLabelWidth: '120px',
    }
  },
  computed:{
    ...mapState('studentInfo',['studentAdd','publicOption','roleOptions']),
    // eslint-disable-next-line vue/no-dupe-keys
    collegeId: {
      get() {
        return this.StudentFormNew.collegeId
      },
      set(value) {
        this.StudentFormNew.collegeId = value
        this.getMajorInfo(value)
      }
    },
    majorId:{
      get() {
        return this.StudentFormNew.majorId
      },
      set(value) {
        this.StudentFormNew.majorId = value
      }
    },
    classId:{
      get() {
        return this.StudentFormNew.classId
      },
      set(value) {
        this.StudentFormNew.classId = value
      }
    }
  },
  methods:{
    // 获取专业信息列表
    getMajorInfo(collegeId){
      getMajorList({
        collegeId
      }).then(res=>{
        if(res.data.resultCode ===200){
          this.studentAdd.option.MajorOptions= res.data.data
        }else{
          this.$message({
            type:'error',
            message:'没有找到更多信息'
          })
        }
      })
    },

    getNewStudentIdEvent(){
      getNewStudentId({
        amount:''
      }).then(res=>{
        let newStudentIdStr = JSON.parse(res.data.data);
        this.StudentFormNew.id = newStudentIdStr['key1']
      })
    },



    addStudentDialog(){
      this.DialogFormVisible = true;

    },

    submitStudent(){
      let student = this.StudentFormNew
      addStudent(student).then(res=>{
        let result = res.data
        if (result.resultCode===200){
          this.$message({
            type:'success',
            message:result.message
          })
          this.getAccountList(this.currentPage,this.pageSize)
          this.DialogFormVisible = false
        }else{
          this.$message({
            type:'error',
            message:result.message
          })
        }
      })
    },

    closeDialog(){
      this.StudentFormNew={
        id:'',
        studentName:'',
        collegeId:'',
        majorId:'',
        classId:'',
        isDeleted:0,
        password:'',
        roleId:'',
      }
      this.DialogFormVisible = false
    }
  }
}
</script>

<style scoped>

</style>
