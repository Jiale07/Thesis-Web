<template>
  <div class="result">
    <el-row v-if="resultType==='success'" type="flex" justify="center" align="middle">
      <el-col :sm="24" :lg="6">
        <el-result icon="success" :title="title" :subTitle="message">
          <template slot="extra">
            <el-button type="primary" size="medium" @click="back()">返回</el-button>
          </template>
        </el-result>
      </el-col>
    </el-row>
    <el-row v-if="resultType==='error'" type="flex" justify="center" align="middle">
      <el-col :sm="24" :lg="6">
        <el-result icon="error" :title="title" :subTitle="message">
          <template slot="extra">
            <el-button type="primary" size="medium">返回</el-button>
          </template>
        </el-result>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "EditPasswordResultView",
  props:['message','resultType','title'],
  data(){
    return {
    }
  },
  methods:{
    back(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.result{
  margin: 0 auto;
}
</style>