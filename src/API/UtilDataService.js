const { getRankListUrl, getBaseUrl, getCipherUrl, getDegreeUrl, getDepartmentUrl, getDisciplineFormUrl, getDisciplineTypeUrl, getPersonalTaskFormUrl, getPositionUrl, getQualificationUrl, getReportingFormUrl, getStepUrl, getStudyingFormUrl, getStudyingTermUrl, getStudyingTypeUrl, getSubjectNameUrl } = require("./url");

export const getRankList = (token) => fetch(getRankListUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
})
    .then(resp => resp.json());

export const getBase = (token) => fetch(getBaseUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
})
    .then(resp => resp.json());

export const getCipher = (token) => fetch(getCipherUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
})
    .then(resp => resp.json());

export const getDegree = (token) => fetch(getDegreeUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
})
    .then(resp => resp.json());

export const getDepartment = (token) => fetch(getDepartmentUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
})
    .then(resp => resp.json());

export const getDisciplineForm = (token) => fetch(getDisciplineFormUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
})
    .then(resp => resp.json());

export const getDisciplineType = (token) => fetch(getDisciplineTypeUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
})
    .then(resp => resp.json());

export const getPersonalTaskForm = (token) => fetch(getPersonalTaskFormUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
})
    .then(resp => resp.json());

export const getPosition = (token) => fetch(getPositionUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
})
    .then(resp => resp.json());

export const getQualification = (token) => fetch(getQualificationUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
})
    .then(resp => resp.json());

export const getReportingForm = (token) => fetch(getReportingFormUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
})
    .then(resp => resp.json());

export const getStep = (token) => fetch(getStepUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
})
    .then(resp => resp.json());

export const getStudyingForm = (token) => fetch(getStudyingFormUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
})
    .then(resp => resp.json());

export const getStudyingTerm = (token) => fetch(getStudyingTermUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
})
    .then(resp => resp.json());

export const getStudyingType = (token) => fetch(getStudyingTypeUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
})
    .then(resp => resp.json());

export const getSubjectName = (token) => fetch(getSubjectNameUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
})
    .then(resp => resp.json());