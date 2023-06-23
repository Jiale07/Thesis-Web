import Vue from 'vue'
import SelectFormType from "@/components/public/selectFormType/SelectFormType.vue";

const SelectFormTypeConstructor = Vue.extend(SelectFormType)



function selectFormType(callback, options) {
  if (typeof options === 'string') {
    options = {
      message: options,
    }
  }

  const instance = new SelectFormTypeConstructor({
    el: document.createElement('div'),
    data: options
  })

  const doClose = ()=> {
    instance.dialogVisible = false
    instance.$nextTick(() => {
      instance.$off()
      instance.$el.parentNode.removeChild(instance.$el);
      instance.$destroy()
    })
  }

  instance.$on('callback', (data) => {
    callback(data)
    doClose()
  })
  instance.$on('closed-event', () => {
    doClose()
  })
  instance.$mount()
  document.body.appendChild(instance.$el)
}
Vue.prototype.$selectFormType = selectFormType
