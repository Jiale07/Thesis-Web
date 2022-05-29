<template>
  <div>
    <el-tabs type="border-card" lazy>
      <el-tab-pane label="毕业设计导师管理">
        <TutorMainComponent></TutorMainComponent>
      </el-tab-pane>
      <el-tab-pane label="添加毕业设计导师">
        <AddTutorComponent></AddTutorComponent>
      </el-tab-pane>
    </el-tabs>


  </div>

</template>

<script>
import TutorMainComponent from "./component/TutorsMainComponent"
import AddTutorComponent from "./component/AddTutorComponent"

export default {
  name: "TutorsView",
  data() {
    return {

    }
  },
  components:{
    TutorMainComponent,
    AddTutorComponent
  }

}
</script>

<style scoped>


</style>