const {
    getRankUrl, saveRankUrl,
    getBaseUrl, saveBaseUrl,
    getCipherUrl, saveCipherUrl,
    getDegreeUrl, saveDegreeUrl,
    getDepartmentUrl, saveDepartmentUrl, getDepartmentByIdUrl,
    getDisciplineFormUrl, saveDisciplineFormUrl,
    getDisciplineTypeUrl, saveDisciplineTypeUrl,
    getPersonalTaskFormUrl, savePersonalTaskFormUrl,
    getPositionUrl, savePositionUrl,
    getQualificationUrl, saveQualificationUrl,
    getReportingFormUrl, saveReportingFormUrl,
    getStepUrl, saveStepUrl,
    getStudyingFormUrl, saveStudyingFormUrl,
    getStudyingTermUrl, saveStudyingTermUrl, getStudyingTermByIdUrl,
    getStudyingTypeUrl, saveStudyingTypeUrl, getStudyingTypeByIdUrl,
    getSubjectNameUrl, saveSubjectNameUrl,
} = require("./url");

export const getRank = (token) => fetch(getRankUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => resp.json());

export const saveRank = (token, rank) => fetch(saveRankUrl, {
    method: "POST",
    headers: {
        "Authorization": token,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(rank)
}).then(resp => resp.json());

export const getBase = (token) => fetch(getBaseUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => resp.json());

export const saveBase = (token, base) => fetch(saveBaseUrl, {
    method: "POST",
    headers: {
        "Authorization": token,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(base)
}).then(resp => resp.json());

export const getCipher = (token) => fetch(getCipherUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => resp.json());

export const saveCipher = (token, cipher) => fetch(saveCipherUrl, {
    method: "POST",
    headers: {
        "Authorization": token,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(cipher)
}).then(resp => resp.json());

export const getDegree = (token) => fetch(getDegreeUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => resp.json());

export const saveDegree = (token, degree) => fetch(saveDegreeUrl, {
    method: "POST",
    headers: {
        "Authorization": token,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(degree)
}).then(resp => resp.json());

export const getDepartment = (token) => fetch(getDepartmentUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => resp.json());

export const saveDepartment = (token, department) => fetch(saveDepartmentUrl, {
    method: "POST",
    headers: {
        "Authorization": token,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(department)
}).then(resp => resp.json());

export const getDepartmentById = (token, id) => fetch(getDepartmentByIdUrl(id), {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => resp.json());

export const getDisciplineForm = (token) => fetch(getDisciplineFormUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => resp.json());

export const saveDisciplineForm = (token, form) => fetch(saveDisciplineFormUrl, {
    method: "POST",
    headers: {
        "Authorization": token,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
}).then(resp => resp.json());


export const getDisciplineType = (token) => fetch(getDisciplineTypeUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => resp.json());

export const saveDisciplineType = (token, type) => fetch(saveDisciplineTypeUrl, {
    method: "POST",
    headers: {
        "Authorization": token,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(type)
}).then(resp => resp.json());


export const getPersonalTaskForm = (token) => fetch(getPersonalTaskFormUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => resp.json());

export const savePersonalTaskForm = (token, form) => fetch(savePersonalTaskFormUrl, {
    method: "POST",
    headers: {
        "Authorization": token,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
}).then(resp => resp.json());

export const getPosition = (token) => fetch(getPositionUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => resp.json());

export const savePosition = (token, position) => fetch(savePositionUrl, {
    method: "POST",
    headers: {
        "Authorization": token,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(position)
}).then(resp => resp.json());

export const getQualification = (token) => fetch(getQualificationUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => resp.json());

export const saveQualification = (token, qualification) => fetch(saveQualificationUrl, {
    method: "POST",
    headers: {
        "Authorization": token,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(qualification)
}).then(resp => resp.json());

export const getReportingForm = (token) => fetch(getReportingFormUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => resp.json());

export const saveReportingForm = (token, form) => fetch(saveReportingFormUrl, {
    method: "POST",
    headers: {
        "Authorization": token,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
}).then(resp => resp.json());

export const getStep = (token) => fetch(getStepUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => resp.json());

export const saveStep = (token, step) => fetch(saveStepUrl, {
    method: "POST",
    headers: {
        "Authorization": token,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(step)
}).then(resp => resp.json());

export const getStudyingForm = (token) => fetch(getStudyingFormUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => resp.json());

export const saveStudyingForm = (token, form) => fetch(saveStudyingFormUrl, {
    method: "POST",
    headers: {
        "Authorization": token,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
}).then(resp => resp.json());

export const getStudyingTerm = (token) => fetch(getStudyingTermUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => resp.json());

export const getStudyingTermById = (token, id) => fetch(getStudyingTermByIdUrl(id), {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => resp.json());

export const saveStudyingTerm = (token, term) => fetch(saveStudyingTermUrl, {
    method: "POST",
    headers: {
        "Authorization": token,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(term)
}).then(resp => resp.json());

export const getStudyingType = (token) => fetch(getStudyingTypeUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => resp.json());

export const saveStudyingType = (token, type) => fetch(saveStudyingTypeUrl, {
    method: "POST",
    headers: {
        "Authorization": token,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(type)
}).then(resp => resp.json());

export const getStudyingTypeById = (token, id) => fetch(getStudyingTypeByIdUrl(id), {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => resp.json());

export const getSubjectName = (token) => fetch(getSubjectNameUrl, {
    method: "GET",
    headers: {
        "Authorization": token
    }
}).then(resp => resp.json());

export const saveSubjectNameData = (token, name) => fetch(saveSubjectNameUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": token
    },
    body: JSON.stringify(name)
}).then(resp => {
    if (resp.ok) {
        return resp.json();
    }
});