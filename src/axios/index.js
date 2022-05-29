import axios from 'axios'
import router from "../router";
import { Message} from 'element-ui';
// axios.defaults.headers.common["Content-Type"] ="application/json; charset=UTF-8";
axios.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8"

const service = axios.create({
    baseURL:'/thesisApi',
    timeout:5000
})

//请求拦截
service.interceptors.request.use(function (config){
    // console.log(config);
    // console.groupEnd();
    //使用本地登录后保存测token进行访问验证。
    if (sessionStorage.getItem("token")){
        config.headers.token = sessionStorage.getItem('token')

    }
    return config
},function (error){
    return Promise.reject(error)
})

//添加相应拦截器
service.interceptors.response.use(function (response){
    // const res = response.data;
    // console.log("全局相应拦截")
    // console.log(response)
    // console.groupEnd()
    if (response.data.resultCode===401){
        Message.error(response.data.message+"!")
        router.push("/login")
        sessionStorage.removeItem("user")
        sessionStorage.removeItem("token")

        return null
    }
    return response
},function (error){
    return Promise.reject(error)
})


export default service.request