import request from "../index"

const api = '/public'

export function getTopicCategoryList(){
    return request({
        url:`${api}/getTopicCategoryList`,
        method:'get',
    })
}