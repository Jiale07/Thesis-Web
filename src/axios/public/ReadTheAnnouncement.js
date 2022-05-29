import request from '../index'

const api = '/public'

export function postAnnouncementList(params){
    return request({
        url:`${api}/postAnnouncementList`,
        method:'post',
        params
    })
}
export function postAnnouncementById(params){
    return request({
        url:`${api}/postAnnouncementById`,
        method:'post',
        params
    })
}

export function postACById(params){
    return request({
        url:`${api}/postACById`,
        method:'post',
        params
    })
}

export function postCreatorNameByCreatorId(params){
    return request({
        url:`${api}/postCreatorNameByCreatorId`,
        method:'post',
        params
    })
}