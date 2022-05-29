import request from "../../index"

const api = '/admin/management'

const api2 = '/studentTwoWaySelection'

export function getCollegeList(){
    return request({
        url:`${api}/getCollegeInfoList`,
        method:'get',
    })
}

export function findTopicPage(params){
    return request({
        url:`${api2}/findTopicPage`,
        method:'post',
        params
    })
}

export function selectedTopic(params){
    return request({
        url:`${api2}/selectedTopic`,
        method:'post',
        params
    })
}

export function changeSelected(params){
    return request({
        url:`${api2}/changeSelected`,
        method:'post',
        params
    })
}

export function cancelSelected(params){
    return request({
        url:`${api2}/cancelSelected`,
        method:'post',
        params
    })
}


export function findStudentSelectedByStudentId(params){
    return request({
        url:`${api2}/findStudentSelectedByStudentId`,
        method:'post',
        params
    })
}


export function findCollegeIdByStudentId(params){
    return request({
        url:`${api2}/findCollegeIdByStudentId`,
        method:'post',
        params
    })
}

export function postSelectionTopicResult(params){
    return request({
        url:`${api2}/postSelectionTopicResult`,
        method:'post',
        params
    })
}

export function postFindTopicDetail(params){
    return request({
        url:`${api2}/postFindTopicDetail`,
        method:'post',
        params
    })
}
