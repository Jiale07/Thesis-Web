import request from "../index";

const api = "/public"
export function download(params){
    return request({
        url:`${api}/download`,
        method:'post',
        responseType: 'blob',
        params
    })
}