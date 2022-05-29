import request from '../../index.js'

const api = "/student/ThesisDetailView"

export function getThesisInputSettingList(){
    return request({
        url:`${api}/getThesisInputSettingList`,
        method:'get'
    })
}

export function postThesisInputListByThesisId(params){
    return request({
        url:`${api}/postThesisInputListByThesisId`,
        method:'post',
        params
    })
}

export function postThesisAuditRecordByThesisId(params){
    return request({
        url:`${api}/postThesisAuditRecordByThesisId`,
        method:'post',
        params
    })
}

