import  request from '../../index'

const api = '/teacher/gdTeam/ThesisSubmittedTable'

export function postThesisTableViewVOPage(params){
    return request({
        url:`${api}/postThesisTableViewVOPage`,
        method:'post',
        params
    })
}

