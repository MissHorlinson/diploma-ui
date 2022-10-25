import React, { useEffect, useState } from "react";

import MyInputValidator from "../UI/MyInputValdator";
import MySelect from "../UI/MySelect";


import PersonalTaskItem from "../PersonalTaskItem";
import AuditoryHourItem from "../AuditoryHourItem";


const DisciplineForm = ({
    disciplineTypeList,
    disciplineFormList,
    reportingformList,
    personalTaskFormList,
    subjectNameList,
    departmentList,
    semesterNum,
    disciplineForUpdate,
    btnClass,
    onCancel,
    onCreate
}) => {
    const [subjectName, setSubjectName] = useState('');
    const [disciplineType, setDisciplineType] = useState('');
    const [department, setDepartment] = useState('');
    const [semester, setSemester] = useState('');
    const [cipher, setCipher] = useState('');
    const [disciplineFullNum, setDisciplineFullNum] = useState('');
    const [reporting, setReporting] = useState(2);
    const [independentHours, setIndependentHours] = useState('');
    const [personalTasks, setPersonalTasks] = useState([]);
    const [auditoryHours, setAuditoryHours] = useState([]);

    const clearForm = () => {
        setSubjectName('');
        setDisciplineType('');
        setDepartment('');
        setSemester('');
        setCipher('');
        setDisciplineFullNum('');
        setReporting(2);
        setIndependentHours('');
        setPersonalTasks([]);
        setAuditoryHours([]);
    }

    useEffect(() => {
        if (disciplineForUpdate) {
            setSubjectName(disciplineForUpdate.subjectNameId);
            setDisciplineType(disciplineForUpdate.disciplineTypeId);
            setDepartment(disciplineForUpdate.departmentId);
            setSemester(disciplineForUpdate.semester);
            setCipher(disciplineForUpdate.cipher);
            setDisciplineFullNum(disciplineForUpdate.disciplineNum);
            setReporting(2);
            setIndependentHours(disciplineForUpdate.independentHours);
            setPersonalTasks(disciplineForUpdate.personalTaskList);
            setAuditoryHours(disciplineForUpdate.auditoryHoursList);
        }
        else {
            clearForm();
        }
    }, [disciplineForUpdate]);

    const semesterList = [...Array(semesterNum).keys()].map((item) => (
        {
            id: item + 1,
            name: item + 1
        }
    ))

    const setAuditory = (index, val, key) => {
        let oldValue = auditoryHours[index];
        let newValue;
        if (key == "disciplineForm") {
            newValue = { ...oldValue, disciplineForm: { id: val } }
        } else if (key == "hoursNum") {
            newValue = { ...oldValue, hoursNum: val }
        }
        auditoryHours[index] = newValue
        setAuditoryHours(auditoryHours)
    }

    const setPersonalTask = (val, index) => {
        console.log(val, index)
        let newValue = { personalTaskForm: { id: val } }
        personalTasks[index] = newValue;
        setPersonalTasks(personalTasks)
    }

    const addAuditoryHours = () => {
        setAuditoryHours((hours) => [...hours, {}]);
    }

    const addPersonalTask = () => {
        setPersonalTasks((tasks) => [...tasks, {}]);
    }

    const saveDiscipline = (e) => {
        e.preventDefault();
        console.log(disciplineFullNum)
        let num = 0;
        let subNum = 0;
        if (disciplineFullNum.includes(".")) {
            const numArray = disciplineFullNum.split(".");
            num = numArray[0];
            subNum = numArray[1];
        }

        let auditoryH;
        let personalT;
        let disciplineId = null;

        if (disciplineForUpdate) {
            disciplineId = disciplineForUpdate.id;
            auditoryH = auditoryHours.map((item) => ({
                disciplineForm: { id: item.disciplineFormId },
                hoursNum: item.hoursNum
            }))

            personalT = personalTasks.map((item) => ({
                personalTaskForm: { id: item.personalTaskFormId }
            }))
        } else {
            auditoryH = auditoryHours;
            personalT = personalTasks;
        }

        const finaldiscipline = {
            id: disciplineId,
            subjectName: { id: subjectName },
            disciplineType: { id: disciplineType },
            department: { id: department },
            semester: semester,
            cipher: cipher,
            disciplineNum: num,
            disciplineSubNum: subNum,
            reporting: { id: reporting },
            independentHours: { hoursNum: independentHours },
            auditoryHoursList: auditoryH,
            personalTaskList: personalT
        }
        onCreate(finaldiscipline);
        // clearForm();
    }

    const cancelBtn = () => {
        // clearForm();
        onCancel()
    }

    return (
        <div className="container">
            <div className="form-group">
                <label>Тип дисциплины</label>
                <MySelect
                    value={disciplineType}
                    onChange={(type) => setDisciplineType(type)}
                    defaultValue="Тип дисциплины"
                    options={disciplineTypeList} />
            </div>

            <div className="form-group">
                <label>Шифр</label>
                <MyInputValidator
                    value={cipher}
                    onText={text => setCipher(text)}
                    placeholder="Шифр"
                    className="form-control"
                    check="[A-Z][a-z]*$" />
                <div className="invalid-feedback">
                    Can be only numbers
                </div>
            </div>

            <div className="form-group">
                <label>Номер</label>
                <MyInputValidator
                    value={disciplineFullNum}
                    onText={(text) => setDisciplineFullNum(text)}
                    placeholder="Номер"
                    className="form-control"
                    check="[0-9.0-9]+$" />
                <div className="invalid-feedback">
                    Can be only numbers
                </div>
            </div>

            <div className="form-group">
                <label>Название дисциплины</label>
                <MySelect
                    value={subjectName}
                    onChange={type => setSubjectName(type)}
                    defaultValue="Название дисциплины"
                    options={subjectNameList} />
            </div>

            <div className="form-group">
                <label>Кафедра</label>
                <MySelect
                    value={department}
                    onChange={(type) => setDepartment(type)}
                    defaultValue="Кафедра"
                    options={departmentList} />
            </div>


            <div className="form-group">
                <label>Семестр</label>
                <MySelect
                    value={semester}
                    onChange={(type) => setSemester(type)}
                    defaultValue="Семестр"
                    options={semesterList} />
            </div>
            <div className="form-group" >
                <label>Отчетность</label>
                <MySelect
                    value={reporting}
                    onChange={(type) => setReporting(type)}
                    defaultValue="Отчетность"
                    options={reportingformList} />
            </div>

            <label>Аудиторные часы</label>
            {
                auditoryHours.length > 0 ? auditoryHours.map((item, i) => (
                    <div key={i}>
                        <AuditoryHourItem
                            item={item}
                            index={i}
                            disciplineFormList={disciplineFormList}
                            setAuditory={setAuditory}
                            addAuditoryHours={addAuditoryHours}
                            isLast={auditoryHours.length - 1 === i} />
                    </div>
                ))
                    :
                    <AuditoryHourItem
                        item={0}
                        index={0}
                        disciplineFormList={disciplineFormList}
                        setAuditory={setAuditory}
                        addAuditoryHours={addAuditoryHours}
                        isLast={true} />
            }


            <div className="form-group">
                <label>Самостоятельные часы</label>
                <MyInputValidator
                    value={independentHours}
                    onText={text => setIndependentHours(text)}
                    placeholder="Самостоятельные часы"
                    className="form-control"
                    check="^[0-9]+" />
                <div className="invalid-feedback">
                    Can be only numbers
                </div>
            </div>


            <label>Индивидуальное задание</label>
            {
                personalTasks.length > 0 ? personalTasks.map(({ personalTaskFormId }, i) => (
                    <div key={i}>
                        <PersonalTaskItem
                            item={personalTaskFormId}
                            index={i}
                            personalTaskFormList={personalTaskFormList}
                            setPersonalTask={setPersonalTask}
                            addPersonalTask={addPersonalTask}
                            isLast={personalTasks.length - 1 === i} />
                    </div>
                )) :
                    <div>
                        <PersonalTaskItem
                            item={0}
                            index={0}
                            personalTaskFormList={personalTaskFormList}
                            setPersonalTask={setPersonalTask}
                            addPersonalTask={addPersonalTask}
                            isLast={true} />
                    </div>
            }

            <div style={{ textAlign: "center", margin: "5px" }}>
                <button className="btn btn-info" onClick={saveDiscipline}>Save</button>
                <button className="btn btn-danger" onClick={() => cancelBtn()}>Cancel</button>
            </div>
        </div >
    )
}
export default DisciplineForm;