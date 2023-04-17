<template>
  <div>
    <div class="myContainer">
      <div>
        <AddAnnouncement></AddAnnouncement>
      </div>
      <div>
        <el-table
            v-loading="loading"
            :data="pageInfo.tableData"
            stripe
            style="width: 100%">
          <el-table-column
              prop="id"
              label="编号"
              width="180">
          </el-table-column>
          <el-table-column
              prop="announcementName"
              label="公告名称"
              >
          </el-table-column>
          <el-table-column
              prop="createTime"
              label="发布时间"
              width="180">
          </el-table-column>
          <el-table-column
              prop="updateTime"
              label="更新时间"
              width="180">
          </el-table-column>
          <el-table-column
              width="220">
            <template slot-scope="scope">
              <div class="buttonBox">
                <el-button @click="toAnnouncementDetail(scope.row)">预览/更改</el-button>
                <el-button
                    type="danger"
                    @click="postDeletedALogicFunc(scope.row.id)">
                  删除
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.current_page"
            :page-sizes="pageInfo.page_sizes"
            :page-size="pageInfo.page_size"
            :page-count="pageInfo.page_count"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
            class="myPageStyle">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  postAnnouncementPage,
  postDeletedAnnouncementLogic
} from "../../../../axios/adminView/Announcement/Announcement";
import AddAnnouncement from './components/addAnnouncement'

export default {
  name: "Announcement",
  data(){
    return {
      pageInfo:{
        //当前页数
        current_page: 1,
        total:0,
        //每页显示条目个数
        page_size:10,
        pager_Count:8,
        //最大页数
        page_count:0,
        page_sizes:[5, 10, 15, 20],
        tableData:null,
      },
      loading:true
    }
  },
  components:{
    AddAnnouncement,
  },
  methods:{
    handleSizeChange(val){
      this.postAnnouncementPageFunc(this.pageInfo.current_page,val)
    },
    handleCurrentChange(val){
      this.postAnnouncementPageFunc(val,this.pageInfo.page_size)
    },
    postAnnouncementPageFunc(currentPage,pageSize){
      postAnnouncementPage({
        currentPage,
        pageSize
      }).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          //当前页数
          this.pageInfo.currentPage = res.data.current
          //总条数
          this.pageInfo.total = res.data.total
          //结果集
          let records = res.data.records
          records.forEach(e=>{
            e.createTime = this.$dayjs(e.createTime).format("YYYY-MM-DD hh:mm:ss")
            e.updateTime = this.$dayjs(e.updateTime).format("YYYY-MM-DD hh:mm:ss")
          })

          this.pageInfo.tableData = records
          //最大页数
          this.pageInfo.pageCount = res.data.pages

        }else if (res.resultCode===204){
          this.$message({
            type:'warning',
            message:res.message
          })
        }else{
          this.$message({
            type:'error',
            message:res.message
          })
        }
        setTimeout(()=>{
          this.loading = false
        },0)
      })
    },

    postDeletedALogicFunc(announcementId){
      postDeletedAnnouncementLogic({
        announcementId
      }).then(result=>{
        let res = result.data
        if (res.resultCode === 200){
          this.$message({
            type:'success',
            message:res.message
          })
          this.$router.go(0)
        }else{
          this.$message({
            type:'error',
            message:res.message
          })
        }
      })
    },


    toAnnouncementDetail(row){
      this.$router.push({
        name:"AnnouncementDetail",
        params:{
          'announcementId':row.id
        }
      })
    }

  },
  created() {
    this.postAnnouncementPageFunc(this.pageInfo.current_page,this.pageInfo.page_size)
  }
}
</script>

<style scoped lang="less">
.myContainer{
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #ffffff;

  .buttonBox{
    display: flex;
    justify-content: space-around;
  }
}

.myPageStyle{
  padding-top: 10px;
  text-align: center;
}
</style>