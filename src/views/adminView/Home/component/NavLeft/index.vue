<template>
  <div>
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        router
        >
      <el-submenu v-for="(item,key) in menuList" :index="item.id" :key="key" >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.text}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
              v-for="(childrenItem,key) in item.childrenList"
              :key="key"
              :index="childrenItem.path"
              :disabled="childrenItem.isDisabled"
          >
            <i :class="childrenItem.icon"></i>
            <span>{{childrenItem.text}}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "NavLeft",
  data(){
    return{
      menuList:[
        {
          id:'1',
          text:'信息管理',
          icon:'el-icon-user',
          childrenList:[
            {
              id:'1-1',
              text:'学生账号管理',
              path:'/adminRouter/studentInfo',
              icon:'el-icon-user',
              isDisabled:false
            },{
              id:'1-2',
              text:'教师账号管理',
              path:'/adminRouter/teacherInfo',
              icon:'el-icon-user',
              isDisabled:false
            },{
              id:'1-3',
              text: '学院信息',
              path: '/adminRouter/collegeInfo',
              isDisabled:false
            },{
              id:'1-4',
              text: '专业信息',
              path:'/adminRouter/majorInfo',
              isDisabled:false
            },
          ]
        },{
          id:'2',
          text:'公告',
          icon:'el-icon-message',
          childrenList:[
            {
              id:'2-1',
              text:'公告管理',
              isDisabled: false,
              path:'/admin/Announcement'
            },{
              id: '2-2',
              text:'公告分类管理',
              isDisabled: false,
              path:'/admin/announcementCategory'
            }
          ]
        },{
          id:'3',
          text: '权限管理',
          icon: 'el-icon-message',
          childrenList: [
            {
              id:'3-1',
              text:'角色管理',
              path: '/role'
            },{
              id:'3-2',
              text:'权限信息管理',
              path:'/permission',
            }
          ]
        },{
          id:'4',
          text:'毕业事务',
          icon: 'el-icon-message',
          childrenList: [
            {
              id: '4-1',
              text:'毕业论文导师管理',
              path:'/tutorView',
            },{
              id: '4-2',
              text:'毕业论文题目管理',
              isDisabled: true,
              path: ''
            },{
              id: '4-3',
              text:'毕业论文文件管理',
              isDisabled: true,
              path:'',
            },{
              id: '4-4',
              text:'毕业论文类型管理',
              path:'/topicCategory',
            }
          ]
        },{
          id:'5',
          text: '用户页面设置',
          icon:'el-icon-setting',
          childrenList: [
            {
              id: '5-1',
              text:'审核结果类型设置',
              path:'/admin/auditStatusCategorySettingView'
            },{
              id: '5-2',
              text:'开题报告提交页面',
              path:'/admin/thesisProposalSetting'
            },{
              id: '5-3',
              text:'毕业设计论文页面设置',
              path:'/admin/thesisSettingView',
            }
          ]
        },{
          id: '6',
          text: '审批流设置',
          icon: 'el-icon-setting',
          childrenList: [
            {
              id: '6-1',
              text: '开题报告审批流程设置',
              path: '/admin/approvalProcessSetting'
            }
          ]
        }
      ]
    }
  },
  methods:{
    handleOpen(){

    },
    handleClose(){

    }
  },
}
</script>

<style scoped>

</style>