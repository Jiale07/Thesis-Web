import request from '../../index'

const api = "/teacher/gdTeam/ThesisProposalAuditController"

export function postThesisProposalAuditVO(params){
    return request({
        url:`${api}/postThesisProposalAuditVO`,
        method:'post',
        params
    })
}
export function postThesisProposalInputSettingList(){
    return request({
        url:`${api}/postThesisProposalInputSettingList`,
        method:'post',
    })
}

export function postFileInfoByFileId(params){
    return request({
        url:`${api}/postFileInfoByFileId`,
        method:'post',
        params
    })
}

export function getTPAISettingList(){
    return request({
        url:`${api}/getTPAISettingList`,
        method:'get',
    })
}

export function postTPAIList(params){
    return request({
        url:`${api}/postTPAIList`,
        method:'post',
        params
    })
}

export function postSubmitTPAI(params){
    return request({
        url:`${api}/postSubmitTPAI`,
        method:"post",
        params
    })
}

export function postVerifyIsAuditByDepartmentHead(params){
    return request({
        url:`${api}/postVerifyIsAuditByDepartmentHead`,
        method:'post',
        params
    })
}
