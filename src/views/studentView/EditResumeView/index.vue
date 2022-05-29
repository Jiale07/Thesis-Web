<template>
  <div :style="{minHeight:asideHeight+'px'}">
    <div class="myContainer">
      <div class="myContent header">
        <el-page-header @back="goBack" content="详情页面" class="header">
        </el-page-header>
      </div>
    </div>

    <div class="myContainer">
      <div class="myContent main">
        <div class="showDiv">
          <div class="itemBox">
            <div class="item">
              <div class="label">
                <span class="labelText">学生名称</span>
              </div>
              <span class="colon">:</span>
              <span>jiale</span>
            </div>
            <div class="item">
              <div class="label">
                <span class="labelText">学号</span>
              </div>
              <span class="colon">:</span>
              <span>111111111111</span>
            </div>
            <div class="item">
              <div class="label">
                <span class="labelText">专业</span>
              </div>
              <span class="colon">:</span>
              <span>jiale</span>
            </div>
            <div class="item">
              <div class="label">
                <span class="labelText">班级</span>
              </div>
              <span class="colon">:</span>
              <span>jiale</span>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "StudentEditResume",
  data(){
    return {
      asideHeight:'',
    }
  },
  methods:{
    goBack(){

    }
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
}
</script>

<style scoped lang="less">

.myContainer{
  margin: 0 auto;
  width: 1280px;

  .myContent{
    background-color: #ffffff;
    border-radius: 15px;
    padding: 10px;
  }

  .header{

  }

  .main{
    display: flex;
    justify-content: center;

    .showDiv{
      width: 720px;

      .itemBox{


        .item{
          display: flex;

          .label{
            width: 100px;
            text-align: justify;

            .labelText{

            }
          }

          .label::after{
            content: '';
            display: inline-block;
            padding-left: 100%;
          }

          .colon{
            padding: 0 10px;
          }
        }
      }
    }
  }
}


.myContainer:nth-child(n):not(:last-child){
  margin-bottom: 10px;
}
</style>