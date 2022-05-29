import request from "../../index"

const api = "/teacher/gdTeam/thesisAudit"

export function getThesisInputSettingList(){
    return request({
        url:`${api}/getThesisInputSettingList`,
        method:'get',
    })
}

export function postThesisInputListByThesisId(params){
    return request({
        url:`${api}/postThesisInputListByThesisId`,
        method:'post',
        params
    })
}
export function postThesisAuditRecord(params){
    return request({
        url:`${api}/postThesisAuditRecord`,
        method:'post',
        params
    })
}
export function postSubmitAuditStatueOfTheThesis(params){
    return request({
        url:`${api}/postSubmitAuditStatueOfTheThesis`,
        method:'post',
        params
    })
}

export function postThesisAccessoryFileInfo(params){
    return request({
        url:`${api}/postThesisAccessoryFileInfo`,
        method:'post',
        params
    })
}