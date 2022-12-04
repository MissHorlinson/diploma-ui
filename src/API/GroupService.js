const {
    getGroupListUrl,
    saveGroupUrl,
    getGroupByIdUrl,
    getStudentInGroupUrl,
    getStudentByIdUrl,
    saveStudentUrl
} = require("./url");

export const getGroupList = (token) => fetch(getGroupListUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => {
    if (resp.ok) {
        return resp.json().then(data => ({ status: resp.status, body: data }))
    } else {
        return { status: resp.status, body: {} }
    }
});

export const getStudentInGroup = (id, token) => fetch(getStudentInGroupUrl(id), {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => resp.json());

export const saveGroupData = (group, token) => fetch(saveGroupUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": token
    },
    body: JSON.stringify(group)
}).then(resp => resp.json());

export const getGroupById = (id, token) => fetch(getGroupByIdUrl(id), {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => resp.json());

export const getStudentById = (id, token) => fetch(getStudentByIdUrl(id), {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => resp.json());

export const saveStudentData = (student, token) => fetch(saveStudentUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": token
    },
    body: JSON.stringify(student)
}).then(resp => resp.json());