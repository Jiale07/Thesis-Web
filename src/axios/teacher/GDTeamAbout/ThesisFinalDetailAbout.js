import request from "../../index"

const api = "/teacher/thesisFinalDetail/"

export function thesisFinalInputSettingList(){
    return request({
        url:`${api}/thesisFinalInputSettingList`,
        method:'post'
    })
}

export function thesisFinalInputList(params){
    return request({
        url:`${api}/thesisFinalInputList`,
        method:'post',
        params
    })
}

export function postThesisFinalAccessoryFileInfo(params){
    return request({
        url:`${api}/postThesisFinalAccessoryFileInfo`,
        method:'post',
        params
    })
}