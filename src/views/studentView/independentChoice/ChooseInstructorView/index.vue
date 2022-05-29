<template>
  <div class="myBady" :style="{minHeight:asideHeight+'px'}">
    <div class="myContainer">
      <div class="myContent header">
        <el-page-header @back="goBack" content="学生选题" title="返回首页">
        </el-page-header>
      </div>
      <div class="myContent">
        <div>
          <TheTopicOfMyComponent>
          </TheTopicOfMyComponent>
          <SearchComponent
              :postTopicPage="postTopicPage"
          ></SearchComponent>
        </div>
        <el-divider></el-divider>
        <div class="resultMain">
          <el-table
              :data="tableData"
              :empty-text="emptyText"
              v-loading="loading"
              stripe
              slot="empty"
              style="width: 100%">
            <el-table-column
                prop="topicName"
                label="题目名称"
                width="420">
            </el-table-column>
            <el-table-column
                label="可选被选数量"
                prop="optionalNumber">
            </el-table-column>
            <el-table-column
                label="已经被选数量"
                prop="selectionCount">
            </el-table-column>
            <el-table-column
                label="教师名称">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="点击查看教师简介" placement="top">
                  <span @click="toBrowseTeacherResume(scope.row.teacherId)">
                    {{scope.row.teacherName}}
                  </span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
                label="教师所属学院"
                prop="collegeName">
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div class="buttonBox" v-if="isPassed">
                  <TopicDetailComponent
                      :row="scope.row"
                  >
                  </TopicDetailComponent>
                  <el-button
                      size="mini"
                      type="primary"
                      @click="selectedIt(scope.row)"
                      v-show="selectFunction(scope.row)"
                  >选中</el-button>
                  <el-button
                      v-show="beAlreadySelected(scope.row)"
                      size="mini"
                      type="danger"
                      @click="cancelSelectedFunction(scope.row)"
                  >取消</el-button>
                  <el-button
                      size="mini"
                      disabled
                      v-show="beAlreadyFull(scope.row)"
                  >已满</el-button>
                  <el-button
                      size="mini"
                      type="warning"
                      @click="changeSelectedFunction(topicSelectedStateInfo,scope.row)"
                      v-show="beChangeSelected(scope.row)"
                  >改选</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="pageSizes"
              :page-size="pageSize"
              :page-count="pageCount"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              class="myPageStyle">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import SearchComponent from './component/SearchComponent'
