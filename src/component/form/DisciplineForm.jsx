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
    onCancel,
    onCreate,
    saveNewSubjectName
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

    const [addSubjectNameVisible, setAddSubjectNameVisible] = useState("none");
    const [subjectNameVisible, setSubjectNameVisible] = useState("contents");
    const [subjectNameForSave, setSubjectNameForSave] = useState('');

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
        setAddSubjectNameVisible('none');
        setSubjectNameForSave('');
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

    useEffect(() => { clearForm() }, [])

    const semesterList = [...Array(semesterNum).keys()].map((item) => (
        {
            id: item + 1,
            name: item + 1
        }
    ))

    const setAuditory = (index, val, key, id_) => {
        let oldValue = auditoryHours[index];
        let newValue;
        if (key == "disciplineForm") {
            newValue = { ...oldValue, disciplineForm: { id: val }, disciplineFormId: val, id: id_ }
        } else if (key == "hoursNum") {
            newValue = { ...oldValue, hoursNum: val, id: id_ }
        }
        auditoryHours[index] = newValue
        setAuditoryHours(auditoryHours)
    }

    const setPersonalTask = (val, index, id_) => {
        let newValue = { personalTaskForm: { id: val }, personalTaskFormId: val, id: id_ }
        personalTasks[index] = newValue;
        setPersonalTasks(personalTasks)
    }

    const addAuditoryHours = () => {
        setAuditoryHours((hours) => [...hours, {}]);
    }

    const removeAuditoryHours = (index) => {
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

        let auditoryH;
        let personalT;
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
        if (reporting > 0) {
            reporting_ = ({
                disciplineReportingForm: {
                    id: reporting
                }
            })
        }

        console.log(independentHours)
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
            cipher: cipher,
            disciplineNum: num,
            disciplineSubNum: subNum,
            reporting: reporting_,
            independentHours: indepndentHours_,
            auditoryHoursList: auditoryH,
            personalTaskList: personalT
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
    }

    const saveSubjectName = () => {
        setAddSubjectNameVisible("none");
        const subjectName_ = { name: subjectNameForSave }
        saveNewSubjectName(subjectName_)
        setSubjectNameForSave('');
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
                    check="[А-Я][а-я]*$" />
                <div className="invalid-feedback">
                    Шифр повинен складатися лише з літер: ОКЗ, ОКП, ВК
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
                    Може складатися лише з цифр та крапки
                </div>
            </div>

            {/* TODO fix visibility for input and set inputed subject like selected  */}
            <div className="form-group">
                <label>Название дисциплины</label>
                {/* <div style={{ display: subjectNameVisible }}> */}
                <div className="flexRow">
                    <MySelect
                        value={subjectName}
                        onChange={type => setSubjectName(type)}
                        defaultValue="Название дисциплины"
                        options={subjectNameList} />
                    <button className="transparentBtn">
                        <img src={require(`../../icon/plusIcon.png`)} alt="+" onClick={addSubjectName} />
                    </button>
                </div>
                {/* </div> */}
                <div style={{ display: addSubjectNameVisible }}>
                    <div className="flexRow">
                        <MyInputValidator
                            value={subjectNameForSave}
                            onText={text => setSubjectNameForSave(text)}
                            placeholder="Название предмета"
                            className="form-control"
                            check="[a-z A-Z]*$" />
                        <button className="transparentBtn">
                            <img src={require(`../../icon/checkIcon.png`)} alt="+" onClick={saveSubjectName} />
                        </button>
                    </div>
                </div>
            </div>


            {/* TODO  add NEW Department form */}
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


            <div className="form-group">
                <label>Самостоятельные часы</label>
                <MyInputValidator
                    value={independentHours?.hoursNum}
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