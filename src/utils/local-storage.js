export const setLocalStorage = ({ name, value }) => {
    window.localStorage.setItem(name, value)
}

export const removeLocalStorage = name => {
    window.localStorage.removeItem(name)
}

export const clearAllLocalStorage = () => {
    window.localStorage.clear() // all
}

export const getLocalStorage = name => {
    return window.localStorage.getItem(name)
}
