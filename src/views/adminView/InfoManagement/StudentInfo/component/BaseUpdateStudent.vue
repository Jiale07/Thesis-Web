<template>
  <div>
    <el-button
        size="mini"
        @click="handleEdit(index,row)">更改</el-button>
    <div class="myDialogStyle">
      <el-dialog title="更改学生账号信息" :visible.sync="DialogFormVisible">
        <el-form :model="StudentFormNew">
          <el-form-item label="学号" :label-width="formLabelWidth">
            <el-input v-model="StudentFormNew.id"/>
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
                  :label="item.majorName"
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
            <el-input v-model="classId"/>
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
import {mapState} from "vuex";
import {getMajorList} from "../../../../../axios/adminView/public";
import {updateStudent} from "../../../../../axios/adminView/infoManagement/StudentInfo";

export default {
  name: "BaseUpdateStudent",
  props:['index','row','getAccountList','currentPage','pageSize'],
  data(){
    return {
      // 显示的学生信息内容
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
      // 存储旧的学生信息
      StudentFromOld:[],
      // 最终提交的学生信息
      submitFrom:{
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

      rules:{
        id:[
          {
            required:true,
            message:'请输入学号',
            trigger:'blur',
          },{
            min:12,
            max:12,
            message: '序号长度必须为12为数字',trigger: 'blur',
          }
        ],
        name:[
          {
            required:true,
            message:'请输入学生姓名',
            trigger:'blur',
          },{
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
        collegeIdL:[
          {
            required:true,
            message:'请输选择学院，不能为空',
            trigger:'blur',
          }
        ]
      }
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
      },error=>{
        this.$message({
          type:'error',
          message:error.data.message
        })
      })
    },
    // 更新对话框显示控制+数据接受
    handleEdit(index,row){
      this.StudentFromOld = row
      this.StudentFormNew.id = row.id
      this.StudentFormNew.studentName = row.studentName
      this.collegeId = row.collegeId
      this.majorId = row.majorId
      this.classId = row.classId
      this.StudentFormNew.isDeleted = row.isDeleted
      this.StudentFormNew.password = row.password
      this.StudentFormNew.roleId = row.roleId
      this.DialogFormVisible = true
    },
    // 更新提交
    submitStudent(){
      this.StudentFormNew.collegeId = this.collegeId
      this.StudentFormNew.majorId = this.majorId
      this.StudentFormNew.classId = this.classId
      let StudentFromOld = this.StudentFromOld
      let StudentFormNew = this.StudentFormNew
      let is_updated = false

      if (StudentFromOld.studentName !== StudentFormNew.studentName ){
        this.submitFrom.studentName = StudentFormNew.studentName
        is_updated = true
      }else{
        this.submitFrom.studentName = StudentFromOld.studentName
      }
      if (StudentFromOld.collegeId !== this.collegeId){
        this.submitFrom.id = this.collegeId
        is_updated = true
      }else{
        this.submitFrom.id = StudentFromOld.collegeId
      }
      if (StudentFromOld.majorId !== this.majorId){
        this.submitFrom.majorId = this.majorId
        is_updated = true
      }else{
        this.submitFrom.majorId = StudentFromOld.majorId
      }
      if (StudentFromOld.classId !== this.classId){
        this.submitFrom.classId = this.classId
        is_updated = true
      }else{
        this.submitFrom.classId = StudentFromOld.classId
      }
      if (StudentFromOld.isDeleted !== this.StudentFormNew.isDeleted){
        this.submitFrom.isDeleted = this.StudentFormNew.isDeleted
        is_updated = true
      }else{
        this.submitFrom.isDeleted = StudentFromOld.isDeleted
      }
      if (StudentFromOld.password !== this.StudentFormNew.password){
        this.submitFrom.password = this.StudentFormNew.password
        is_updated = true
      }else{
        this.submitFrom.password = StudentFromOld.password
      }
      if (StudentFromOld.roleId !== this.StudentFormNew.roleId){
        this.submitFrom.roleId = this.StudentFormNew.roleId
        is_updated = true
      }else{
        this.submitFrom.roleId = StudentFromOld.roleId
      }

      if(is_updated){
        if (StudentFromOld.id !== StudentFormNew.id){
          this.submitFrom.id = StudentFormNew.id
        }else{
          this.submitFrom.id = StudentFormNew.id
        }
        let student = this.submitFrom
        updateStudent(student).then(res=>{
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
      }else{
        this.$message({
          type:'error',
          message:'信息没有发生改变，不能进行更改'
        })
      }
    }
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