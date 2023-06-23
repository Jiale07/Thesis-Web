/*
  自定义表单可使用的组件
 */
const ComponentKey = {
  TextInput: 1,
  NumberInput: 2,
  RichText: 3,
  DateSelect: 4
}

const ComponentName = {
  [ComponentKey.TextInput]: '文本输入',
  [ComponentKey.NumberInput]: '数组输入',
  [ComponentKey.RichText]: '富文本',
  [ComponentKey.DateSelect]: '日期选择器',
}

/*
  自定义表单可使用组件的配置属性
 */
const ConfigComponentKey = {
  Input: 1,
  Number: 2,
  InputNumber: 3, // 计数器
  Radio: 4,
}

const ConfigComponentList = [
  {
    key: 'maxlength',
    label: '最大字符长度',
    value: 10,
    isCanEdit: true,
    component: ConfigComponentKey.InputNumber,
  },
  {
    key: 'minlength',
    label: '最小字符长度',
    value: 0,
    isCanEdit: true,
    component: ConfigComponentKey.InputNumber,
  }
]

const DefaultComponentConfig = {
  [ComponentKey.TextInput]: [
    {
      key: 'type',
      value: 'textarea',
      isCanEdit: false, // 虽然不显示，但最终创建自定义表单的时候还是需要提交，所以value不能为空
    },
    ...getCCList(['maxlength', 'minlength'])
  ],
  [ComponentKey.NumberInput]: [
    {
      key: 'type',
      value: 'number',
      isCanEdit: false,
    },
    ...getCCList(['maxlength', 'minlength'])
  ],
  [ComponentKey.RichText]: [],
  [ComponentKey.DateSelect]: [
    {
      key: 'format',
      value: 'yyyy-DD-mm',
      isCanEdit: false
    }
  ],
}


/*
  cc: ConfigComponent
 */
function getCCList(target) {
  return ConfigComponentList.filter(item => target.includes(item.key))
}

function ComponentList() {
  let list = Object.entries(ComponentKey)
  return list.map(item => {
    return {
      key: item[0],
      label: ComponentName[item[1]],
      value: item[1]
    }
  })
}


export {
  ComponentKey,
  ComponentName,
  ConfigComponentList,
  DefaultComponentConfig,
  ConfigComponentKey,

  ComponentList
}
