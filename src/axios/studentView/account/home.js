import request from "../../index"

const api = "/student/account/home"

export function postAccountBasicInformation(params){
    return request({
        url:`${api}/postAccountBasicInformation`,
        month:'post',
        params
    })
}