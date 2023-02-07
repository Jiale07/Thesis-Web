<template>
  <div>
    <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        @close="handleClose"
    >
      <div class="rule-main" v-loading="loading">
        <div class="numbering-rule-preview">
          <span>编码预览:{{ numberingRulePreviewStr }}</span>
          <div v-if="previewCreateDate">
            <span>假设创建日期为：{{ previewCreateDate }}</span>
          </div>
        </div>
        <div class="dotted-line"></div>
        <div class="numbering-rule-name-box">
          <span>编号规则名称：</span>
          <el-input v-model="numberingRuleName"></el-input>
        </div>
        <div class="dotted-line"></div>
        <div
            v-for="(ruleItem, index) in numberingRuleList"
            :key="`rule-item-${index}`"
            class="rule-item"
        >
          <div class="rule-item-title">
            <span>{{ `第 ${index + 1} 项` }}</span>
            <svg-icon
                v-if="numberingRuleList.length > 1"
                icon-class="delete"
                @click="handleUpdateNumberingRuleList('delete', index)"
            ></svg-icon>
          </div>
          <div class="rule-item-content-box">
            <div class="rule-item-content">
              <div class="numbering-rule-select-type">
                <span>编号段类型：</span>
                <el-select v-model="ruleItem.paragraphType" placeholder="请选择"
                           @change="handleParagraphTypeChange($event, index)">
                  <el-option
                      v-for="item in codingSegmentTypeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="edit-paragraph">
                <div v-if="ComponentType.DatePicker === ruleItem.componentType">
                  <div class="select-date-type">
                    <el-select v-model="ruleItem.optionType" placeholder="请选择"
                               @change="handleUpdateNumberingRulePreview">
                      <el-option
                          v-for="item in DataTypeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                    <div v-if="ruleItem.optionType === DateType.AppointedDay">
                      <el-date-picker
                          v-model="ruleItem.value"
                          type="date"
                          value-format="yyyyMMdd"
                          placeholder="选择日期"
                          @change="handleUpdateNumberingRulePreview"
                      >
                      </el-date-picker>
                    </div>
                  </div>
                </div>
                <div v-if="ComponentType.Select === ruleItem.componentType">
                  <el-select v-model="ruleItem.value" placeholder="请选择"
                             @change="handleUpdateNumberingRulePreview(ruleItem.optionType)">
                    <el-option
                        v-for="item in ruleItem.optionList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div v-if="ComponentType.Input === ruleItem.componentType">
                  <div v-if="InputType.Character === ruleItem.inputType">
                    <div>
                      <el-input
                          v-model="ruleItem.value"
                          placeholder="请输入"
                          @input="handleUpdateNumberingRulePreview"
                      ></el-input>
                    </div>
                  </div>
                  <div v-else-if="InputType.SerialNumber === ruleItem.inputType">
                    <div>
                      <span>最大长度：</span>
                      <el-input-number
                          v-model="ruleItem.maxLength"
                          placeholder="请输入"
                          :min="1"
                          :max="10"
                          :precision="0"
                          @change="handleUpdateNumberingRulePreview"
                      ></el-input-number>
                    </div>
                    <div>
                      <span>初始流水号：</span>
                      <el-input-number
                          v-model="ruleItem.value"
                          placeholder="请输入"
                          :min="0"
                          :max="getSerialNumberMaxLength(ruleItem.maxLength)"
                          :precision="0"
                          @input="handleUpdateNumberingRulePreview"
                      ></el-input-number>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rule-item-add-button">
          <div class="rule-item-add-button-item" @click="handleUpdateNumberingRuleList('add')">
            <svg-icon icon-class="add-circle"></svg-icon>
            <span>添加编码段</span>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button @click="handlePostNumberingRule">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {cloneDeep} from "lodash";
import {getCollegeList, getMajorList} from "@/axios/adminView/public";
import {postNumberingRule} from "@/axios/adminView/numberingRuleSetting";
import {NumberingType} from "@/util/numberingRule";

const ComponentType = {
  DatePicker: 1,
  Select: 2,
  Input: 3,
}
const OptionType = {
  College: 1,
  Major: 2,
}

const InputType = {
  SerialNumber: 1,
  Character: 2
}

