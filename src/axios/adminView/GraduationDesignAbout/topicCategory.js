import request from "../../index"
const api = "/admin/topicCategory"

export function postTopicCategoryPage(params){
    return request({
        url:`${api}/postTopicCategoryPage`,
        method:'post',
        params
    })
}

export function getAllTopicCategoyrList(params){
    return request({
        url:`${api}/getAllTopicCategoyrList`,
        method:'get',
        params
    })
}

export function addTopicCategory(params){
    return request({
        url:`${api}/addTopicCategory`,
        method:'post',
        params
    })
}

export function updateTopicCategory(params){
    return request({
        url:`${api}/updateTopicCategory`,
        method:'post',
        params
    })
}

export function deletedTopicCategory(params){
    return request({
        url:`${api}/deletedTopicCategory`,
        method:'post',
        params
    })
}