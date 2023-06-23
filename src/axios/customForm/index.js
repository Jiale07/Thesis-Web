import request from "./../index"

const api = 'customForm'
export function postCreateForm(data) {
  return request({
    url: '/customForm/postCreateForm',
    method: 'post',
    data,
  })
}

export function postUpdateForm(data) {
  return request({
    url: '/customForm/postUpdateForm',
    method: 'post',
    data,
  })
}

export function getFormList(params) {
  return request({
    url: `${api}/selectFormPage`,
    method: 'get',
    params,
  })
}

export function getFormComplete(params) {
  return request({
    url: `${api}/selectFormComplete`,
    method: 'get',
    params,
  })
}