import TopicDetailComponent from './component/TopicDetailComponent'
import TheTopicOfMyComponent from './component/TheTopicOfMyComponent'
import {
  cancelSelected,
  changeSelected, findCollegeIdByStudentId,
  findStudentSelectedByStudentId,
  findTopicPage,
  selectedTopic
} from "../../../../axios/studentView/independentChoice/choiceInstructorView";
import {mapState} from "vuex";
export default {
  name: "ChooseInstructor",
  data(){
    return {
      selectionLoading:false,
      is_selected:false,
      topicSelectedStateInfo:'',
      asideHeight:'',
      topicSelectedCount:0,
      empty:'没有更多题目信息',
      isPassed:true,
      emptyText:'',
      loading:true
    }
  },
  components:{
    SearchComponent,
    TopicDetailComponent,
    TheTopicOfMyComponent
  },
  computed:{
    ...mapState({pageInfo:'choiceInstructor/pageInfo'}),
    ...mapState('loginAbout',['user']),
    tableData:{
      get(){
        return this.$store.state.choiceInstructor.pageInfo.tableData
      },
      set(value){
        this.$store.commit('choiceInstructor/setTableData',value)
      }
    },
    currentPage:{
      get(){
        return this.$store.state.choiceInstructor.pageInfo.current_page
      },
      set(value){
        this.$store.state.choiceInstructor.pageInfo.current_page = value
      }
    },
    pageSize:{
      get(){
        return this.$store.state.choiceInstructor.pageInfo.page_size
      },
      set(value){
        this.$store.state.choiceInstructor.pageInfo.page_size = value
      }
    },
    pageSizes:{
      get(){
        return this.$store.state.choiceInstructor.pageInfo.page_sizes
      },
      set(value){
        this.$store.state.choiceInstructor.pageInfo.page_sizes = value
      }
    },
    pageCount:{
      get(){
        return this.$store.state.choiceInstructor.pageInfo.page_count
      },
      set(value){
        this.$store.state.choiceInstructor.pageInfo.page_count = value
      }
    },
    total:{
      get(){
        return this.$store.state.choiceInstructor.pageInfo.total
      },
      set(value){
        this.$store.state.choiceInstructor.pageInfo.total = value
      }
    },
    CollegeId:{
      get(){
        return this.$store.state.choiceInstructor.searchData.collegeId
      },
      set(value){
        this.$store.commit('choiceInstructor/setSearchCollegeId',value)
      }
    },
  },
  methods:{
    // 返回首页
    goBack() {
      this.$router.push("/student")
    },
    //切换页面显示条数数量
    handleSizeChange(val) {
      this.$store.state.choiceInstructor.pageInfo.page_size = val
      this.postTopicPage(
          this.currentPage,
          val,
          this.TeacherName,
          this.$store.state.choiceInstructor.searchData.collegeId,
          this.CategoryId,
          this.TopicName,)
    },
    //当前页切换
    handleCurrentChange(val) {
      this.$store.state.choiceInstructor.pageInfo.current_page = val
      this.postTopicPage(
          val,
          this.pageSize,
          this.TeacherName,
          this.$store.state.choiceInstructor.searchData.collegeId,
          this.CategoryId,
          this.TopicName,)
    },

    //获取题目信息及对应教师信息
    postTopicPage(currentPage, pageSize, teacherName,collegeId, categoryId, topicName){
      findTopicPage({
        currentPage,
        pageSize,
        teacherName,
        collegeId,
        categoryId,
        topicName
      }).then(res=>{
        let result = res.data
        if (result.resultCode===200){
          //当前页数
          this.currentPage = result.data.current
          //总条数
          this.total = result.data.total
          //结果集
          this.tableData = result.data.records
          //最大页数
          this.pageCount = result.data.pages
        }else{
          this.emptyText = result.message
          this.tableData = []
        }
        setTimeout(()=>{
          this.loading = false
        },0)
      })
    },
    //选中毕业设计课题
    selectedIt(row){
      selectedTopic({
        studentId:this.user.userId,
        topicId:row.topicId
      }).then(res=>{
        let result = res.data
        if (result.resultCode===200){
          this.$message({
            type:'success',
            message: result.message
          })
          this.$router.go(0)
        }else{
          this.$message({
            type:'error',
            message: result.message
          })
        }
      })
    },
    // 改选毕业设计题目
    changeSelectedFunction(topicSelectedStateInfo,row){
      changeSelected({
        studentId:this.user.userId,
        newTopicId:row.topicId,
      }).then(res=>{
        let result = res.data
        if (result.resultCode===200){
          this.$message({
            type:'success',
            message: result.message
          })
          this.$router.go(0)
        }else{
          this.$message({
            type:'error',
            message: result.message
          })
        }
      })
    },
    // 取消选中已选中的毕业设计题目
    cancelSelectedFunction(row){
      cancelSelected({
        studentId:this.user.userId,
        topicId:row.topicId
      }).then(res=>{
        let result = res.data
        if (result.resultCode===200){
          this.$message({
            type:'success',
            message: result.message
          })
          this.$router.go(0)
        }else{
          this.$message({
            type:'error',
            message: result.message
          })
        }
      })
    },

    // 验证是否选题
    verificationFunction(){
        findStudentSelectedByStudentId({
          studentId:this.user.userId
        }).then(res=>{
          let result = res.data
          if (result.data!==null){
            this.topicSelectedStateInfo = result.data
            if (result.data.isPassed===1 ){
              this.isPassed = false
            }
          }
      })
    },

    selectFunction(row){
      if (this.topicSelectedStateInfo===''){
        if (row.selectionCount>=row.optionalNumber){
          return false
        }
        return true
      }else{
        return false
      }
    },
    beAlreadyFull(row){
      if (row.selectionCount>=row.optionalNumber){
        if(row.topicId === this.topicSelectedStateInfo.topicId){
          return false
        }else{
          return true
        }
      }else{
        return false
      }
    },
    beChangeSelected(row){
      if(this.topicSelectedStateInfo !== ''){
        if (row.topicId === this.topicSelectedStateInfo.topicId){
          return false
        }else{
          return row.selectionCount<row.optionalNumber;
        }
      }else{
        return false
      }
    },
    beAlreadySelected(row){
      return row.topicId === this.topicSelectedStateInfo.topicId;
    },
    //获取学院列表
    postFindCollegeIdByStudentId(){
      findCollegeIdByStudentId({
        studentId:this.user.userId
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.CollegeId = res.data
        }
      })
    },

    toBrowseTeacherResume(teacherId){
      this.$router.push({
        name:'BrowseTeacherResume',
        params:{
          'teacherId':teacherId
        }
      })
    },

    // 初始化
    initialize(){
      this.postFindCollegeIdByStudentId()
      this.verificationFunction()
      const p = new Promise((resolve, reject)=>{
        findCollegeIdByStudentId({
          studentId:this.user.userId
        }).then(result=>{
          let res = result.data
          if (res.resultCode===200){
            this.CollegeId = res.data
            resolve(res.data)
          }else{
            reject(null)
          }
        })
      })
      p.then(value => {
        this.postTopicPage(
            this.currentPage,
            this.pageSize,
            this.TeacherName,
            value,
            this.CategoryId,
            this.TopicName,)
      },error => {
        this.postTopicPage(
            this.currentPage,
            this.pageSize,
            this.TeacherName,
            error,
            this.CategoryId,
            this.TopicName,)
      })

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
  created() {

      this.initialize()
  },

  beforeDestroy(){
    this.$store.commit('choiceInstructor/emptyPageInfo')
  }

}
</script>

<style scoped lang="less">
.myBady{

  .myContainer{
    margin: 0 auto;
    max-width: 1280px;
  }
}

.el-page-header{

}

.myContent{
  padding: 20px 10px;
  background-color: #ffffff;
  border-radius: 15px;

}

.header{
  margin-bottom: 10px;
}

.myPageStyle{
  padding-top: 10px;
  text-align: center;
}

.resultMain{
  .buttonBox{
    display: flex;
    justify-content: space-around;
  }

  .item{
    margin-bottom: 15px;

    .topicItem{
      padding: 5px 0;
      display: flex;
      justify-content: space-between;
    }

    .topicItem:last-of-type{
      padding-bottom: 0px;
    }
  }
}


.textBox{
  padding: 10px;

  .myLabel{
    margin-right: 10px;
  }
}


</style>