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
      <div class="summary-box">
        <div
            v-for="(item, index) in summaryBoxList"
            :key="index"
            class="container "
        >
          <span>{{ item.label }}</span>
        </div>
      </div>
    </template>
  </HomeTemplate>
</template>

<script>
import {mapState} from "vuex";
import {postStudentInfo} from "@/axios/studentView/homeView";
import AnnouncementListComponent from "../../../components/AnnouncementListComponent";
import ClockComponent from "../../../components/Clock";
import HomeTemplate from "@/components/homeTemplate/index.vue";
import {StudentRouterEnum, StudentRouterPage} from "@/util/constant/router/student";
import {getFormTemplateListByUser, postVerifyIsCanCreateForm} from "@/axios/customForm";

export default {
  name: "StudentHome",
  data() {
    return {
      viewTitle: '学生',
      srcMenu: [
        {
          label: '毕业设计',
          isDisabled: false,
          children: [
            {
              label: '自主选择导师',
              isDisabled: false,
              path: StudentRouterPage[StudentRouterEnum.ChooseInstructor],
            }, {
              label: '查看选择结果',
              isDisabled: true,
            }
          ],
        }, {
          label: '信息查询',
          children: [
            {
              label: '我的个人信息',
              isDisabled: false,
              path: '/accountHome'
            }, {
              label: '我的选题',
              isDisabled: true
            }, {
              label: '其他',
              isDisabled: true
            }
          ]
        }, {
          label: '过程文档提交',
          children: [
            {
              label: '开题报告',
              isDisabled: false,
              path: StudentRouterPage[StudentRouterEnum.ThesisProposal]
            }, {
              label: '毕业论文',
              isDisabled: false,
              path: StudentRouterPage[StudentRouterEnum.ThesisView]
            }, {
              label: '毕业论文最终版',
              isDisabled: false,
              path: StudentRouterPage[StudentRouterEnum.ThesisFinalView]
            }, {
              label: '答辩材料',
              isDisabled: true,
              path: ''
            }
          ],
        },
      ],
      menu: null,
      userInfo: {
        userId: '',
        username: 'student',
      },
      summaryBoxList: [
        {
          key: 'thesisFlow',
          label: '毕业论文流程',
        },
      ]
    }
  },
  components: {
    AnnouncementListComponent,
    ClockComponent,

    HomeTemplate,
  },

  computed: {
    ...mapState('loginAbout', ['user']),
    ...mapState('studentHome', ['studentInfo']),
  },
  methods: {
    postStudentInfo(studentId) {
      postStudentInfo({
        studentId
      }).then(result => {
        let res = result.data
        if (res.resultCode === 200) {
          this.userInfo.username = res.data.studentName
          this.userInfo.userId = res.data.studentId
          this.$store.state.studentHome.studentInfo = res.data
        }
      })
    },
    async initMenu() {
      let baseObj = {
        label: '',
        isDisabled: false,
        path: '/customFrom/create',
      }
      const customFormMenu = {
        label: '自定义表单',
        children: []
      }
      return getFormTemplateListByUser().then(res => {
        const {resultCode, data} = res.data
        if (resultCode === 200) {
          customFormMenu.children = data.map(item => {
            return {
              ...baseObj,
              label: item.name,
              query: {
                formTemplateId: item.id,
              },
              // verifyFunc: this.verifyIsCanCreateForm
            }
          })
          this.menu = [
            ...this.srcMenu,
            customFormMenu
          ]
        } else {
          return []
        }
      })
    },

    verifyIsCanCreateForm(menuItem) {
      return postVerifyIsCanCreateForm({formTemplateId: menuItem.query?.formTemplateId}).then(res => {
        const {resultCode, message, data} = res.data
        if (data) {
          return true
        } else {
          resultCode === 200 ? this.$message.warning(message) :this.$message.error(message)
          return false
        }
      })
    }
  },
  async created() {
    this.postStudentInfo(this.user.userId)
    await this.initMenu()
  }
}
</script>
<style scoped lang="less">
@import "/src/assets/styles/css/public";

.summary-box {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-auto-rows: 100px;
}
</style>
