const {
    getPlanInfoListUrl,
    savePlanUrl,
    getSemesterNumUrl,
    saveWeekPlanUrl,
    saveDisciplineUrl,
    getDisciplineByPlanUrl,
    getWeekByPlanIdUrl,
    getDisciplineByIdUrl,
    getPlanInfoByIdUrl,
    saveFullPlanInFileUrl
} = require("./url");

export const getPlanList = (token) => fetch(getPlanInfoListUrl, {
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

export const getPlanById = (id, token) => fetch(getPlanInfoByIdUrl(id), {
    method: "GET",
    headers: {
        "Authorization": token
    }
})
    .then(resp => resp.json())

export const savePlanInfo = (planInfo, token) => fetch(savePlanUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": token
    },
    body: JSON.stringify(planInfo)
}).then(resp => resp.json());

export const getSemesterNum = (id, token) => fetch(getSemesterNumUrl + id, {
    method: "GET",
    headers: {
        "Authorization": token
    }
})
    .then(resp => resp.json());

export const saveWeekPlanData = (weeksPlan, token) => fetch(saveWeekPlanUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": token
    },
    body: JSON.stringify(weeksPlan)
}).then(resp => resp.json());

export const getDisciplineByPlan = (id, token) => fetch(getDisciplineByPlanUrl(id), {
    method: "GET",
    headers: {
        "Authorization": token
    },
})
    .then(resp => {
        if (resp.ok) {
            return resp.json().then(data => ({ status: resp.status, body: data }))
        } else {
            return { status: resp.status, body: {} }
        }
    });

export const getWeekByPlanId = (id, token) => fetch(getWeekByPlanIdUrl(id), {
    method: "GET",
    headers: {
        "Authorization": token
    }
})
    .then(resp => resp.json());

export const getDisciplineById = (id, token) => fetch(getDisciplineByIdUrl(id), {
    method: "GET",
    headers: {
        "Authorization": token
    }
})
    .then(resp => resp.json())

export const saveDisciplineData = (discipline, token) => fetch(saveDisciplineUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": token
    },
    body: JSON.stringify(discipline)
}).then(resp => resp.json());

export const saveFullPlanInFile = (planId, token) => fetch(saveFullPlanInFileUrl(planId), {
    method: "GET",
    headers: {
        "Authorization": token
    }
})
    .then(resp => {
        if (resp.ok) {
            return { status: resp.status }
        } else {
            return { status: resp.status }
        }
    })