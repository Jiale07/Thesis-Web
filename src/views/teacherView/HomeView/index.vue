<template>
  <HomeTemplate
      :title="viewTitle"
      :user-info="userInfo"
      :menu="menu"
  >
    <template v-slot:left>
      <div class="container">
        <ClockComponent/>
      </div>
      <div class="container">
        <AnnouncementListComponent></AnnouncementListComponent>
      </div>
    </template>
    <template v-slot:right>
      123
    </template>
  </HomeTemplate>
</template>

<script>
import ClockComponent from '../../../components/Clock'
import {postTeacherInfo} from "@/axios/teacher/TeacherHome";
import AnnouncementListComponent from '../../../components/AnnouncementListComponent'
import {mapState} from "vuex";

import HomeTemplate from "@/components/homeTemplate/index.vue";

export default {
  name: "TeacherHome",
  data() {
    return {
      viewTitle: '教师',
      menu: [
        {
          label: '毕业设计',
          children: [
            {
              label: '毕业设计课题管理',
              path: '/topicManagement',
              isDisabled: false
            }, {
              label: '学生拟题审批',
              isDisabled: true
            }, {
              label: '师生双向选择',
              path: '/twoWaySelectionTV',
              isDisabled: false
            }, {
              label: '毕业设计小组',
              path: '/team',
              isDisabled: false
            }
          ]
        }, {
          label: '信息查询',
          children: [
            {
              label: '我的个人信息',
              path: '/teacher/account/accountHome',
              isDisabled: false
            },
          ]
        }, {
          label: '学生毕业设计过程文档',
          children: [
            {
              label: '开题报告审核',
              path: '/thesisProposalAuditByDH',
              isDisabled: false
            }
          ]
        },
      ],
      userInfo: {
        userId: '',
        username: 'teacher',
      },
    }
  },
  computed: {
    ...mapState('loginAbout', ['user'])
  },
  components: {
    HomeTemplate,
    AnnouncementListComponent,
    ClockComponent
  },
  methods: {
    postTeacherInfo(teacherId) {
      postTeacherInfo({
        teacherId
      }).then(result => {
        let res = result.data
        if (res.resultCode === 200) {
          this.userInfo.username = res.data.teacherName
          this.userInfo.userId = res.data.teacherId
          this.$store.state.teacherHome.teacherInfo = res.data
        }
      })
    },
  },
  created() {
    this.postTeacherInfo(this.user.userId)
  },
}
</script>

<style scoped lang="less">
@import "/src/assets/styles/css/public";
</style>