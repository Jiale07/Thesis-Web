import request from '../../index'

const api = '/admin/webViewSetting/thesisProposal'

// TPIS:ThesisProposalInputSetting

export function getTPISList(){
    return request({
        url:`${api}/getThesisProposalInputSettingList`,
        method:'get',
    })
}

export function postAddTPIS(params){
    return request({
        url:`${api}/postAddThesisProposalInputSetting`,
        method:'post',
        params
    })
}

export function postUpdateTPIS(params){
    return request({
        url:`${api}/postUpdateThesisProposalInputSetting`,
        method:'post',
        params
    })
}

export function postDeletedTPIS(params){
    return request({
        url:`${api}/postDeletedThesisProposalInputSetting`,
        method:'post',
        params
    })
}


// 审核输入框相关设置

export function postTPAuditInputSettingList(){
    return request({
        url:`${api}/postTPAuditInputSettingList`,
        method:'post',
    })
}

export function postAddTPAuditInputSetting(params){
    return request({
        url:`${api}/postAddTPAuditInputSetting`,
        method:'post',
        params
    })
}

export function postUpdateTPAuditInputSetting(params){
    return request({
        url:`${api}/postUpdateTPAuditInputSetting`,
        method:'post',
        params
    })
}

export function postDeletedTPAuditInputSetting(params){
    return request({
        url:`${api}/postDeletedTPAuditInputSetting`,
        method:'post',
        params
    })
}
