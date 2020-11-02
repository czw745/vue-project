import {
    getUser,
    showUser,
    searchUser,
    postUser,
    putUser,
    deleteUser,
    getRoleSelect
} from '../services/apis/user'

export const state = () => ({
    users: [],
    user: {},
    roleSelect: []
})

export const getters = {
    userQueryGet: state => state.users,
    userShowGet: state => state.user,
    userRoleSelectGet: state => state.roleSelect
}

export const actions = {
    async userQueryAct({commit}, params) {
        const {data} = await getUser(params)
        commit('userQueryMut', data)
        return data
    },
    async userSearchAct({commit}, params) {
        const {data} = await searchUser(params)
        commit('userQueryMut', data)
        return data
    },
    async userShowAct({commit}, id) {
        const data = await showUser(id)
        commit('userShowMut', data)
        return data
    },
    async userCreateAct(nullable, body) {
        const result = await postUser(body)
        return result
    },
    async userUpdateAct(nullable, body) {
        const result = await putUser(body)
        return result
    },
    async userDeleteAct({commit}, id) {
        const result = await deleteUser(id)
        if (result) {
            const {data} = await getUser({
                params: {
                    page: 1,
                    page_size: 5
                }
            })
            commit('userQueryMut', data)
        }
        return result
    },
    async userRoleSelectAct({commit}) {
        const data = await getRoleSelect()
        commit('userRoleSelectMut', data)
        return data
    }
}

export const mutations = {
    userQueryMut(state, payload) {
        state.users = payload
    },
    userShowMut(state, payload) {
        state.user = payload
    },
    userRoleSelectMut(state, payload) {
        state.roleSelect = payload
    }
}
