const { getPlanInfoListUrl, savePlanUrl, getSemesterNumUrl, saveWeekPlanUrl } = require("./url");

export const getPlanList = () => fetch(getPlanInfoListUrl)
    .then(resp => resp.json());

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
})