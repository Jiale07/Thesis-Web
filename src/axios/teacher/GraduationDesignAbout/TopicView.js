import request from "../../index"

const api = "/teacher/topic"
const api2 = "/topicCategory"
export function findAllTopicPage(params){
    return request({
        url:`${api}/findAllTopicPage`,
        method:'get',
        params
    })
}

export function addTopic(params){
    return request({
        url:`${api}/addTopic`,
        method:'post',
        params
    })
}

export function updateTopic(params){
    return request({
        url:`${api}/updateTopic`,
        method:'post',
        params
    })
}

export function deletedTopic(params){
    return request({
        url:`${api}/deletedTopic`,
        method:'post',
        params
    })
}


export function getAllTopicCategoryList(params){
    return request({
        url:`${api2}/getAllTopicCategoryList`,
        method:'get',
        params
    })
}



