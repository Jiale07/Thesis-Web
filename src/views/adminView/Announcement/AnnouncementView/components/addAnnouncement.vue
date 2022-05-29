<template>
  <div>
    <el-button type="primary" @click="toCreateAnnouncement">
      <i class="el-icon-plus"></i>
      创建公告</el-button>
    <el-dialog title="发布公告" :visible.sync="dialogFormVisible" width="800px">
      <div class="stepsBox">
        <el-steps :active="active" finish-status="success">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3"></el-step>
        </el-steps>
      </div>
      <div v-if="active===0">
        <el-form ref="form" :rules="rules1" :model="form" label-width="120px">
          <el-form-item label="公告名称"  prop="announcementName">
            <el-input
                type="text"
                placeholder="请输入内容"
                v-model="form.announcementName"
                maxlength="30"
                show-word-limit
            >
            </el-input>
          </el-form-item>
          <el-form-item label="公告类型" prop="categoryId">
            <el-select v-model="form.categoryId" placeholder="请选择">
              <el-option
                  v-for="item in ACList"
                  :key="item.id"
                  :label="item.categoryName"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="公告内容" prop="announcementContent">
            <div>
              <quill-editor
                  v-model="form.announcementContent"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                  @change="onEditorChange($event)">
              </quill-editor>
              <!-- 富文本内容 -->
              <div class="text"></div>
            </div>
          </el-form-item>

        </el-form>
        <div>
          <el-button @click="cancel">取 消</el-button>
          <el-button @click="next('form')">下一步</el-button>
        </div>
      </div>
      <div v-if="active===1">
        <el-form ref="form2" :rules="rules2" :model="form2" label-width="120px">
          <el-form-item label="对角色可见"  prop="roleList">
            <el-transfer
                filterable
                :filter-method="filterMethod"
                filter-placeholder="请输入角色名称"
                :titles="['未选中','已选中']"
                v-model="form2.roleList"
                :data="roleData">
            </el-transfer>
          </el-form-item>
        </el-form>
        <div>
          <el-button @click="cancel">取 消</el-button>
          <el-button @click="active--">上一步</el-button>
          <el-button type="primary" @click="next('form2')">下一步</el-button>
        </div>
      </div>
      <div v-if="active===2">
        <div class="previewBox">
          <div>
            <h3>公告属性</h3>
          </div>
          <div>
            <span>公告类型：</span>
            <el-tag>
              <span>{{preview.categoryName}}</span>
            </el-tag>
          </div>
          <div>
            <span>可见角色：</span>
            <el-tag v-for="(item,index,key) in preview.roleList" :key="key">
              <span >{{item}}</span>
            </el-tag>

          </div>
        </div>
        <div>
          <div>
            <h3>预览1</h3>
          </div>
          <div>
            <el-card class="box-card" >
              <div slot="header" class="clearfix">
                <span>公告</span>
                <el-button style="float: right; padding: 3px 0" type="text">更多公告...</el-button>
              </div>
              <div>
                <div class="itemBox">
                  <div class="itemMain">
                    <div class="announcementNameBox">
                      <span class="announcementName">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                    </div>
                  </div>
                  <div class="announcementTimeBox">
                    <span>XX-XX</span>
                  </div>
                </div>
                <div class="itemBox">
                  <div class="itemMain">
                    <div class="announcementNameBox">
                      <span class="announcementName">{{ preview.announcementName }}</span>
                    </div>
                  </div>
                  <div class="announcementTimeBox">
                    <span>{{preview.createTime}}</span>
                  </div>
                </div>
                <div class="itemBox">
                  <div class="itemMain">
                    <div class="announcementNameBox">
                      <span class="announcementName">xx-xx</span>
                    </div>
                  </div>
                  <div class="announcementTimeBox">
                    <span>XX-XX</span>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </div>
        <div>
          <h3>预览2</h3>
        </div>
        <div>
          <div class="announcementDetail">
            <div class="titleBox">
              <span class="title">{{ preview.announcementName }}</span>
            </div>
            <div class="propertyBox">
              <span class="propertyText">撰写人:{{preview.creatorName}}{{"   "}}时间:2022年4月4日</span>
            </div>
            <div>
              <div class="ql-container ql-snow">
                <div class="ql-editor">
                  <div class="details_box"  v-html="preview.announcementContent"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submitFrom(form)">提 交</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getACList, postAddAnnouncement} from "../../../../../axios/adminView/Announcement/Announcement";
import {mapState} from "vuex";
import {getRoleList} from "../../../../../axios/public/RoleAbout";

