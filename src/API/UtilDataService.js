const { getRankListUrl, getBaseUrl, getCipherUrl, getDegreeUrl, getDepartmentUrl, getDisciplineFormUrl, getDisciplineTypeUrl, getPersonalTaskFormUrl, getPositionUrl, getQualificationUrl, getReportingFormUrl, getStepUrl, getStudyingFormUrl, getStudyingTermUrl, getStudyingTypeUrl, getSubjectNameUrl } = require("./url");

export const getRankList = () => fetch(getRankListUrl)
    .then(resp => resp.json());

export const getBase = () => fetch(getBaseUrl)
    .then(resp => resp.json());

export const getCipher = () => fetch(getCipherUrl)
    .then(resp => resp.json());

export const getDegree = () => fetch(getDegreeUrl)
    .then(resp => resp.json());

export const getDepartment = () => fetch(getDepartmentUrl)
    .then(resp => resp.json());

export const getDisciplineForm = () => fetch(getDisciplineFormUrl)
    .then(resp => resp.json());

export const getDisciplineType = () => fetch(getDisciplineTypeUrl)
    .then(resp => resp.json());

export const getPersonalTaskForm = () => fetch(getPersonalTaskFormUrl)
    .then(resp => resp.json());

export const getPosition = () => fetch(getPositionUrl)
    .then(resp => resp.json());

export const getQualification = () => fetch(getQualificationUrl)
    .then(resp => resp.json());

export const getReportingForm = () => fetch(getReportingFormUrl)
    .then(resp => resp.json());

export const getStep = () => fetch(getStepUrl)
    .then(resp => resp.json());

export const getStudyingForm = () => fetch(getStudyingFormUrl)
    .then(resp => resp.json());

export const getStudyingTerm = () => fetch(getStudyingTermUrl)
    .then(resp => resp.json());

export const getStudyingType = () => fetch(getStudyingTypeUrl)
    .then(resp => resp.json());

export const getSubjectName = () => fetch(getSubjectNameUrl)
    .then(resp => resp.json());