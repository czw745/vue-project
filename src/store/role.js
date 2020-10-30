import {
    getRole,
    showRole,
    searchRole,
    postRole,
    putRole,
    deleteRole
} from '../services/apis/role'

export const state = () => ({
    roles: [],
    role: {}
})

export const getters = {
    roleQueryGet: state => state.roles,
    roleShowGet: state => state.role,
}

export const actions = {
    async roleQueryAct({commit}, params) {
        const {data} = await getRole(params)
        commit('roleQueryMut', data)
        return data
    },
    async roleSearchAct({commit}, params) {
        const {data} = await searchRole(params)
        commit('roleQueryMut', data)
        return data
    },
    async roleShowAct({commit}, id) {
        const data = await showRole(id)
        commit('roleShowMut', data)
        return data
    },
    async roleCreateAct(nullable, body) {
        const result = await postRole(body)
        return result
    },
    async roleUpdateAct(nullable, body) {
        const result = await putRole(body)
        return result
    },
    async roleDeleteAct({commit}, id) {
        const result = await deleteRole(id)
        if (result) {
            const {data} = await getRole({
                params: {
                    page: 1,
                    page_size: 5
                }
            })
            commit('roleQueryMut', data)
        }
        return result
    }
}

export const mutations = {
    roleQueryMut(state, payload) {
        state.roles = payload
    },
    roleShowMut(state, payload) {
        state.role = payload
    }
}
