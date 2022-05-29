import request from "../../index"

const api = "/teacher/topicDetails"


export function postFindTopicDetail(params){
    return request({
        url:`${api}/postFindTopicDetail`,
        method:'get',
        params
    })
}

export function findTeacherInfoById(params){
    return request({
        url:`${api}/findTeacherInfoById`,
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