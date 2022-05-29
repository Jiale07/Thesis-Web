import request from '../../index'

const api="/admin"

export function postAnnouncementPage(params){
    return request({
        url:`${api}/postAnnouncementPage`,
        method:'post',
        params
    })
}

export function postAddAnnouncement(data){
    return request({
        url:`${api}/postAddAnnouncement`,
        method:'post',
        data
    })
}

export function postUpdateAnnouncement(params){
    return request({
        url:`${api}/postUpdateAnnouncement`,
        method:'post',
        params
    })
}

export function postDeletedAnnouncementLogic(params){
    return request({
        url:`${api}/postDeletedAnnouncementLogic`,
        method:'post',
        params
    })
}

export function getACList(){
    return request({
        url:`${api}/getACList`,
        method:'get'
    })
}