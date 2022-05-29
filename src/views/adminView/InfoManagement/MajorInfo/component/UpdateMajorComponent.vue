<template>
  <div class="updateComponent">
    <el-button
        size="mini"
        @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
    <el-dialog title="更改专业信息" :visible.sync="updateDialogFormVisible" align="left">
      <el-form :model="newMajor">
        <el-form-item label="学院编号" :label-width="formLabelWidth">
          <el-select v-model="newMajor.collegeId" clearable placeholder="请选择">
            <el-option
                v-for="item in collegeList"
                :key="item.id"
                :label="item.collegeName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业编号" :label-width="formLabelWidth">
          <el-input v-model="newMajor.id" :placeholder="oldMajor.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专业名称" :label-width="formLabelWidth">
          <el-input v-model="newMajor.majorName" :placeholder="oldMajor.majorName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="updateDialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateMajor">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {updateMajor} from "../../../../../axios/adminView/infoManagement/MajorInfo";
import {mapState} from "vuex";

export default {
  name: "UpdateMajorComponent",
  props:['scope'],
  data(){
    return{
      newMajor:{
        id:'',
        collegeId:null,
        majorName:null,
        oldId:null,
        isDeleted:0 //默认值
      },
      oldMajor:{},

      //表格宽度设置
      formLabelWidth: '120px',

      updateDialogFormVisible:false
    }
  },
  computed:{
    ...mapState('majorInfoAbout',['collegeList'])
  },
  methods:{
    handleEdit(index, row) {
      this.updateDialogFormVisible = true;
      this.newMajor.id = row.id
      this.newMajor.collegeId = row.collegeId
      this.newMajor.oldId = row.id
      this.oldMajor = row
    },

    //更改该专业信息
    updateMajor(){
      updateMajor(this.newMajor).then(res=>{
        this.$message({
          type:'success',
          message:res.data.message
        });
        this.updateDialogFormVisible = false
        this.$router.go(0)
      })
    },
  }
}
</script>

<style scoped lang="less">
.updateComponent{
  margin-right: 10px;
}
</style>