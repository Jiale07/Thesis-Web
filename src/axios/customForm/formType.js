import request from "./../index"

const api = '/customForm'
export function formType(data) {
  return request({
    url: `${api}/formType`,
    method: 'get',
    data,
  })
}

export function addFormType(params) {
  return request({
    url: `${api}/addFormType`,
    method: 'post',
    params,
  })
}

export function updateFormType(params) {
  return request({
    url: `${api}/updateFormType`,
    method: 'post',
    params,
  })
}

export function deleteFormType(params) {
  return request({
    url: `${api}/logicallyDeleteFormType`,
    method: 'get',
    params,
  })
}
