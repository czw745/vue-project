import {
    // setCookie,
    removeCookie,
    // getCookie
} from '@/utils/cookie'
import {
    // setLocalStorage,
    removeLocalStorage,
    // getLocalStorage
} from '@/utils/local-storage'

const TOKEN_KEY = 'dietitian_token'
export const state = () => ({
    currentDietitian: {},
    isLogin: false
})

export const getters = {
    isLoginGetter: state => state.isLogin
}

export const mutations = {
    setLogin(state, payload) {
        state.isLoggingIn = payload
    },
    currentDietitianTokenSetter(state, payload) {
        state.currentDietitian = payload
    }
}

export const actions = {
    async login({commit}, params) {
        if (params.email.length > 0 && params.password.length > 0) {
            console.log('yes')
            commit('setLogin', true)
            return true
        } else {
            console.log('no')
            commit('setLogin', false)
            return false
        }
    },
    async logout({commit}) {
        commit()
        removeCookie(TOKEN_KEY)
        removeLocalStorage(TOKEN_KEY)
    },
    checkTokenExists({commit}) {
        const token = 'qwertyui12345678qwertyu'
        if (token) {
            commit('currentDietitianTokenSetter', token)
        }
        return token
    }
}
