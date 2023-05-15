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
    semesterList,
    disciplineForUpdate,
    onCancel,
    onCreate,
    saveNewSubjectName, newSavedSubjectName
}) => {
    const [subjectName, setSubjectName] = useState('');
    const [disciplineType, setDisciplineType] = useState('');
    const [department, setDepartment] = useState('');
    const [semester, setSemester] = useState('');
    const [cipher, setCipher] = useState('');
    const [disciplineFullNum, setDisciplineFullNum] = useState('');
    const [reporting, setReporting] = useState(2);
    const [independentHours, setIndependentHours] = useState('');
    const [independentHoursId, setIndependentHoursId] = useState('');
    const [personalTasks, setPersonalTasks] = useState([]);
    const [auditoryHours, setAuditoryHours] = useState([]);
    const [subgroupNum, setSubgroupNum] = useState('');

    const [auditoryHoursToRemove, setAuditoryHoursToRemove] = useState([])

    const [addSubjectNameVisible, setAddSubjectNameVisible] = useState("none");
    const [subjectNameVisible, setSubjectNameVisible] = useState("inline");
    const [subjectNameForSave, setSubjectNameForSave] = useState('');

    const [addDepartmentVisible, setAddDepartmentVisible] = useState("none");
    const [departmentVisible, setDepartmentVisible] = useState("inline");
    const [departmentForSave, setDepartmentForSave] = useState('');

    const [subgroupVisible, setSubgroupVisible] = useState("none");

    const clearForm = () => {
        setSubjectName('');
        setDisciplineType('');
        setDepartment('');
        setSemester('');
        setCipher('');
        setDisciplineFullNum('');
        setReporting(2);
        setIndependentHours('');
        setIndependentHoursId('');
        setPersonalTasks([]);
        setAuditoryHours([]);
        setAddSubjectNameVisible('none');
        setSubjectNameForSave('');
        setAuditoryHoursToRemove([]);
        setSubgroupVisible('none');
        setSubgroupNum('')
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
            setIndependentHoursId(disciplineForUpdate.independentHoursId);
            setPersonalTasks(disciplineForUpdate.personalTaskList);
            setAuditoryHours(disciplineForUpdate.auditoryHoursList);
        }
        else {
            clearForm();
        }
    }, [disciplineForUpdate]);

    useEffect(() => {
        if (disciplineType) {
            setCipher(disciplineTypeList[disciplineType - 1].cipher)
        }

    }, [disciplineType])

    useEffect(() => { clearForm() }, [])

    const setAuditory = (index, val, key, id_) => {
        let oldValue = auditoryHours[index];
        let newValue;
        if (key === "disciplineForm") {
            console.log(val)
            newValue = { ...oldValue, disciplineForm: { id: val }, disciplineFormId: val, id: id_ }
        } else if (key === "hoursNum") {
            newValue = { ...oldValue, hoursNum: val, id: id_ }
        }
        auditoryHours[index] = newValue
        setAuditoryHours(auditoryHours)
    }

    const setPersonalTask = (val, index, id_) => {
        let newValue = { personalTaskFormId: val, id: id_ }
        personalTasks[index] = newValue;
        setPersonalTasks(personalTasks)
    }

    const addAuditoryHours = () => {
        setAuditoryHours((hours) => [...hours, {}]);
    }

    const removeAuditoryHours = (index) => {
        if (auditoryHours[index].id !== null) {
            setAuditoryHoursToRemove(hours_ => [...hours_, ({ id: auditoryHours[index].id })])
        }
        auditoryHours.splice(index, 1);
        setAuditoryHours([...auditoryHours])
    }

    const addPersonalTask = () => {
        setPersonalTasks((tasks) => [...tasks, {}]);
    }

    const saveDiscipline = (e) => {
        e.preventDefault();
        let num = 0;
        let subNum = 0;
        if (disciplineFullNum.includes(".")) {
            const numArray = disciplineFullNum.split(".");
            num = numArray[0];
            subNum = numArray[1];
        } else {
            num = disciplineFullNum;
        }

        let auditoryH = [];
        let personalT = [];
        let disciplineId = null;

        if (disciplineForUpdate) {
            disciplineId = disciplineForUpdate.id;
            auditoryH = auditoryHours.map((item) => ({
                id: item.id,
                disciplineForm: { id: item.disciplineFormId },
                hoursNum: item.hoursNum,
            }))

            personalT = personalTasks.map((item) => ({
                id: item.id,
                personalTaskForm: { id: item.personalTaskFormId }
            }))
        } else {
            auditoryH = auditoryHours;
            personalT = personalTasks;
        }

        let reporting_ = null;
        if (disciplineForUpdate) {
            reporting_ = ({
                id: disciplineForUpdate.reportingId,
                disciplineReportingForm: {
                    id: reporting
                }
            })
        } else if (reporting > 0) {
            reporting_ = ({
                disciplineReportingForm: {
                    id: reporting
                }
            })
        }

        let indepndentHours_ = null;
        if (independentHours) {
            indepndentHours_ = {
                id: independentHoursId,
                hoursNum: independentHours
            }
        }

        const finaldiscipline = {
            id: disciplineId,
            subjectName: { id: subjectName },
            disciplineType: { id: disciplineType },
            department: { id: department },
            semester: semester,
            disciplineNum: num,
            disciplineSubNum: subNum,
            reporting: reporting_,
            independentHours: indepndentHours_,
            auditoryHoursList: auditoryH,
            personalTaskList: personalT,
            auditoryHoursToRemove: auditoryHoursToRemove,
            subgroupNum: subgroupNum
        }
        onCreate(finaldiscipline);
        clearForm();
    }

    const cancelBtn = () => {
        clearForm();
        onCancel();
    }

    const addSubjectName = () => {
        setAddSubjectNameVisible("inline");
        setSubjectNameVisible("none")
    }

    const saveSubjectName = () => {
        setAddSubjectNameVisible("none");
        const subjectName_ = { name: subjectNameForSave }
        saveNewSubjectName(subjectName_);
        setSubjectNameForSave('');
        setSubjectNameVisible("inline")
    }

    const addDepartment = () => {
        setAddDepartmentVisible("inline");
        setDepartmentVisible("none")
    }

    const saveDepartment = () => {
        setAddDepartmentVisible("none");
        const department_ = { name: departmentForSave }
        saveNewSubjectName(department_);
        setDepartmentForSave('');
        setDepartmentVisible("inline")
    }

    useEffect(() => {
        setSubjectName(newSavedSubjectName)
    }, [newSavedSubjectName])

    useEffect(() => {
        if (auditoryHours.find(hour_ => hour_.disciplineFormId === "2" || hour_.disciplineFormId === "3")) {
            setSubgroupVisible("inline")
        } else {
            setSubgroupVisible("none")
        }
    }, [auditoryHours])

    return (
        <div className="container">
            <div className="form-group">
                <label>Тип дисципліни</label>
                <MySelect
                    value={disciplineType}
                    onChange={(type) => setDisciplineType(type)}
                    defaultValue="Тип дисципліни"
                    options={disciplineTypeList} />
            </div>

            <div className="form-group">
                <label>Шифр</label>
                <MyInputValidator
                    value={cipher}
                    readOnly
                    placeholder="Шифр"
                    className="form-control"
                    check="[А-Я][а-я]*$" />
                <div className="invalid-feedback">
                    Шифр повинен складатися лише з літер: ОКЗ, ОКП, ВК
                </div>
            </div>

            < div className="form-group" >
                <label>Номер</label>
                <MyInputValidator
                    value={disciplineFullNum}
                    onText={(text) => setDisciplineFullNum(text)}
                    placeholder="Номер"
                    className="form-control"
                    check="[0-9.0-9]+$" />
                <div className="invalid-feedback">
                    Може складатися лише з цифр та крапки
                </div>
            </div >

            <div className="form-group" >
                <label>Назва дисципліни</label>
                <div style={{ display: subjectNameVisible }}>
                    <div className="flexRow">
                        <MySelect
                            value={subjectName}
                            onChange={type => setSubjectName(type)}
                            defaultValue="Назва дисципліни"
                            options={subjectNameList} />
                        <button className="transparentBtn">
                            <img src={require(`../../icon/plusIcon.png`)} alt="+" onClick={addSubjectName} />
                        </button>
                    </div>
                </div>
                <div style={{ display: addSubjectNameVisible }}>
                    <div className="flexRow">
                        <MyInputValidator
                            value={subjectNameForSave}
                            onText={text => setSubjectNameForSave(text)}
                            placeholder="Назва дисципліни"
                            className="form-control"
                            check="[a-z A-Z]*$" />
                        <button className="transparentBtn">
                            <img src={require(`../../icon/checkIcon.png`)} alt="+" onClick={saveSubjectName} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <label>Кафедра</label>
                <div style={{ display: departmentVisible }}>
                    <div className="flexRow">
                        <MySelect
                            value={department}
                            onChange={(type) => setDepartment(type)}
                            defaultValue="Кафедра"
                            options={departmentList} />
                        <button className="transparentBtn">
                            <img src={require(`../../icon/plusIcon.png`)} alt="+" onClick={addDepartment} />
                        </button>
                    </div>
                </div>
                <div style={{ display: addDepartmentVisible }}>
                    <div className="flexRow">
                        <MyInputValidator
                            value={departmentForSave}
                            onText={text => setDepartmentForSave(text)}
                            placeholder="Назва кафедри"
                            className="form-control"
                            check="[a-z A-Z]*$" />
                        <button className="transparentBtn">
                            <img src={require(`../../icon/checkIcon.png`)} alt="+" onClick={saveDepartment} />
                        </button>
                    </div>
                </div>
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
                <label>Звітність</label>
                <MySelect
                    value={reporting}
                    onChange={(type) => setReporting(type)}
                    defaultValue="Звітність"
                    options={reportingformList} />
            </div>

            <label>Аудиторні години</label>
            {
                auditoryHours.length > 0 ? auditoryHours.map((item, i) => (
                    <div key={i}>
                        <AuditoryHourItem
                            item={item}
                            index={i}
                            disciplineFormList={disciplineFormList}
                            setAuditory={setAuditory}
                            addAuditoryHours={addAuditoryHours}
                            removeAuditoryHours={removeAuditoryHours}
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

            <div className="form-group" style={{ display: subgroupVisible }}>
                <label>Кількість підгруп</label>
                <MyInputValidator
                    value={subgroupNum}
                    onText={text => setSubgroupNum(text)}
                    placeholder="Кількість підгруп"
                    className="form-control"
                    check="^[0-9]+" />
                <div className="invalid-feedback">
                    Може бути тільки числовим значенням
                </div>
            </div>

            <div className="form-group">
                <label>Самостійні години</label>
                <MyInputValidator
                    value={independentHours}
                    onText={text => setIndependentHours(text)}
                    placeholder="Самостійні години"
                    className="form-control"
                    check="^[0-9]+" />
                <div className="invalid-feedback">
                    Може бути тільки числовим значенням
                </div>
            </div>


            <label>Індивідуальні завдання</label>
            {
                personalTasks.length > 0 ? personalTasks.map((item, i) => (
                    <div key={i}>
                        <PersonalTaskItem
                            item={item}
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

            <div className="text-center m-1">
                <button className="btn btn-success m-1" onClick={saveDiscipline}>Зберегти</button>
                <button className="btn btn-danger m-1" onClick={cancelBtn}>Відміна</button>
            </div>
        </div >
    )
}
export default DisciplineForm;