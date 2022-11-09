export const getRankListUrl = `/util/academicRank`;
export const getBaseUrl = `/util/base`;
export const getCipherUrl = `/util/cipher`;
export const getDegreeUrl = `/util/degree`;
export const getDepartmentUrl = `/util/department`;
export const getPositionUrl = `/util/position`;
export const getQualificationUrl = `/util/qualification`;
export const getStepUrl = `/util/step`;
export const getStudyingFormUrl = `/util/studyingForm`;
export const getStudyingTermUrl = `/util/studyingTerm`;
export const getStudyingTypeUrl = `/util/studyingType`;


export const getDisciplineFormUrl = `/discipline/disciplineForm`;
export const getDisciplineTypeUrl = `/discipline/disciplineType`;
export const getPersonalTaskFormUrl = `/discipline/personalTaskForm`;
export const getSubjectNameUrl = `/discipline/subjectName`;
export const getReportingFormUrl = `/discipline/reportingForm`;
export const getDisciplineByPlanUrl = (id) => `/discipline/getByPlan/${id}`
export const getDisciplineByIdUrl = (id) => `/discipline/${id}`
export const saveDisciplineUrl = `/discipline/saveFullData`;


export const getPlanInfoListUrl = `/planInfo/getAll`;
export const savePlanUrl = `/planInfo/save`;
export const getSemesterNumUrl = `/planInfo/getSemesterNum/`;
export const getPlanInfoByIdUrl = (id) => `/planInfo/getById/${id}`;

export const saveWeekPlanUrl = `/weekPlan/save`;
export const getWeekByPlanIdUrl = (id) => `/weekPlan/getByPlan/${id}`;

export const getGroupListUrl = `/groupInfo/getAll`;
export const getStudentInGroupUrl = (id) => `/groupInfo/getGroupList/${id}`;
export const saveGroupUrl = `/groupInfo/saveGroup`;
export const getGroupByIdUrl = (id) => `/groupInfo/getGroupById/${id}`;