export default {
  name: "addAnnouncement",
  data(){
    const validateAnnouncementName = (rule,value,callback)=>{
      if(value===null || value ===''){
        callback(new Error("公告类型id不能为空"))
      }else{
        callback()
      }
    }
    const validateCategoryId = (rule,value,callback)=>{
      if(value===null || value ===''){
        callback(new Error("公告类型id不能为空"))
      }else{
        callback()
      }
    }
    const validateTimeArray = (rule,value,callback)=>{
      if(value===null || value ===''){
        callback(new Error("请设定公告有效时间"))
      }else{
        callback()
      }
    }
    const validateAnnouncementContent = (rule,value,callback) => {
      if(value===null || value ===''){
        callback(new Error("公告内容不能为空"))
      }else{
        callback()
      }
    }
    const validateRoleList = (rule,value,callback) => {
      if(value.length<=0){
        callback(new Error("'已选中'列表不能为空"))
      }else{
        callback()
      }
    }
    return {
      form:{
        categoryId:null,
        announcementName:null,
        announcementContent:null,
      },
      rules1:{
        announcementName:[
          {
            validator:validateAnnouncementName,trigger:'blur'
          }
        ],
        categoryId:[
          {
            validator:validateCategoryId,trigger:'blur'
          }
        ],
        timeArray:[
          {
            validator:validateTimeArray,trigger:'blur'
          }
        ],
        announcementContent:[
          {
            validator:validateAnnouncementContent,trigger:'blur'
          }
        ]
      },
      form2:{
        roleList:[]
      },
      rules2:{
        roleList:[
          {
            validator:validateRoleList,trigger:'blur'
          }
        ]
      },

      submitData:{
        categoryId:null,
        creatorId:null,
        announcementName:null,
        announcementContent:null,
        roleList:[]
      },

      dialogFormVisible:false,
      ACList:null,
      active: 0,
      editorOption:{
        modules:{
          toolbar:[
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            ['clean'],
          ]
        }
      },

      roleData: [],
      value: [],
      preview:{
        categoryName:null,
        createTime:null,
        creatorName:null,
        announcementName:null,
        announcementContent:null,
        roleList:[]
      },
      filterMethod(query, item) {
        return item.roleName.indexOf(query) > -1;
      }
    }
  },
  computed:{
    ...mapState('loginAbout',['user','userInfo'])
  },
  methods:{
    next(fromName) {
      this.$refs[fromName].validate((valid)=>{
        if (valid){
          if (this.active<=0) this.active = 0;
          if (this.active++ > 2) this.active = 0;
          if (this.active ===2){
            let date = new Date()
            let month = date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
            let day = date.getDate()<10 ? "0"+date.getDate() : date.getDate();
            this.preview.createTime = month + '-' + day
            this.preview.categoryName = this.categoryFilter(this.form.categoryId)
            this.preview.announcementName = this.form.announcementName
            this.preview.announcementContent = this.form.announcementContent
            let roleList =  this.form2.roleList
            roleList.forEach(e=>{
              this.preview.roleList.push(this.roleFilter(e))
            })
            this.preview.creatorName = this.user.userId
          }
        }
      })
    },
    toCreateAnnouncement(){
      this.dialogFormVisible = true
    },
    submitFrom(){
      let roleList = this.form2.roleList
      let list = []
      for (let i = 0; i <roleList.length; i++) {
        let vote = {};
        vote.roleId = roleList[i];
        list.push(vote);
      }

      let form = {
        categoryId: this.form.categoryId,
        creatorId:this.user.userId,
        announcementName:this.form.announcementName,
        announcementContent:this.form.announcementContent,
        roleList:list
      }
      let formJSON = JSON.stringify(form)

      postAddAnnouncement(formJSON).then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.$message({
            type:'success',
            message:res.message
          })

        }else{
          this.$message({
            type:'error',
            message:res.message
          })
        }
        this.$router.go(0)
      })
    },

    getACListFunc(){
      getACList().then(result=>{
        let res = result.data
        if (res.resultCode===200){
          this.ACList = res.data
        }
      })
    },


    //失去焦点事件
    onEditorBlur(){

    },
    //获得焦点事件
    onEditorFocus(){

    },
    //内容改变事件
    onEditorChange(){

    },

    getRoleListFunc(){
      getRoleList().then(result=>{
        let res = result.data
        if(res.resultCode===200){
          let role = res.data
          role.forEach((item)=>{
            this.roleData.push({
              label: item.roleName,
              key: item.id,
              roleName:item.roleName,
            })
          })
        }
      })
    },
    cancel(){
      let newForm={
        categoryId:null,
        announcementName:null,
        announcementContent:null,
        timeArray:null,
      }
      this.form = newForm
      this.active = 0
      this.dialogFormVisible = false

    },

    categoryFilter(categoryId){
      let acList = this.ACList
      let result = null
      acList.forEach((e)=>{
        if (e.id === categoryId){
          result = e.categoryName
        }
      })
      return result
    },

    roleFilter(roleId){
      let roleList = this.roleData
      let result = null
      roleList.forEach((e)=>{
        if(e.key === roleId){
          result = e.roleName
        }
      })
      return result
    }
  },

  created() {
    this.getACListFunc()
    this.getRoleListFunc()
  }
}
</script>

<style scoped lang="less">


.label{
  margin: 20px 10px;
  width: 100%;

  .labelText{
    margin-right: 10px;
    width: 120px;
    text-align: justify;
  }
  .labelText::after{
    content: '';
    display: inline-block;
    padding-left: 100%;
  }

  .inputBox{
    width: 100%;
  }
}

.across{
  display: flex;
  /*justify-content: start;*/
}


.box-card{
  width: 480px;

  .itemBox{
    margin: 5px;
    display: flex;
    justify-content: space-between;

    .itemMain{
      width: 390px;
      overflow: hidden;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      display: -webkit-box;
    }

    .announcementName{

    }

    .announcementName:hover{
      cursor:pointer;
      color: #007bbb;
    }

    .announcementTimeBox{
      display: flex;
      justify-content: right;
      width: 60px;
      color: #8c939d;
    }
  }
}

.announcementDetail{
  box-shadow: 0 0 10px;
  padding: 10px;

  .titleBox{
    text-align: center;

    .title{
      font-size: 20px;
      font-weight: 600;
    }
  }

  .propertyBox{
    text-align: center;

    .propertyText{
      color: #8c939d;
    }
  }

  //去除默认的边框
  .ql-snow{
    border: 0;
  }
}

.stepsBox{
  margin-bottom: 30px;
}

.previewBox{

}


</style>