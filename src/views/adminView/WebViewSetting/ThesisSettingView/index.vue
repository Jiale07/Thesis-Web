<template>
  <div>
    <div class="myContainer myHeader">
      <el-page-header @back="goBack" content="开题报告提交页面——页面设置">
      </el-page-header>
    </div>
    <div class="myContainer">
      <div>
        <addThesisInputSetting
            :tableDataLength="tableDataLength"
          :getThesisInputSettingList="getThesisInputSettingList"
        ></addThesisInputSetting>
      </div>
      <el-table
          :data="tableData"
          v-loading="loading"
          style="width: 100%"
          :empty-text="inputEmpty">
        <el-table-column
            label="序号"
            prop="serialNumber"
            width="50px">
        </el-table-column>
        <el-table-column
            label="输入框标题"
            prop="titleName"
            width="420px">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div class="buttonBox">
              <updateThesisInputSetting
                  :row="scope.row"
                  :getThesisInputSettingList="getThesisInputSettingList"
              ></updateThesisInputSetting>
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import updateThesisInputSetting from './components/updateThesisInputSetting'
import addThesisInputSetting from './components/addThesisInputSetting'
import {
  deletedThesisInputSetting,
  getThesisInputSettingList
} from "../../../../axios/adminView/WebViewSetting/ThesisSettingView";
export default {
  name: "ThesisSettingView",
  data(){
    return{
      inputEmpty:'暂无数据',
      tableData:[],
      loading:false,

      tableDataLength:0
    }
  },
  components:{
    updateThesisInputSetting,
    addThesisInputSetting
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },

    getThesisInputSettingList(){
      getThesisInputSettingList().then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.tableDataLength = res.data.length+1
          this.tableData = res.data
        }else{
          this.inputEmpty = res.message
        }
      })
    },

    handleDelete(GDTISId){
      deletedThesisInputSetting({GDTISId}).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.$message({
            type:'success',
            message:res.message
          })
          this.getThesisInputSettingList()
        }else{
          this.$message({
            type:'error',
            message:res.message
          })
        }
      })
    }
  },

  created() {
    this.getThesisInputSettingList()
  }
}
</script>

<style scoped lang="less">
.myContainer {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #ffffff;


  .buttonBox{
    width: 120px;
    display: flex;
    justify-content: space-between;
  }

}
</style>