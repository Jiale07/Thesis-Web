<template>
  <div class="create-custom-form-template-body">
    <div class="container header">
      <div class="header-left">
        <div @click="handleCallBack">
          <i class="el-icon-back"></i>
          <span>返回</span>
        </div>
        <span class="title">{{ formTemplateTitle }}</span>
      </div>
      <div class="header-right">
        <el-input v-model="formTemplateName" placeholder="请输入表单标题"></el-input>
        <el-button type="primary" @click="submitFormTemplate">提交</el-button>
      </div>
    </div>
    <div class="container main-box">
      <div class="left">
        <div class="component-list-box">
          <div
              v-for="(item) in componentList"
              :key="item.key"
              class="component-item"
              @click="handleAddComponentItem(item)"
          >
            <span>{{ item.label }}</span>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="preview-box">
          <div
              v-for="(PCItem, index) in previewComponentList"
              :key="`preview-item-${index}-${previewComponentKey}`"
              :class="`preview-item ${currSettingComponentId === PCItem.id ? 'selected-style' : ''}`"
          >
            <div class="item-box">
              <div class="item-content" @click="handleClickPreviewItem(PCItem)">
                <span>{{ PCItem.label }}</span>
              </div>
              <div class="handle-button-box">
                <div
                    v-for="(item, index) in componentHandleButtonList"
                    :key="`handle-button-${index}`"
                    @click="handleClickHandleButton(item.key, PCItem)"
                >
                  <el-icon :class="item.iconClass"></el-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="component-label-box" v-if="!$isEmpty(currSettingComponentId)">
          <span>标题:</span>
          <el-input placeholder="请输入" v-model="labelValue" @input="handleComponentItemLabelInput"></el-input>
        </div>
        <div
            v-if="getConfigList.length"
            class="component-config-box"
        >
          <div
              v-for="(item, index) in getConfigList"
              :key="`config-item-${index}-${configListKey}`"
              class="config-item-box"
          >
            <edit-config
                :configKey="item.key"
                :type="item.component"
                :default-value="item.value"
                :label="item.label"
                @value-change="handleConfigChange"
            ></edit-config>
          </div>
        </div>
        <div v-else>
          <div v-if="!$isEmpty(currSettingComponentId)">
            <span>该组件暂时没有更多属性设置</span>
          </div>
          <div v-else>
            <span>请选中组件进行编辑</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ComponentKey, ComponentList, ComponentName, DefaultComponentConfig} from "@/util/constant/customForm";
import EditConfig from "@/views/adminView/customForm/components/editConfig.vue";
import {uuis} from '@/util/uuis'
import {getFormTemplateComplete, postCreateFormTemplate, postUpdateFormTemplate} from "@/axios/customForm";
import {debounce} from "@/util/tool";
import {v4 as uuidv4} from 'uuid';


