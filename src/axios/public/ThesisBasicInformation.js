import request from "../index"

const api = "/public"
export function postThesisBasicInformationVO(params){
    return request({
        url:`${api}/postThesisBasicInformationVO`,
        method:'post',
        params
    })
}