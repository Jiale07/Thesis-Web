import Vue from 'vue'
import SvgIcon from '@/components/svgIcon/index.vue'

// 注册到全局
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg/public', false, /\.svg$/)
requireAll(req)