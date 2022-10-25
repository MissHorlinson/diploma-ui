const { getPlanInfoListUrl, savePlanUrl, getSemesterNumUrl, saveWeekPlanUrl, getDisciplineByPlanUrl, getWeekByPlanIdUrl, getDisciplineByIdUrl, saveDisciplineUrl, getPlanInfoByIdUrl } = require("./url");

export const getPlanList = () => fetch(getPlanInfoListUrl)
    .then(resp => resp.json());

export const getPlanById = (id) => fetch(getPlanInfoByIdUrl(id))
    .then(resp => resp.json())

export const savePlanInfo = (planInfo) => fetch(savePlanUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(planInfo)
}).then(resp => resp.json());

export const getSemesterNum = (id) => fetch(getSemesterNumUrl + id)
    .then(resp => resp.json());

export const saveWeekPlanData = (weeksPlan) => fetch(saveWeekPlanUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(weeksPlan)
}).then(resp => resp.json());

export const getDisciplineByPlan = (id) => fetch(getDisciplineByPlanUrl(id))
    .then(resp => resp.json());

export const getWeekByPlanId = (id) => fetch(getWeekByPlanIdUrl(id))
    .then(resp => resp.json());

export const getDisciplineById = (id) => fetch(getDisciplineByIdUrl(id))
    .then(resp => resp.json())

export const saveDisciplineData = (discipline) => fetch(saveDisciplineUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(discipline)
}).then(resp => resp.json());