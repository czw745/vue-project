import {
    getUser,
    showUser,
    searchUser,
    postUser,
    putUser,
    deleteUser
} from '../services/apis/user'

export const state = () => ({
    users: [],
    user: {}
})

export const getters = {
    userQueryGet: state => state.users,
    userShowGet: state => state.user,
}

export const actions = {
    async userQueryAct ({ commit }, params) {
        const { data } = await getUser(params)
        commit('userQueryMut', data)
        return data
    },
    async userSearchAct ({ commit }, params) {
        const { data } = await searchUser(params)
        commit('userQueryMut', data)
        return data
    },
    async userShowAct ({ commit }, id) {
        const data = await showUser(id)
        commit('userShowMut', data)
        return data
    },
    async userCreateAct (nullable, body) {
        const result = await postUser(body)
        return result
    },
    async userUpdateAct (nullable, body) {
        const result = await putUser(body)
        return result
    },
    async userDeleteAct (nullable, id) {
        const result = await deleteUser(id)
        return result
    }
}

export const mutations = {
    userQueryMut (state, payload) {
        state.users = payload
    },
    userShowMut (state, payload) {
        state.user = payload
    }
}