const ButtonEventKey = {
  Delete: 'delete',
  Up: 'up',
  Down: 'down'
}
export default {
  name: "CreateCustomFormTemplate",
  components: {EditConfig},
  data() {
    return {
      previewComponentList: [],
      previewComponentKey: uuis(),
      currConfigList: [],
      configListKey: uuis(),
      currSettingComponentId: '',
      ButtonEventKey,
      componentHandleButtonList: [
        {
          key: ButtonEventKey.Delete,
          iconClass: 'icon el-icon-delete'
        },
        {
          key: ButtonEventKey.Up,
          iconClass: 'icon el-icon-top'
        },
        {
          key: ButtonEventKey.Down,
          iconClass: 'icon el-icon-bottom'
        }
      ],
      labelValue: '',
      currFormType: null,
      formTemplateName: '',
    }
  },
  computed: {
    componentList() {
      return ComponentList()
    },
    getConfigList() {
      return this.currConfigList.filter(item => item.isCanEdit)
    },
    formTemplateTitle() {
      return !this.$isEmpty(this.currFormType) ? `${this.currFormType.name} 类型的自定义表单` : ''
    },
    getFormTemplateId() {
      const {formTemplateId} = this.$route.query
      return formTemplateId
    }

  },
  methods: {
    handleAddComponentItem(item) {
      let {value, key, label} = item
      let configList = this.$cloneDeep(DefaultComponentConfig[value])
      const id = uuis()
      let previewComponent = {
        id,
        value,
        label,
        componentKey: key,
        componentLabel: '',
        configList,
      }
      this.changeCurrEditComponent(id, configList)
      this.previewComponentList.push(previewComponent)
      this.updateConfigListKey()
    },
    handleClickHandleButton(key, item) {
      let {id} = item
      let targetIndex = -1
      this.previewComponentList.forEach((item, index) => {
        if (item.id === id) {
          targetIndex = index
        }
      })
      if (key === ButtonEventKey.Delete) {
        this.previewItemDelete(targetIndex, id)
      } else if (key === ButtonEventKey.Up) {
        this.previewItemMoveUp(targetIndex)
      } else if (key ===  ButtonEventKey.Down) {
        this.previewItemMoveDown(targetIndex)
      }
    },
    previewItemDelete(targetIndex, itemId) {
      this.$confirm('此操作会去除该组件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.previewComponentList.splice(targetIndex, 1)
        if (this.currSettingComponentId === itemId) {
          this.changeCurrEditComponent('', [])
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    previewItemMoveUp(targetIndex) {
      let upObjIndex = targetIndex
      if (upObjIndex > 0) {
        this.interchange(upObjIndex, 'up')
      } else if (upObjIndex === 0) {
        this.$message.info("已经在最上方")
      } else {
        this.$message.warning("参数错误！")
      }
      this.updatePreviewItemKey()
    },
    previewItemMoveDown(targetIndex) {
      let downObjIndex = targetIndex
      if (downObjIndex >= 0 && downObjIndex < this.previewComponentList.length - 1) {
        this.interchange(downObjIndex, 'down')
      } else if (downObjIndex === this.previewComponentList.length - 1) {
        this.$message.info("已经在最下方")
      } else {
        this.$message.warning("参数错误！")
      }
      this.updatePreviewItemKey()
    },
    interchange(target, interChangeType) {
      let num = 0
      if (interChangeType === 'up') {
        num = -1
      } else if (interChangeType === 'down') {
        num = 1
      }
      return new Promise(resolve => {
        let t = this.previewComponentList[target + num]
        this.previewComponentList[target + num] = this.previewComponentList[target]
        this.previewComponentList[target] = t
        resolve()
      })
    },
    handleComponentItemLabelInput(value) {
      let updateLabelObj = this.previewComponentList.find(item => item.id === this.currSettingComponentId)
      updateLabelObj.componentLabel = value
      // this.labelValue = ''
    },
    handleConfigChange({configKey, value}) {
      let updateObj = this.previewComponentList.find(item => item.id === this.currSettingComponentId)
      let updateConfigObj = updateObj.configList.find(item => item.key === configKey)
      updateConfigObj.value = value
    },
    handleClickPreviewItem({id, componentLabel, configList}) {
      this.changeCurrEditComponent(id, configList)
      this.labelValue = componentLabel
      this.updateConfigListKey()
    },
    updateConfigListKey() {
      this.configListKey = uuis()
    },
    updatePreviewItemKey() {
      this.previewComponentKey = uuis()
    },
    changeCurrEditComponent(currEditComponentId, currConfigList) {
      this.currSettingComponentId = currEditComponentId
      this.currConfigList = currConfigList
    },
    //   保存数据
    formatComponentConfig() {
      const componentList = this.previewComponentList.map((item, index) => {
        const {componentKey, componentLabel, configList} = item
        let list = configList.map(item => {
          let baseResultObj = {
            key: item.key,
            value: item.value
          }
          if (!this.$isEmpty(item.formComponentConfigId)) {
            return Object.assign(baseResultObj, {formComponentConfigId: item.formComponentConfigId})
          }
          return baseResultObj
        })
        let resultObj = {
          componentKey,
          componentLabel,
          serialNumber: index + 1,
          configList: list
        }
        if (item.formComponentId) {
          Object.assign(resultObj, {formComponentId: item.formComponentId})
        }
        return resultObj
      })
      let data = {
        formTemplateName: this.formTemplateName,
        formTypeId: this.currFormType.id,
        componentList,
      }
      if (!this.$isEmpty(this.getFormTemplateId)) {
        Object.assign(data, {formTemplateId: this.getFormTemplateId})
      }
      return data
    },
    submitDataVerify() {
      const isHasEmpty = this.previewComponentList.some(item => this.$isEmpty(item.componentLabel))
      if (isHasEmpty) {
        this.$message.warning("组件的标题不能为空")
        return false
      }
      return true
    },
    submitFormTemplate: debounce(function () {
      // 校验
      if (!this.submitDataVerify()) {
        return false
      }
      // 获取提交数据
      const data = this.formatComponentConfig()
      const submitFunc = this.getSubmitFunc()
      submitFunc(JSON.stringify(data)).then(res => {
        let {resultCode, message} = res.data
        if (resultCode === 200) {
          this.$message.success("提交成功")
          this.handleCallBack()
        } else if (resultCode === 501) {
          this.$message.warning(message)
        }
      })
    }, 300),
    getSubmitFunc() {
      if (this.$isEmpty(this.getFormTemplateId)) {
        return postCreateFormTemplate
      } else {
        return postUpdateFormTemplate
      }
    },

    handleCallBack() {
      this.$router.back()
    },

    formatFormComplete(data) {
      const {formTemplateName, formTypeId, formTypeName, formComponentList} = data
      this.currFormType = {
        id: formTypeId,
        name: formTypeName
      }
      this.formTemplateName = formTemplateName

      const CKList = Object.entries(ComponentKey)

      this.previewComponentList = formComponentList
          .sort((curr, next) => curr.serialNumber - next.serialNumber)
          .map(fcItem => {
            const {formComponentConfigList} = fcItem
            const currComponent = CKList.find(item => item[0] === fcItem.componentKey)
            let componentConfigList = DefaultComponentConfig[currComponent[1]].map(dccItem => {
              const configObj = formComponentConfigList.find(fcclItem => fcclItem.propertyKey === dccItem.key)
              if (this.$isEmpty(configObj)) {
                return dccItem
              } else {
                return {
                  ...dccItem,
                  value: configObj.value,
                  formComponentConfigId: configObj.formComponentConfigId
                }
              }
            })
            const id = uuidv4()
            return {
              id,
              formComponentId: fcItem.formComponentId,
              label: ComponentName[currComponent[1]],
              componentLabel: fcItem.componentLabel,
              componentKey: fcItem.componentKey,
              configList: componentConfigList,
              value: currComponent[1]
            }
          })
    },
    getFormTemplateComplete(formTemplateId) {
      return getFormTemplateComplete({formTemplateId}).then(res => {
        let {resultCode, data} = res.data
        if (resultCode === 200) {
          return data[0]
        } else {
          return false
        }
      })
    },
    async initEditFormTemplateInfo(formTemplateId) {
      const formTemplateComplete = await this.getFormTemplateComplete(formTemplateId)
      if (formTemplateComplete) {
        this.formatFormComplete(formTemplateComplete)
      }
    }
  },

  created() {
    if (this.getFormTemplateId) {
      // 更改
      this.initEditFormTemplateInfo(this.getFormTemplateId)
    } else {
      // 新建
      const {formType} = this.$route.params
      this.currFormType = formType
    }
  }
}
</script>

<style scoped lang="less">
.create-custom-form-template-body {
  height: 100%;
  display: flex;
  flex-direction: column;
  //overflow: auto;

  .container {
    background-color: #ffffff;
    border-radius: 20px;
    padding: 10px;

  }

  .container:not(:last-child) {
    margin-bottom: 10px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-left {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-left > div:first-child {
      margin-right: 30px;
    }

    .header-right {
      display: flex;
      align-items: center;
    }
  }

  .main-box {
    height: 100%;
    padding-bottom: 30px;
    flex: 1;
    display: flex;
    justify-content: space-between;

    .left {
      height: 100%;
      width: 300px;

      .component-list-box {
        margin-right: 10px;
        height: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        align-content: flex-start;
        gap: 10px;
        padding: 10px;
        border: 1px dashed #2ca9e1;
        border-radius: 20px;

        .component-item {
          width: 100px;
          height: 30px;
          padding: 5px 10px;
          border: 1px solid #8c939d;
          border-radius: 10px;
          display: flex;
          align-items: center;
        }

        .component-item:hover {
          background-color: rgba(#2ca9e1, 0.2);
        }

        .component-item:not(:last-child) {
          //margin-right: 10px
        }
      }
    }

    .right {
      width: 300px;
      height: 100%;
      padding: 10px;
      border-radius: 20px;
      border: 1px dashed #2ca9e1;
      margin-left: 10px;

      .component-label-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        span {
          margin-right: 10px;
          white-space: nowrap;
        }
      }

      .component-config-box {


        .config-item-box {

        }

        .config-item-box:not(:last-child) {
          margin-bottom: 10px;
        }
      }
    }

    .center {
      height: 100%;
      flex: 1;

      .preview-box {
        height: 100%;
        padding: 10px;
        border: 1px dashed #2ca9e1;
        overflow: auto;


        .preview-item {
          background-color: rgba(#2ca9e1, 0.2);
          transition: all ease-in-out 0.2s;

          .item-box {
            height: 100%;
            display: flex;

            .handle-button-box {
              display: flex;
              justify-content: flex-start;
              flex-direction: column;

              .icon {
                padding: 10px;
                font-size: 14px;
                transition: all ease-in-out 0.2s;
              }

              .icon:hover {
                background-color: rgba(#2ca9e1, 0.5);
              }

              .el-icon-delete {
                transition: all ease-in-out 0.2s;
              }

              .el-icon-delete:hover {
                color: #FF5500;
              }

              //.el-icon-top, .el-icon-bottom {
              //
              //}
              //
              //.el-icon-top:hover, .el-icon-bottom:hover {
              //  background-color: rgba(#2ca9e1, 0.5);
              //}
            }


            .item-content {
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }

        .preview-item:hover {
          background-color: rgba(#2ca9e1, 0.4);
        }


        .preview-item:not(:last-child) {
          margin-bottom: 10px;
        }

        .selected-style {
          background-color: rgba(#2ca9e1, 0.4);
        }
      }
    }
  }
}

</style>
