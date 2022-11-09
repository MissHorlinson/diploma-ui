import { createStore } from 'redux'

const dataStorageKey = "DATA"

const saveData = ({ token, role }) => {
    localStorage.setItem(dataStorageKey, JSON.stringify({ token, role }));
};

const loadData = () => {
    const data = localStorage.getItem(dataStorageKey)
    return data && JSON.parse(data)
}

const load = () => {
    const data = loadData() || {}
    return {
        token: data.token,
        role: data.role
    }
}

const reducer = ((state = {}, action) => {
    if (action.type === "saveData") {
        const data = Object.assign({}, state, action.data || {})
        saveData(data)
        return data
    }
    if (!state.token) {
        return Object.assign({}, state, load())
    }
    return state
})

export default createStore(reducer);