import request from '../../index'


const api = '/teacher/TowWaySelection';
export function postTeacherTopicSelected(params){
    return request({
        url:`${api}/postTeacherTopicSelected`,
        method:'POST',
        params,
    })
}

export function postJoinGDTTeam(params){
    return request({
        url:`${api}/joinGDTTeam`,
        method:'post',
        params
    })
}

export function postDismissal(params){
    return request({
        url:`${api}/dismissal`,
        method:'post',
        params
    })
}