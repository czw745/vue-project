import axios from "axios";

import {tip, to404Page} from '../../utils/index'

const errorHandle = (status, msg) => {
    switch (status) {
        case 400:
            tip(msg);
            break;

        case 401:
            tip('登入過期，請重新登入');
            break;

        case 404:
            to404Page();
            break;
    }
}

const api = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL + "/api/v1"
})

api.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error)
})

api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const {res} = error;

    if (res) {
        errorHandle(res.status, res.data.error);
        return Promise.reject(error);
    } else {
        if (!window.navigator.onLine) {
            tip('當前網路出現問題，請重新連線後刷新頁面')
        } else {
            return Promise.reject(error)
        }
    }
})

export default api

