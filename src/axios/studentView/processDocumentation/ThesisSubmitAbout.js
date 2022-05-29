import request from "../../index"

const api = "/student/thesisSubmit"

export function getThesisInputSettingList(){
    return request({
        url:`${api}/getThesisInputSettingList`,
        method:'get',
    })
}

export function postThesisInputList(params){
    return request({
        url:`${api}/postThesisInputList`,
        method:'post',
        params
    })
}

export function postSubmitThesis(data){
    return request({
        url:`${api}/postSubmitThesis`,
        method:'post',
        data
    })
}