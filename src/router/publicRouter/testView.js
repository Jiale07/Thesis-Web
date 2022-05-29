import TestView from '../../views/publicView/TestView'

const testView = {
    path:'/testView',
    name:'TestView',
    component: TestView,
    meta: {
        title: '测试页面',
        role:null,
        requiresAuth: true
    },
    props:true
}

export default testView