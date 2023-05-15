const {
    getRoleUrl,
    getStatusUrl,
    getUsersUrl,
    createUserUrl,
    getUserByUsernameUrl
} = require("./url");

export const getRoleList = (token) => fetch(getRoleUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then((resp) => resp.json());

export const getStatusList = (token) => fetch(getStatusUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then((resp) => resp.json());

export const getUsersList = (token) => fetch(getUsersUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then((resp) => resp.json());

export const createUser = (token, user) => fetch(createUserUrl, {
    method: "POST",
    headers: {
        "Authorization": token,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
}).then((resp) => resp.json())

export const getUserByUsername = (token, username) => fetch(getUserByUsernameUrl(username), {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then((resp) => resp.json())