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
    getPlanByGroupUrl,
    saveFullPlanInFileUrl,
    savePersonalPlanInFileUrl,
    test
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
}).then(resp => resp.json())

export const getPlanByGroup = (id, token) => fetch(getPlanByGroupUrl(id), {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => resp.json())

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
        "Authorization": token,
        "Content-Type": "application/json"
    }
}).then(res => {
    if (res.ok) {
        return res.blob();
    }
}).then(({ blob, filename }) => {
    const href = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', "file.xlsx"); //or any other extension
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}).catch((err) => {
    return Promise.reject({ Error: 'Something Went Wrong', err });
});



export const savePersonalPlanInFile = (planId, studentId, course, token) => fetch(savePersonalPlanInFileUrl(studentId, planId, course), {
    method: "GET",
    headers: {
        "Authorization": token,
        "Content-Type": "application/json"
    }
}).then(res => {
    return res.blob();
}).then(blob => {
    const href = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'file.xlsx'); //or any other extension
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}).catch((err) => {
    return Promise.reject({ Error: 'Something Went Wrong', err });
});


