<template>
  <div class="myContainer" :style="{minHeight:asideHeight+'px'}">
    <HeaderComponent title="毕业论文"/>
    <div class="myContent">
      <ThesisBasicInformationComponent
          :studentId="studentId"
      >
      </ThesisBasicInformationComponent>
      <el-divider></el-divider>
      <div
          class="mainContentItemBox"
          v-for="(item,key) in ThesisInputSetting"
          :key="item.id+key">
        <div class="titleBox">
          <span class="title">{{ item.titleName }}</span>
        </div>
        <div>
          <div class="ql-container ql-snow" :style="{minHeight:120+'px'}">
            <div class="ql-editor">
              <div class="details_box" v-html="item.inputContent"/>
            </div>
          </div>
        </div>
      </div>
      <el-divider></el-divider>
      <div v-if="ThesisAuditRecord">
        <div>
          <i class="el-icon-user-solid"></i>
          <span>指导老师：</span>
          <span>{{ ThesisAuditRecord.teacherName }}</span>
        </div>
        <div>
          <i class="el-icon-finished"></i>
          <span>审核结果：</span>
          <span>{{ ThesisAuditRecord.auditStatusName }}</span>
        </div>
        <div>
          <span>意见或建议：</span>
          <div class="ql-container ql-snow" :style="{minHeight:120+'px'}">
            <div class="ql-editor">
              <div class="details_box" v-html="ThesisAuditRecord.content"/>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ThesisBasicInformationComponent from '../components/ThesisBasicInformationComponent.vue'

import {mapState} from "vuex";
import {
  getThesisInputSettingList, postThesisAuditRecordByThesisId,
  postThesisInputListByThesisId
} from "@/axios/studentView/processDocumentation/ThesisDetailViewAbout";
import HeaderComponent from "@/views/studentView/ProcessDocumentationView/components/header.vue";

export default {
  name: "ThesisDetailView",
  props: ['propsThesisId'],
  data() {
    return {
      asideHeight: '',

      studentId: '',

      ThesisInputSetting: [],
      ThesisAuditRecord: {},
    }
  },
  computed: {
    ...mapState('thesisDetailViewStore', ['thesisId']),
    ...mapState('loginAbout', ['user'])
  },
  components: {
    HeaderComponent,
    ThesisBasicInformationComponent
  },

  methods: {
    initialization(gdThesisId) {
      let p = new Promise((resolve, reject) => {
        postThesisInputListByThesisId({gdThesisId}).then(result => {
          let res = result.data
          if (res.resultCode === 200) {
            resolve(res.data)
          } else {
            reject()
          }
        })
      })

      p.then(value => {
        this.getThesisInputSettingList(value)
      }, error => {
        this.getThesisInputSettingList(error)
      })
    },

    getThesisInputSettingList(ThesisInputList) {
      getThesisInputSettingList().then(result => {
        let res = result.data
        if (res.resultCode === 200) {
          let data = res.data
          data.forEach(DElement => {
            if (ThesisInputList != null && ThesisInputList !== '' && ThesisInputList !== undefined) {
              ThesisInputList.forEach(listElement => {
                if (DElement.id === listElement.gdthesisInputSettingId) {
                  DElement.inputContent = listElement.inputContent
                }
              })
            }
          })
          this.ThesisInputSetting = data
        }
      })
    },

    postThesisAuditRecordByThesisId(gdThesisId) {
      postThesisAuditRecordByThesisId({
        gdThesisId
      }).then(result => {
        let res = result.data
        if (res.resultCode === 200) {
          this.ThesisAuditRecord = res.data
        }
      })
    }
  },

  created() {
    this.studentId = this.user.userId
    if (this.propsThesisId !== '' && this.propsThesisId !== null && this.propsThesisId !== undefined) {
      this.$store.commit("thesisDetailViewStore/setThesisId", this.propsThesisId)
    }
    this.postThesisAuditRecordByThesisId(this.thesisId)
    this.initialization(this.thesisId)
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
}
</script>

<style scoped lang="less">
.myContainer {
  margin: 0 auto;
  width: 1280px;

  .myContent {
    background-color: #ffffff;
    border-radius: 15px;
    padding: 15px 25px;


    .mainContentItemBox {
      margin-bottom: 20px;
    }

    .titleBox {
      line-height: 30px;
    }
  }

  .headerBox {
    margin-bottom: 10px;
  }
}
</style>
