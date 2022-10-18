import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import { useFetching } from "../../hooks/useFetching";

import { getDisciplineType, getReportingForm, getDisciplineForm, getPersonalTaskForm, getSubjectName, getDepartment } from "../../API/UtilDataService";
import { getDisciplineByPlan, getSemesterNum, getDisciplineById, saveDisciplineData } from "../../API/PlanInfoService";

import MyModal from "../UI/MyModal";
import DisciplineForm from "../form/DisciplineForm";
import PlanDisciplineList from "../list/PlanDisciplineList";

const Discipline = () => {
    const { planId } = useParams();

    const [disciplineForUpdate, setDisciplineForUpdate] = useState(null);

    const [disciplineList, setDisciplineList] = useState([]);
    const [disciplineTypeList, setDisciplineTypeList] = useState([]);
    const [disciplineFormList, setDisciplineFormList] = useState([]);
    const [reportingformList, setReportingFormList] = useState([]);
    const [personalTaskFormList, setPersonalTaskFormList] = useState([]);
    const [subjectNameList, setSubjectNameList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const [semestNum, setSemesterNum] = useState(0);

    const [modal, setModal] = useState(false);
    const [btnClass, setBtnClass] = useState('updateControlBtn');

    const [fetchDisciplineData, isListLoading, listError] = useFetching(async () => {

        getDisciplineByPlan(planId).then((disciplines) => setDisciplineList(disciplines));
        getDisciplineType().then((types) => setDisciplineTypeList(types));
        getDisciplineForm().then((forms) => setDisciplineFormList(forms));
        getPersonalTaskForm().then((personal) => setPersonalTaskFormList(personal));
        getReportingForm().then((reporting) => setReportingFormList(reporting));
        getSubjectName().then((subjects) => setSubjectNameList(subjects));
        getDepartment().then((departments) => setDepartmentList(departments));
        getSemesterNum(planId).then((num) => setSemesterNum(num));
    })

    useEffect(() => {
        fetchDisciplineData();
    }, [])


    const saveDiscipline = (data) => {
        Object.assign(data, { plan: { id: planId } })
        delete data.disciplineFormId;
        data.auditoryHoursList.map((item) => delete item.disciplineFormId)
        console.log(JSON.stringify(data));
        // saveDisciplineData(data).then((resp_) => {
        //     console.log(resp_)
        //     let objIndex = disciplineList.findIndex((obj) => obj.id === resp_.id);
        //     if (objIndex === -1) {
        //         setDisciplineList([...disciplineList, resp_]);
        //         // .sort((a, b) => a.id.localeCompare(b.id))
        //     } else {
        //         disciplineList[objIndex] = resp_;
        //         setDisciplineList([...disciplineList]);
        //     }
        //     setModal(false);
        // })
        setModal(false);
    }

    const getForEdit = (id) => {
        getDisciplineById(id).then((data) => {
            setDisciplineForUpdate(data)
        });
        setModal(true);
    }

    return (
        <div className="container">
            <button style={{ margin: "10px" }} className="btn btn-warning" onClick={() => setModal(true)}>Add Discipline</button>
            <MyModal visible={modal} setVisible={setModal}>
                <DisciplineForm
                    disciplineTypeList={disciplineTypeList}
                    disciplineFormList={disciplineFormList}
                    reportingformList={reportingformList}
                    personalTaskFormList={personalTaskFormList}
                    subjectNameList={subjectNameList}
                    departmentList={departmentList}
                    semesterNum={semestNum}
                    disciplineForUpdate={disciplineForUpdate}
                    btnClass={btnClass}
                    onCancel={() => setModal(false)}
                    onCreate={saveDiscipline} />
            </MyModal>
            <PlanDisciplineList disciplineList={disciplineList} onUpdate={getForEdit} />
        </div>
    )
}

export default Discipline;