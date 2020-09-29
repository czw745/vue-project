import Cookie from 'js-cookie'

export const setCookie = ({ name, value, expiredAt }) => {
    const config = {
        // secure: true,
        domain: window.location.hostname,
        sameSite: 'lax'
    }

    if (expiredAt) {
        config.expires = new Date(expiredAt)
    }

    Cookie.set(name, value, config)
}

export const removeCookie = (name) => {
    const config = {
        domain: window.location.hostname
    }
    Cookie.remove(name, config)
}

export const getCookie = (name) => {
    return Cookie.get(name)
}
