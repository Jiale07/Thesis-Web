<template>
  <div class="login">
    <div class="formBox">
      <div class="titleBox">
        <span class="title">欢迎登录</span>
      </div>
      <el-form
          ref="ruleForm"
          status-icon
          required
          label-width="100px"
          class="demo-ruleForm"
          :model="ruleForm"
          :rules="rules"
      >
        <el-form-item label="账号" prop="id">
          <el-input type="id" v-model="ruleForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.number="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <!--        <el-form-item prop="verifyStatus">-->
        <!--          <SlidingValidationComponent-->
        <!--              @successFun="onSuccessFun"-->
        <!--          ></SlidingValidationComponent>-->
        <!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {login} from '@/axios/loginApi'
import {mapMutations, mapState} from 'vuex'
// TODO 暂时关闭登录时的人机测试
// import SlidingValidationComponent from './SlidingValidationComponent'

export default {
  name: "Login",
  data() {
    let checkId = (rule, value, callback) => {
      if (!value) {
        callback(new Error('账号不能为空'));
      }
      setTimeout(() => {
        callback();
      }, 500);
    };
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.toString().length < 6) {
        callback(new Error('密码长度不能小于6位!'));
      } else {
        setTimeout(() => {
          callback();
        }, 500);
      }
    };
    let validateVerifyStatus = (rule, value, callback) => {
      if (value === false) {
        callback(new Error('尚未完成滑动验证'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        id: '10001',
        password: 123456,
        verifyStatus: true,
      },
      // ruleForm: {
      //   id: '',
      //   password: '',
      // },

      rules: {
        id: [
          {validator: checkId, trigger: 'blur'},
        ],
        password: [
          {validator: validatePassword, trigger: 'blur'},
          {type: 'number', message: '密码必须为数字值'}
        ],
        verifyStatus: [
          {
            validator: validateVerifyStatus, trigger: 'blur'
          }
        ]
      },

    }
  },
  // components:{
  //   SlidingValidationComponent
  // },
  computed: {
    ...mapState('loginAbout', ['user', 'roleConfigList'])
  },
  methods: {
    onSuccessFun(e) {
      this.ruleForm.verifyStatus = e
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginAxios(this.ruleForm);
        } else {
          return false;
        }
      });
    },

    ...mapMutations('loginAbout', {setUser: 'setUser', setToken: 'setToken'}),
    loginAxios(resetForm) {
      login(resetForm).then(result => {
        let res = result.data
        if (res.resultCode === 200) {
          this.setUser(res.data)
          this.setToken(res.token)
          let roleIdList = this.user.roleIdList
          let roleConfigList = this.roleConfigList
          try {
            roleConfigList.forEach((configListItem) => {
              roleIdList.forEach((roleIdListItem) => {
                if (configListItem.code.toString().substring(0, 1) === roleIdListItem.toString().substring(0, 1)) {
                  throw new Error(configListItem.roleName)
                }
              })
            })
          } catch (e) {
            this.$router.push('/' + e.message)
          }
          this.$message({
            type: 'success',
            message: res.message
          });
        }
        if (res.resultCode === 500) {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      });
    },
  },
  created() {
  }
}
</script>

<style scoped lang="less">
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(#2ca9e1, #007bbb);

  .formBox {
    position: relative;
    top: 300px;
    left: 50%;
    border: 1px solid #a1a1a1;
    border-radius: 15px;
    padding: 20px;
    width: 400px;
    background: #fff;

    .titleBox {
      width: 100%;
      margin: 20px;

      .title {

        font-size: 30px;
        font-weight: 500;
      }
    }

  }
}
</style>
