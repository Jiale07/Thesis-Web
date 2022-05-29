import request from '../../index'

const api = "/student/thesisSubmitTheRecord"



export function postThesisSubmitTheRecordVOPage(params){
    return request({
        url:`${api}/postThesisSubmitTheRecordVOPage`,
        method:'post',
        params
    })
}

export function postFinalAuditResults(params){
    return request({
        url:`${api}/postFinalAuditResults`,
        method:'post',
        params
    })
}

export function postVerifyIsCanSubmitOfThesis(params){
    return request({
        url:`${api}/postVerifyIsCanSubmitOfThesis`,
        method:'post',
        params
    })
}