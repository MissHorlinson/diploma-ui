import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useFetching } from "../../hooks/useFetching";

import { getDisciplineType, getReportingForm, getDisciplineForm, getPersonalTaskForm, getSubjectName, getSemesterNum } from "../../API/UtilDataService";

import MyInputValidator from "../UI/MyInputValdator";
import MySelect from "../UI/MySelect";

const initVal = {
    disciplinePlanInfo: "",
    subjectName: { id: "" },
    disciplineType: { id: "" },
    department: { id: "" },
    semester: "",
    disciplineNum: "",
    disciplineSubNum: "",
    auditoryHoursSet: [],
    personalTasksSet: [],
    independentHoursSet: []
}

const DisciplineForm = () => {
    const { planId } = useParams();

    const [disciplineTypeList, setDisciplineTypeList] = useState([]);
    const [disciplineFormList, setDisciplineFormList] = useState([]);
    const [reportingformList, setReportingFormList] = useState([]);
    const [personalTaskFormList, setPersonalTaskFormList] = useState([]);
    const [subjectNameList, setSubjectNameList] = useState([]);


    const [fetchUtilData, isListLoading, listError] = useFetching(async () => {
        getDisciplineType().then((types) => setDisciplineTypeList(types));
        getDisciplineForm().then((forms) => setDisciplineFormList(forms));
        getPersonalTaskForm().then((personal) => setPersonalTaskFormList(personal));
        getReportingForm().then((reporting) => setReportingFormList(reporting));
        getSubjectName().then((subjects) => setSubjectNameList(subjects))


        // getSemesterNum(planId).then((num) => {
        //     setFullWeeksPlanList([...Array(num).keys()].map((item) => (
        //         {
        //             semester: item + 1,
        //             weeks: [
        //                 {
        //                     ...initVal, weekPlanInfo: { id: planId }, semester: item + 1
        //                 }
        //             ]
        //         }
        //     )))
        // });
    })

    useEffect(() => {
        fetchUtilData();
    }, [])


    return (
        <div className="container text-center">
            <div className="form-group" style={{ margin: 2, flex: 1.5 }}>
                <MySelect
                    // value={weeks[i].studuingTypeList}
                    // onChange={(type) => studyingTypeSet(week, type, id)}
                    defaultValue="Тип дисциплины"
                    options={disciplineTypeList} />
            </div>

            <div className="form-group" style={{ margin: 2, flex: 1.5 }}>
                <MySelect
                    // value={weeks[i].studuingTypeList}
                    // onChange={(type) => studyingTypeSet(week, type, id)}
                    defaultValue="Название дисциплины"
                    options={subjectNameList} />
            </div>

            {/* <div className="form-group" style={{ margin: 2, flex: 1.5 }}>
                <MySelect
                    // value={weeks[i].studuingTypeList}
                    // onChange={(type) => studyingTypeSet(week, type, id)}
                    defaultValue="Кафедра"
                    options={disciplineTypeList} />
            </div> */}

            <div className="form-group" style={{ margin: 2, flex: 1.5 }}>
                <MySelect
                    // value={weeks[i].studuingTypeList}
                    // onChange={(type) => studyingTypeSet(week, type, id)}
                    defaultValue="Отчетность"
                    options={reportingformList} />
            </div>

            <div className="form-group" style={{ margin: 2, flex: 1.5 }}>
                <MySelect
                    // value={weeks[i].studuingTypeList}
                    // onChange={(type) => studyingTypeSet(week, type, id)}
                    defaultValue="Аудиторные часы"
                    options={disciplineFormList} />
            </div>

            <div className="form-group" style={{ margin: 2, flex: 1.5 }}>
                <MySelect
                    // value={weeks[i].studuingTypeList}
                    // onChange={(type) => studyingTypeSet(week, type, id)}
                    defaultValue="Индивидуальное задание"
                    options={personalTaskFormList} />
            </div>

            <div className="form-group" style={{ margin: 2, flex: 1 }}>
                <MyInputValidator
                    // value={week.startWeek}
                    // onText={text => setValue('startWeek', text, id)}
                    placeholder="Шифр"
                    className="form-control"
                    check="^[0-9]+" />
                <div className="invalid-feedback">
                    Can be only numbers
                </div>
            </div>

            <div className="form-group" style={{ margin: 2, flex: 1 }}>
                <MyInputValidator
                    // value={week.startWeek}
                    // onText={text => setValue('startWeek', text, id)}
                    placeholder="Номер"
                    className="form-control"
                    check="^[0-9]+" />
                <div className="invalid-feedback">
                    Can be only numbers
                </div>
            </div>

            <div className="form-group" style={{ margin: 2, flex: 1 }}>
                <MyInputValidator
                    // value={week.startWeek}
                    // onText={text => setValue('startWeek', text, id)}
                    placeholder="Самостоятельные часы"
                    className="form-control"
                    check="^[0-9]+" />
                <div className="invalid-feedback">
                    Can be only numbers
                </div>
            </div>

        </div>
    )
}
export default DisciplineForm;