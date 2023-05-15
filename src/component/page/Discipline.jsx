import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { useParams } from "react-router";
import { useFetching } from "../../hooks/useFetching";

import { getDisciplineType, getReportingForm, getDisciplineForm, getPersonalTaskForm, getSubjectName, getDepartment, saveSubjectNameData } from "../../API/UtilDataService";
import { getDisciplineByPlan, getSemesterNum, getDisciplineById, saveDisciplineData } from "../../API/PlanInfoService";

import MyModal from "../UI/MyModal";
import DisciplineForm from "../form/DisciplineForm";
import PlanDisciplineList from "../list/PlanDisciplineList";

const httpStatusCodes = {
    200: "OK",
    400: "BAD_REQUEST",
    404: "NOT_FOUND",
    500: "INTERNAL_SERVER ERROR"
}

const Discipline = connect((user) => ({
    token: user.token
}))(({ token }) => {
    const { planId } = useParams();

    const [disciplineForUpdate, setDisciplineForUpdate] = useState(null);

    const [disciplineList, setDisciplineList] = useState([]);
    const [disciplineTypeList, setDisciplineTypeList] = useState([]);
    const [disciplineFormList, setDisciplineFormList] = useState([]);
    const [reportingformList, setReportingFormList] = useState([]);
    const [personalTaskFormList, setPersonalTaskFormList] = useState([]);
    const [subjectNameList, setSubjectNameList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const [semestList, setSemesterList] = useState([]);

    const [newSavedSubjectName, setNewSavedSubjectName] = useState('');

    const [modal, setModal] = useState(false);

    const [isError, setIsError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const [fetchDisciplineData, isListLoading, listError] = useFetching(async () => {

        getDisciplineByPlan(planId, token).then((resp_) => {
            if (resp_.status !== 200) {
                setIsError(true);
                setErrorMsg(httpStatusCodes[resp_.status])
            } else {
                setDisciplineList([...resp_.body]);
                setIsError(false);
            }
        });

        getDisciplineType(token).then((types) => setDisciplineTypeList(types));
        getDisciplineForm(token).then((forms) => setDisciplineFormList(forms));
        getPersonalTaskForm(token).then((personal) => setPersonalTaskFormList(personal));
        getReportingForm(token).then((reporting) => setReportingFormList(reporting));
        getSubjectName(token).then((subjects) => setSubjectNameList(subjects));
        getDepartment(token).then((departments) => setDepartmentList(departments));
        getSemesterNum(planId, token).then((num) => setSemesterList([...Array(num).keys()].map((item) => (
            {
                id: item + 1,
                name: item + 1
            }
        ))));
    });

    useEffect(() => {
        fetchDisciplineData();
    }, [])


    const saveDiscipline = (data) => {
        Object.assign(data, { plan: { id: planId } })
        data.auditoryHoursList.map((item) => delete item.disciplineFormId)
        data.personalTaskList.map((item) => delete item.personalTaskFormId)
        saveDisciplineData(data, token).then((resp_) => {
            let objIndex = disciplineList.findIndex((obj) => obj.id === resp_.id);
            if (objIndex === -1) {
                setDisciplineList([...disciplineList, resp_]);
            } else {
                disciplineList[objIndex] = resp_;
                setDisciplineList([...disciplineList]);
            }
            setModal(false);
        });
    }

    const saveNewSubjectName = (data) => {
        saveSubjectNameData(token, data).then((resp_) => {
            setSubjectNameList([...subjectNameList, resp_].sort((a, b) => a.name.localeCompare(b.name)));
            setNewSavedSubjectName(resp_.id)
        })
    }

    const getForEdit = (id) => {
        getDisciplineById(id, token).then((data) => {
            setDisciplineForUpdate(data)
        });
        setModal(true);
    }

    return (
        <div className="container">
            <button className="btn btn-warning m-3" onClick={() => { setDisciplineForUpdate(null); setModal(true) }}>Створити дисципліну</button>
            <MyModal visible={modal} setVisible={setModal}>
                <DisciplineForm
                    disciplineTypeList={disciplineTypeList}
                    disciplineFormList={disciplineFormList}
                    reportingformList={reportingformList}
                    personalTaskFormList={personalTaskFormList}
                    subjectNameList={subjectNameList}
                    departmentList={departmentList}
                    semesterList={semestList}
                    disciplineForUpdate={disciplineForUpdate}
                    onCancel={() => setModal(false)}
                    onCreate={saveDiscipline}
                    token={token}
                    saveNewSubjectName={saveNewSubjectName}
                    newSavedSubjectName={newSavedSubjectName} />
            </MyModal>

            {
                isError ?
                    <div className="alert alert-primary text-center">{errorMsg}</div>
                    :
                    <PlanDisciplineList disciplineList={disciplineList} onUpdate={getForEdit} />
            }

        </div>
    )
});

export default Discipline;