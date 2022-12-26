const { getRoleUrl, getStatusUrl, getUsersUrl } = require("./url");


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