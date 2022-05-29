<template>
  <div class="myContainer" :style="{minHeight:asideHeight+'px'}">
    <div class="myContainer">
      <div class="myContent header">
        <el-page-header @back="goBack" content="密码更改" class="header">
        </el-page-header>
      </div>
    </div>
    <div class="myContent">
      <div class="ruleFormBox" v-if="result.type===''">
        <div class="checkOldPasswordBox" v-if="!isCorrectByOldPassword">
          <div>
            <h4>
              密码验证
            </h4>
          </div>
          <div class="fromBox">
            <el-form status-icon label-width="100px" class="demo-ruleForm">
              <el-form-item label="请输入旧密码" prop="password">
                <el-input type="password" v-model="oldPassword" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="checkButtonBox">
            <el-button size="mini">取消</el-button>
            <el-button type="primary" size="mini" @click="checkOldPassword(userId)">提交</el-button>
          </div>
        </div>
        <div class="checkOldPasswordBox" v-if="isCorrectByOldPassword">
          <div>
            <h4>
              请输入新的密码
            </h4>
          </div>
          <div class="fromBox">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="新密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPassword">
                <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div v-if="!(result.type==='')">
        <EditPasswordResultView
            :message="result.message"
            :resultType="result.type"
            :title="result.title"
        ></EditPasswordResultView>
      </div>
    </div>
  </div>
</template>

<script>
import EditPasswordResultView from "../EditPasswordResultView"
import {postCheckOldPassword, postUpdatePassword} from "../../../axios/studentView/account/editPassword";
import {mapState} from "vuex";

export default {
  name: "EditPassword",
  data(){
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      asideHeight:"",
      userId:'',
      oldPassword:'',
      isCorrectByOldPassword:false,

      ruleForm:{
        password:'',
        checkPassword:'',
      },

      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      },


      isShowResult:true,

      result:{
        type:'',
        message:'',
        title:''
      }
    }
  },
  computed:{
    ...mapState("loginAbout",['user'])
  },
  components:{
    EditPasswordResultView
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          postUpdatePassword({
            id:this.userId,
            password:this.ruleForm.checkPassword
          }).then(result=>{
            let res = result.data
            if (res.resultCode===200){
              this.$message({
                type:'success',
                message:res.message
              })
              this.result.message=res.message
              this.result.type='success'
              this.result.title='密码更改成功'
            }else{
              this.result.message=res.message
              this.result.type='error'
              this.result.title='密码更改失败'
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    checkOldPassword(userId){
      postCheckOldPassword({
        userId:userId,
        password:this.oldPassword,
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.$message({
            type:'success',
            message:res.message
          })
          this.isCorrectByOldPassword = true
        }else{
          this.$message({
            type:'error',
            message:res.message
          })
        }
      })
    },
  },

  mounted() {
    //获取窗口高度
    this.asideHeight = document.documentElement.clientHeight;
    window.onresize = () => {
      return (() => {
        this.asideHeight = document.documentElement.clientHeight;
      })()
    }
  },

  created() {
    this.userId = this.user.userId
  }
}
</script>

<style scoped lang="less">

.myContainer {
  margin: 0 auto;
  width: 1280px;

  .myContent {
    background-color: #ffffff;
    border-radius: 15px;
    padding: 10px;
  }
}

.myContainer:nth-child(n):not(:last-child){
  margin-bottom: 10px;
}

.checkOldPasswordBox{
  margin-top: 100px;

  .fromBox{
    margin-top: 20px;
  }

  .checkButtonBox{
    display: flex;
    justify-content: center;
  }
}

.title{
  margin: 10px 0;
}

.ruleFormBox{
  width: 400px;
  margin: 0 auto;
}

</style>