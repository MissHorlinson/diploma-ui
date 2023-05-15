export const getRankUrl = `/util/academicRank/all`;
export const saveRankUrl = `/util/academicRank/save`;

export const getBaseUrl = `/util/base/all`;
export const saveBaseUrl = `/util/base/save`;

export const getCipherUrl = `/util/cipher/all`;
export const saveCipherUrl = `/util/cipher/save`;

export const getDegreeUrl = `/util/degree/all`;
export const saveDegreeUrl = `/util/degree/save`;

export const getDepartmentUrl = `/util/department/all`;
export const saveDepartmentUrl = `/util/department/save`;
export const getDepartmentByIdUrl = (id) => `/util/department/getById/${id}`;

export const getPositionUrl = `/util/position/all`;
export const savePositionUrl = `/util/position/save`;

export const getQualificationUrl = `/util/qualification/all`;
export const saveQualificationUrl = `/util/qualification/save`;

export const getStepUrl = `/util/step/all`;
export const saveStepUrl = `/util/step/save`;

export const getStudyingFormUrl = `/util/studyingForm/all`;
export const saveStudyingFormUrl = `/util/studyingForm/save`;

export const getStudyingTermUrl = `/util/studyingTerm/all`;
export const saveStudyingTermUrl = `/util/studyingTerm/save`;
export const getStudyingTermByIdUrl = (id) => `/util/studyingTerm/getById/${id}`;

export const getStudyingTypeUrl = `/util/studyingType/all`;
export const saveStudyingTypeUrl = `/util/studyingType/save`;
export const getStudyingTypeByIdUrl = (id) => `/util/studyingType/getById/${id}`;


export const getDisciplineFormUrl = `/discipline/disciplineForm/all`;
export const saveDisciplineFormUrl = `/discipline/disciplineForm/save`;

export const getDisciplineTypeUrl = `/discipline/disciplineType/all`;
export const saveDisciplineTypeUrl = `/discipline/disciplineType/save`;

export const getPersonalTaskFormUrl = `/discipline/personalTaskForm/all`;
export const savePersonalTaskFormUrl = `/discipline/personalTaskForm/save`;

export const getSubjectNameUrl = `/discipline/subjectName/all`;
export const saveSubjectNameUrl = `/discipline/subjectName/save`;

export const getReportingFormUrl = `/discipline/reportingForm/all`;
export const saveReportingFormUrl = `/discipline/reportingForm/save`;

export const getDisciplineByPlanUrl = (id) => `/discipline/getByPlan/${id}`
export const getDisciplineByIdUrl = (id) => `/discipline/${id}`
export const saveDisciplineUrl = `/discipline/save`;


export const getPlanInfoListUrl = `/planInfo/all`;
export const savePlanUrl = `/planInfo/save`;
export const getPlanInfoByIdUrl = (id) => `/planInfo/getById/${id}`;
export const getPlanByGroupUrl = (id) => `/planInfo/getByGroupStream?streamId=${id}`;

export const getSemesterNumUrl = `/planInfo/getSemesterNum/`;


export const saveWeekPlanUrl = `/weekPlan/save`;
export const getWeekByPlanIdUrl = (id) => `/weekPlan/getByPlan/${id}`;
export const deleteWeekByIdUrl = (id) => `/weekPlan/delete/${id}`;

export const getGroupListUrl = `/groupInfo/all`;
export const getGroupByIdUrl = (id) => `/groupInfo/getById/${id}`;
export const saveGroupUrl = `/groupInfo/save`;

export const getStudentInGroupUrl = (id) => `/groupInfo/getGroupList/${id}`;

export const getStudentByIdUrl = (id) => `/student/getById/${id}`;
export const saveStudentUrl = `/student/save`;

export const getAllTeachrsUrl = `/teacher/all`;
export const saveTeacherUrl = `/teacher/save`;
export const getTeacherByIdUrl = (id) => `/teacher/getById/${id}`;

export const saveFullPlanInFileUrl = (id) => `/xlsFiles/getFullPlanXlsFile/${id}`;
export const savePersonalPlanInFileUrl = (planId, studentId, course) => `/xlsFiles/getPersonalPlanXlsFile?planId=${planId}&studentId=${studentId}&course=${course}`;
export const uploadFileUrl = `/xlsFiles/readFromFile`;

export const getRoleUrl = `/admin/role/all`;
export const getStatusUrl = `/admin/status/all`;
export const getUsersUrl = `/admin/user/all`;
export const createUserUrl = `/admin/user/create`;
export const getUserByUsernameUrl = (username) => `/admin/user/getByUsername/${username}`;


export const loginUrl = `/auth/login`;
export const logoutUrl = `/auth/logout`;