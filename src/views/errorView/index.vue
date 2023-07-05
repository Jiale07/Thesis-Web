<template>
  <div class="error">
    <div class="container message">
      <el-icon name="error" class="errorIcon"></el-icon>
      <span>{{message.text}}</span>
    </div>
    <div class="container">
      <el-button type="primary" @click="toLoginView()" v-if="message.id===11">点击进入登录页面</el-button>
      <el-button @click="goBack()">返回</el-button>
    </div>

  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Error",
  data(){
    return {
      number:0,
      message:{
        id:'',
        text:''
      },

    }
  },
  computed:{
    ...mapState('errorAbout',['errorMessage']),
    ...mapState('loginAbout',['token']),
  },
  created() {
    this.isLogin()
  },

  methods:{
    toLoginView(){
      this.$router.push('/login')
    },
    goBack(){
      this.$router.go(-2)
    },
    isLogin(){
      if (this.token===null){
        this.message.id = this.errorMessage[0].id
        this.message.text = this.errorMessage[0].text
      }else{
        this.message.id = this.errorMessage[1].id
        this.message.text = this.errorMessage[1].text
      }
    }
  }
}
</script>

<style scoped lang="less">
.error{
  background-color: #ffffff;
  text-align: center;

  .errorIcon{
    font-size: 30px;
    color: red;
  }

  .container{
    margin: 30px 20px;
  }
  .message{


    >span{
      font-size: 26px;
    }
  }
}

</style>
