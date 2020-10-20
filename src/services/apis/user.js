import api from './index'
export const url = (action) => `/user/${action}`

export async function getUsers () {
    const data = await api.get(url('query'))
    return data
}

export async function getUserById (id, params) {
    const { data } = await api.get(url(`${id}`), params)
    return data
}

export async function postUser (params) {
    const { data } = await api.post(url('create'), params)
    return data
}

export async function putUser (id, params) {
    const { data } = await api.put(url(`update/${id}`), params)
    return data
}

export async function deleteUser(id, params) {
    const { data } = await api.delete(url(`delete/${id}`), params)
    return data
}
