export const getRankUrl = `/util/academicRank`;
export const saveRankUrl = `/util/academicRank/save`;

export const getBaseUrl = `/util/base`;
export const saveBaseUrl = `/util/base/save`;

export const getCipherUrl = `/util/cipher`;
export const saveCipherUrl = `/util/cipher/save`;

export const getDegreeUrl = `/util/degree`;
export const saveDegreeUrl = `/util/degree/save`;

export const getDepartmentUrl = `/util/department`;
export const saveDepartmentUrl = `/util/department/save`;
export const getDepartmentByIdUrl = (id) => `/util/department/getById/${id}`;

export const getPositionUrl = `/util/position`;
export const savePositionUrl = `/util/position/save`;

export const getQualificationUrl = `/util/qualification`;
export const saveQualificationUrl = `/util/qualification/save`;

export const getStepUrl = `/util/step`;
export const saveStepUrl = `/util/step/save`;

export const getStudyingFormUrl = `/util/studyingForm`;
export const saveStudyingFormUrl = `/util/studyingForm/save`;

export const getStudyingTermUrl = `/util/studyingTerm`;
export const saveStudyingTermUrl = `/util/studyingTerm/save`;
export const getStudyingTermByIdUrl = (id) => `/util/studyingTerm/getById/${id}`;

export const getStudyingTypeUrl = `/util/studyingType`;
export const saveStudyingTypeUrl = `/util/studyingType/save`;
export const getStudyingTypeByIdUrl = (id) => `/util/studyingType/getById/${id}`;


export const getDisciplineFormUrl = `/discipline/disciplineForm`;
export const saveDisciplineFormUrl = `/discipline/disciplineForm/save`;

export const getDisciplineTypeUrl = `/discipline/disciplineType`;
export const saveDisciplineTypeUrl = `/discipline/disciplineType/save`;

export const getPersonalTaskFormUrl = `/discipline/personalTaskForm`;
export const savePersonalTaskFormUrl = `/discipline/personalTaskForm/save`;

export const getSubjectNameUrl = `/discipline/subjectName`;
export const saveSubjectNameUrl = `/discipline/subjectName/save`;

export const getReportingFormUrl = `/discipline/reportingForm`;
export const saveReportingFormUrl = `/discipline/reportingForm/save`;

export const getDisciplineByPlanUrl = (id) => `/discipline/getByPlan/${id}`
export const getDisciplineByIdUrl = (id) => `/discipline/${id}`
export const saveDisciplineUrl = `/discipline/save`;


export const getPlanInfoListUrl = `/planInfo/getAll`;
export const savePlanUrl = `/planInfo/save`;
export const getPlanInfoByIdUrl = (id) => `/planInfo/getById/${id}`;

export const getSemesterNumUrl = `/planInfo/getSemesterNum/`;


export const saveWeekPlanUrl = `/weekPlan/save`;
export const getWeekByPlanIdUrl = (id) => `/weekPlan/getByPlan/${id}`;

export const getGroupListUrl = `/groupInfo/getAll`;
export const getGroupByIdUrl = (id) => `/groupInfo/getById/${id}`;
export const saveGroupUrl = `/groupInfo/save`;

export const getStudentInGroupUrl = (id) => `/groupInfo/getGroupList/${id}`;

export const getStudentByIdUrl = (id) => `/student/getById/${id}`;
export const saveStudentUrl = `/student/save`;

export const getAllTeachrsUrl = `/teacher/getAll`;
export const saveTeacherUrl = `/teacher/save`;
export const getTeacherByIdUrl = (id) => `/teacher/getById/${id}`;

export const saveFullPlanInFileUrl = (id) => `/xlsFiles/getFullPlanXlsFile/${id}`;

