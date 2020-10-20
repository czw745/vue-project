import {
    getUsers
} from '../services/apis/user'

export const state = () => ({
    users: [],
    user: [],
})

export const getters = {
    usersGetter: state => state.users,
    userGetter: state => state.user,
}

export const actions = {
    async showUsers ({ commit }, params) {
        const result = await getUsers(params)
        commit('setUsers', result)
        return result
    }
}

export const mutations = {
    setUsers (state, payload) {
        state.users = payload
    }
}
