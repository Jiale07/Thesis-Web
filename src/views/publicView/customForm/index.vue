<template>
  <div>
    <div class="create-custom-form-body">
      <div class="create-custom-form-box">
        <HeaderComponent :title="headerTitle">
          <template v-slot:right>
            <el-button v-if="isCanEdit" type="primary" size="mini" @click="handleSubmitForm">提交</el-button>
            <el-button v-else type="primary" size="mini" @click="handleSwitchState">编辑</el-button>
          </template>
        </HeaderComponent>
        <div class="container">
          <div v-if="loading">
            <el-skeleton :rows="6"/>
          </div>
          <div v-else>
            <div v-if="isCanEdit">
              <CreateCustomForm
                  :componentList="componentList"
              ></CreateCustomForm>
            </div>
            <div v-else>
              <DetailCustomForm
                  :componentList="componentList"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateCustomForm from "@/views/publicView/customForm/components/createCustomForm.vue";
import DetailCustomForm from "@/views/publicView/customForm/components/detailCustomForm.vue";
import {
  getFormTemplateComplete,
  getFormVOByFormTemplateId,
  postCreateCustomForm,
  postUpdateCustomForm,
  postVerifyIsCanCreateForm
} from "@/axios/customForm";
import HeaderComponent from "@/components/stduentAbout/header/index.vue";
import {ComponentKey, ConfigComponentList} from "@/util/constant/customForm";
/*
  create 可编辑 isCanEdit
  update 可编辑 !this.$isEmpty(formId) && isCanEdit
  detail 不可编辑
 */

export default {
  name: '',
  data() {
    return {
      isCanEdit: true,
      componentList: [],
      formInfo: {},
      loading: true,
    }
  },
  computed: {
    getFormTemplateId() {
      const {formTemplateId} = this.$route.query
      return formTemplateId
    },
    headerTitle() {
      return this.formTemplateName
    },
    haveFormId() {
      return !this.$isEmpty(this.formInfo.id)
    }
  },
  components: {
    HeaderComponent,
    CreateCustomForm,
    DetailCustomForm
  },
  methods: {
    verifyIsCanCreateForm(formTemplateId) {
      return postVerifyIsCanCreateForm({formTemplateId}).then(res => {
        // const {resultCode, message, data} = res.data
        const {data} = res.data
        if (data) {
          return true
        } else {
          // resultCode === 200 ? this.$message.warning(message) :this.$message.error(message)
          return false
        }
      })
    },

    async initFormComplete(formTemplateId) {
      this.loading = true
      let valueInfo = []

      const formInfo = await this.initCustomFormInfo(formTemplateId)
      const {formInfoList} = formInfo
      this.formInfo = formInfo
      valueInfo = valueInfo.concat(formInfoList)

      const params = {
        formTemplateId
      }
      getFormTemplateComplete(params).then(res => {
        let {resultCode, data} = res.data
        if (resultCode === 200) {
          const customForm = data[0]
          const {formComponentList, formTemplateId, formTemplateName} = customForm
          this.formTemplateId = formTemplateId
          this.formTemplateName = formTemplateName
          this.componentList = this.formatInitFormComponents(formComponentList, valueInfo)
        } else {
          return false
        }
      }).finally(() => {
        this.loading = false
      })
    },
    formatInitFormComponents(componentList, formInfoList) {
      return componentList.map(cItem => {
        const {componentKey, componentLabel, formComponentId, formComponentConfigList} = cItem
        let formInfoItem = {}
        if (!this.isCanEdit) {
          formInfoItem = formInfoList.find(item => item.formComponentId === formComponentId)
        }
        const config = Object.assign({}, ...formComponentConfigList.map(fcclItem => {
          const configObj = ConfigComponentList.find(item => item.key === fcclItem.propertyKey)
          let value = fcclItem.value

          if (configObj) {
            const {valueType} = configObj
            if (valueType === 'number') {
              value = Number(fcclItem.value)
            }
          }
          return {
            [fcclItem.propertyKey]: value
          }
        }))

        let forInfoValue = formInfoItem?.value
        if (ComponentKey[componentKey] === ComponentKey.DateSelect) {
          forInfoValue = this.$dayjs(forInfoValue).format('YYYY-MM-DD')
        }
        return {
          key: ComponentKey[componentKey],
          label: componentLabel,
          formComponentId: formComponentId,
          config,
          formInfoId: this.haveFormId ? formInfoItem?.id : undefined,
          value: this.haveFormId ? forInfoValue || undefined :undefined
        }
      })
    },
    initCustomFormInfo(formTemplateId) {
      return getFormVOByFormTemplateId({formTemplateId}).then(res => {
        const {resultCode, data} = res.data
        if (resultCode === 200) {
          return data
        } else {
          return []
        }
      })
    },
    handleSubmitForm() {
      const componentList = this.formatSubmitForm(this.componentList)
      const params = {
        formId: this.formInfo.id || undefined,
        formName: this.formName,
        formTemplateId: this.formTemplateId,
        componentList,
      }
      const submitFunc = this.haveFormId ? postUpdateCustomForm : postCreateCustomForm
      submitFunc(params).then(res => {
        const {resultCode, message} = res.data
        if (resultCode === 200) {
          this.$message.success("提交成功")
          this.$router.back()
        } else {
          this.$message.error(message)
        }
      })
    },
    formatSubmitForm(componentList) {
      return componentList.map(cItem => {
        const targetKeyList = ['formComponentId', 'value', 'formInfoId']
        return Object.assign({}, ...targetKeyList.map(targetKeyItem => {
          let value = cItem[targetKeyItem]

          return {
            [targetKeyItem]: value
          }
        }))
      })
    },
    handleSwitchState() {
      this.isCanEdit = !this.isCanEdit
    }
  },
  async created() {
    this.isCanEdit = await this.verifyIsCanCreateForm(this.getFormTemplateId)
    if (!this.$isEmpty(this.getFormTemplateId)) {
      this.initFormComplete(this.getFormTemplateId)
    } else {
      this.$message.error('参数错误')
    }
  }
}
</script>

<style scoped lang="less">
@import "/src/assets/styles/css/public";

.create-custom-form-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  .create-custom-form-box {
    padding: 10px;
  }
}

.container {
  width: 1080px;
  min-width: 1080px;
}

.container:not(:last-child) {
  margin-bottom: 10px;
}


</style>
