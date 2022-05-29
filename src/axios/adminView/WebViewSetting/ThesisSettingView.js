import request from '../../index'

const api = "/admin/webViewSetting/thesis"

export function getThesisInputSettingList(){
    return request({
        url:`${api}/getThesisInputSettingList`,
        method:'get',
    })
}

export function addThesisInputSetting(params){
    return request({
        url:`${api}/addThesisInputSetting`,
        method:'post',
        params
    })
}

export function updateThesisInputSetting(params){
    return request({
        url:`${api}/updateThesisInputSetting`,
        method:'post',
        params
    })
}

export function deletedThesisInputSetting(params){
    return request({
        url:`${api}/deletedThesisInputSetting`,
        method:'post',
        params
    })
}