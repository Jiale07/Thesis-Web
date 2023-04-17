import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueQuillEditor from 'vue-quill-editor'
import {cloneDeep} from "lodash";
import './assets/icons/index'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
import dayjs from "dayjs";
Vue.use(VueQuillEditor)
Vue.use(ElementUI);
Vue.use(VXETable);

Vue.config.productionTip = false

Vue.prototype.$isEmpty = function(value) {
  return value === '' || value === null || value === undefined
}
Vue.prototype.$cloneDeep = cloneDeep
Vue.prototype.$dayjs = dayjs

  new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