const DateType = {
  AppointedDay: 1,
  CreatedDate: 2,
}
export default {
  name: 'editNumberRule',
  props: {
    dialogTitle: {
      type: String,
      default: '',
    },
    isAutoAddEmptyItem: {
      type: Boolean,
      default: false,
    },
    numberingRuleData: {
      type: Object,
      default: () => {}
    },
    commitType: String,
  },
  data() {
    return {
      ComponentType,
      DateType,
      InputType,
      loading: false,
      dialogVisible: true,
      numberingRuleId: null,
      numberingRuleName: '',
      codingSegmentTypeOption: [
        {
          label: '日期',
          value: 1,
          componentType: ComponentType.DatePicker,
        },
        {
          label: '学院',
          value: 2,
          componentType: ComponentType.Select,
          optionType: OptionType.College,
        },
        {
          label: '专业',
          value: 3,
          componentType: ComponentType.Select,
          optionType: OptionType.Major,
        },
        {
          label: '流水号',
          value: 4,
          componentType: ComponentType.Input,
          inputType: InputType.SerialNumber,
        },
        {
          label: '符号',
          value: 5,
          componentType: ComponentType.Input,
          inputType: InputType.Character,
        }
      ],
      currCodingSegmentTypeValue: null,

      numberingRuleList: [],
      numberingRuleDefaultObj: {
        paragraphType: null,
        componentType: null,
        optionType: null,
        optionList: [],
        value: null,
        maxLength: null,
      },
      DataTypeOptions: [
        {
          label: '创建日期',
          value: DateType.CreatedDate,
        },
        {
          label: '指定日期',
          value: DateType.AppointedDay,
        }
      ],
      previewCreateDate: null,
      numberingRulePreviewStr: '',
    }
  },
  methods: {
    handleUpdateNumberingRuleList(key, index) {
      if ('add' === key) {
        this.numberingRuleList.push(cloneDeep(this.numberingRuleDefaultObj))
      } else if ('delete' === key) {
        let currEditItem = this.numberingRuleList[index]
        let {optionType, componentType} = currEditItem
        if (ComponentType.Select === componentType && OptionType.College === optionType) {
          let majorItem = this.numberingRuleList.find(item => item.optionType === OptionType.Major)
          if (majorItem && Object.keys(majorItem).length > 0) {
            majorItem.optionList = this.getMajorListFunction()
          }
        }
        this.numberingRuleList.splice(index, 1)
        this.handleUpdateNumberingRulePreview()
      }
    },
    async handleParagraphTypeChange(value, itemIndex) {
      let {componentType, optionType, inputType} = this.codingSegmentTypeOption.find(item => item.value === value)
      let currEditItem = this.numberingRuleList.find((item, index) => index === itemIndex)
      currEditItem.paragraphType = value
      currEditItem.componentType = componentType
      currEditItem.value = null
      if (ComponentType.Select === componentType) {
        currEditItem.optionType = optionType
        if (OptionType.College === currEditItem.optionType) {
          currEditItem.optionList = await this.getCollegeListFunction()
        } else if (OptionType.Major === currEditItem.optionType) {
          let currCollegeId = this.numberingRuleList.find(item => item.optionType === OptionType.College).value
          currEditItem.optionList = await this.getMajorListFunction(currCollegeId)
        }
      } else if (ComponentType.Input === componentType) {
        currEditItem.inputType = inputType
      } else {
        currEditItem.OptionType = null
      }
      this.handleUpdateNumberingRulePreview()
    },
    async handleUpdateNumberingRulePreview(optionType) {
      let previewStr = ''
      previewStr = (await Promise.all(
          this.numberingRuleList.map(async item => {
            if (ComponentType.DatePicker === item.componentType) {
              if (DateType.AppointedDay === item.optionType) {
                this.previewCreateDate = null
                return item.value
              } else if (DateType.CreatedDate === item.optionType) {
                this.previewCreateDate = '20221231'
                return '20221231'
              }
            } else if (ComponentType.Select === item.componentType) {
              if (OptionType.College === item.optionType) {
                // 当更换学院信息时候，专业信息需要重新选择。
                let majorItem = this.numberingRuleList.find(item => item.optionType === OptionType.Major)
                if (majorItem) {
                  majorItem.optionList = await this.getMajorListFunction(item.value)
                  if (OptionType.College === optionType && this.$isEmpty(majorItem.optionList.find(item => item.value === majorItem.value))) {
                    majorItem.value = null
                  }
                }
              }
              return item.value
            } else if (ComponentType.Input === item.componentType) {
              if (InputType.SerialNumber === item.inputType) {
                let resultStr = ''
                for (let i = 0; i < item.maxLength - 1; i++) {
                  resultStr = `${resultStr}0`
                }
                return `${resultStr}${item.value}`
              } else if (InputType.Character === item.inputType) {
                return item.value
              }
            }
          })
      )).join('')
      this.numberingRulePreviewStr = previewStr
    },
    handlePostNumberingRule() {
      let params = {
        numberingRuleType: NumberingType.StudentID,
        numberingRuleName: this.numberingRuleName,
        content: JSON.stringify(this.numberingRuleList.map(item => {
          if ([ComponentType.DatePicker, ComponentType.Select].includes(item.componentType)) {
            return {
              paragraphType: item.paragraphType,
              componentType: item.componentType,
              optionType: item.optionType,
              value: item.value,
            }
          } else if (ComponentType.Input === item.componentType) {
            return {
              paragraphType: item.paragraphType,
              componentType: item.componentType,
              maxLength: item.maxLength || undefined,
              inputType: item.inputType,
              value: item.value,
            }
          }
        }) || ''),
      }
      params = {
        ...params,
        name: this.numberingRuleName,
        numberingRuleId: this.numberingRuleId, // 更新
      }
      postNumberingRule(params).then(result => {
        const res = result.data
        if (res.resultCode === 200) {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.handleClose()
      })
    },
    handleClose() {
      this.$emit('on-close')
      this.$emit('refresh-data')
    },
    async formatRuleContent(content) {
      let contentObj = JSON.parse(content)
      let collegeRule = contentObj.find(item => ComponentType.Select === item.componentType && OptionType.College === item.optionType)
      let majorRule = contentObj.find(item => ComponentType.Select === item.componentType && OptionType.Major === item.optionType)
      if (!this.$isEmpty(collegeRule) && Object.keys(collegeRule).length > 0) {
        collegeRule.optionList = await this.getCollegeListFunction()
      }
      if (!this.$isEmpty(majorRule) && Object.keys(majorRule).length > 0) {
        majorRule.optionList = await this.getMajorListFunction(collegeRule.value || undefined)
      }
      return contentObj
    },
    formatToSelectOption(data) {
      return data.map(item => {
        return {
          label: item.collegeName || item.majorName,
          value: item.id,
        }
      })
    },
    getMajorListFunction(collegeId) {
      return getMajorList({
        collegeId: collegeId || undefined,
      }).then(result => {
        const res = result.data
        if (res.resultCode === 200) {
          return this.formatToSelectOption(res.data)
        }
      })
    },
    getCollegeListFunction() {
      return getCollegeList().then(result => {
        const res = result.data
        if (res.resultCode === 200) {
          return this.formatToSelectOption(res.data)
        }
      })
    },
    getSerialNumberMaxLength(power) {
      return Math.pow(10, power) - 1
    }
  },
  async created() {
    this.loading = true
    if (Object.keys(this.numberingRuleData).length !== 0) {
      let {content, name, id} = cloneDeep(this.numberingRuleData)
      this.numberingRuleId = id
      this.numberingRuleName = name
      this.numberingRuleList = await this.formatRuleContent(content)
      await this.handleUpdateNumberingRulePreview()
    } else if (this.isAutoAddEmptyItem) {
      this.numberingRuleList.push(cloneDeep(this.numberingRuleDefaultObj))
    }
    this.$nextTick(() => {
      this.loading = false
    }, 0)
  }
}
</script>

<style scoped lang="less">
.rule-main {
  .numbering-rule-preview {
    padding: 10px;
  }

  .numbering-rule-name-box {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }

  .rule-item {
    padding: 10px;
    border: 1px solid #99a9bf;
    border-radius: 10px;
    overflow: auto;

    .rule-item-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .rule-item-content-box {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .rule-item-content {
        white-space: nowrap;

        .select-date-type {
          padding: 5px 0;
          display: flex;
        }

        .edit-paragraph {
          padding: 5px 0;
        }
      }
    }
  }

  .rule-item:not(:last-child) {
    margin-bottom: 10px;
  }
}

.rule-item-add-button {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #409eff;

  .rule-item-add-button-item {
    display: flex;
    align-items: center;
  }
}

.dotted-line {
  margin: 5px 0;
  border-bottom: 1px dashed #ccc;
}
</style>
