import request from "../../index"

const api = "/student/account/accountHome"

export function postAccountBasicInformation(params){
    return request({
        url:`${api}/postAccountBasicInformation`,
        month:'post',
        params
    })
}