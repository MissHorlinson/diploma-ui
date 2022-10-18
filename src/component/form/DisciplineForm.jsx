import React, { useEffect, useState } from "react";

import MyInputValidator from "../UI/MyInputValdator";
import MySelect from "../UI/MySelect";

const disciplineInit = {
    subjectName: { id: '' },
    disciplineType: { id: '' },
    department: { id: '' },
    semester: '',
    cipher: '',
    disciplineNum: '',
    disciplineSubNum: '',
    plan: { id: '' },
    reporting: { disciplineReportingForm: { id: 2 } },
    auditoryHoursList: [{ disciplineForm: { id: '' }, hoursNum: '' }],
    independentHours: { hoursNum: '' },
    personalTaskList: [{ personalTaskForm: { id: '' } }]
}

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

    const [discipline, setDiscipline] = useState(disciplineInit)
    const [disciplineFullNum, setDisciplineFullNum] = useState('');

    useEffect(() => {
        if (disciplineForUpdate) {
            setDiscipline((old_) => ({
                ...old_, ...disciplineForUpdate
            }));
            setDisciplineFullNum(disciplineForUpdate.disciplineNum)
        } else
            console.log("no need to update")
    }, [disciplineForUpdate]);


    const semesterList = [...Array(semesterNum).keys()].map((item) => (
        {
            id: item + 1,
            name: item + 1
        }
    ))

    const setAuditoryHours = (index, val, key) => {
        console.log(disciplineInit)

        const auditoryList = discipline.auditoryHoursList;
        let oldValue = auditoryList[index];
        let newValue;
        if (key == "disciplineForm") {
            newValue = { ...oldValue, disciplineForm: { id: val } }
        } else if (key == "hoursNum") {
            newValue = { ...oldValue, hoursNum: val }
        }
        auditoryList[index] = newValue
        setValue({ auditoryHoursList: auditoryList })

        console.log(disciplineInit)
    }

    const setPersonalTask = (val, index) => {
        const taskList = discipline.personalTaskList;
        let oldValue = taskList[index];
        let newValue = { personalTaskForm: { id: val } }
        taskList[index] = newValue;
        setValue({ personalTaskList: taskList })
    }


    const addAuditoryHours = () => {
        discipline.auditoryHoursList.push({
            disciplineForm: { id: '' },
            hoursNum: ''
        })
        setValue({ auditoryHoursList: discipline.auditoryHoursList })
    }

    const addPersonalTask = () => {
        discipline.personalTaskList.push({ personalTaskForm: { id: '' } })
        setValue({ personalTaskList: discipline.personalTaskList })
    }

    const setValue = (data) => {
        setDiscipline(((old_) => ({
            ...old_, ...data
        })))
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

        const finaldiscipline = { ...discipline, disciplineNum: num, disciplineSubNum: subNum }
        onCreate(finaldiscipline);
        setDisciplineFullNum('');
        setDiscipline({ ...disciplineInit, personalTaskList: [{}], auditoryHoursList: [{}] });
    }

    console.log(discipline)

    return (
        <div className="container">
            <div className="form-group">
                <label>Тип дисциплины</label>
                <MySelect
                    value={discipline.disciplineType?.id}
                    onChange={(type) => setValue({ disciplineType: { id: type } })}
                    defaultValue="Тип дисциплины"
                    options={disciplineTypeList} />
            </div>

            <div className="form-group">
                <label>Шифр</label>
                <MyInputValidator
                    value={discipline.cipher}
                    onText={text => setValue({ cipher: text })}
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
                    // value={discipline.disciplineNum}
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
                    value={discipline.subjectName?.id}
                    onChange={type => setValue({ subjectName: { id: type } })}
                    defaultValue="Название дисциплины"
                    options={subjectNameList} />
            </div>

            <div className="form-group">
                <label>Кафедра</label>
                <MySelect
                    value={discipline.department?.id}
                    onChange={(type) => setValue({ department: { id: type } })}
                    defaultValue="Кафедра"
                    options={departmentList} />
            </div>


            <div className="form-group">
                <label>Семестр</label>
                <MySelect
                    value={discipline.semester}
                    onChange={(type) => setValue({ semester: type })}
                    defaultValue="Семестр"
                    options={semesterList} />
            </div>
            <div className="form-group" >
                <label>Отчетность</label>
                <MySelect
                    value={discipline?.reporting?.disciplineReportingForm?.id}
                    onChange={(type) => setValue({ reporting: { disciplineReportingForm: { id: type } } })}
                    defaultValue="Отчетность"
                    options={reportingformList} />
            </div>

            <label>Аудиторные часы</label>
            {
                discipline.auditoryHoursList &&
                discipline.auditoryHoursList.map((item, i) => (
                    <div style={{ display: "flex", flexDirection: "row" }} key={i}>
                        <div className="form-group" style={{ margin: 2, flex: 1.5 }}>
                            <MySelect
                                value={item.disciplineForm?.id}
                                onChange={(type) => setAuditoryHours(i, type, "disciplineForm")}
                                // onChange={(type) => setAuditoryHours('disciplineForm', type, i)}
                                defaultValue="Аудиторные часы"
                                options={disciplineFormList} />
                        </div>

                        <div className="form-group" style={{ margin: 2, flex: 1.25 }}>
                            <MyInputValidator
                                value={item.hoursNum}
                                onText={(text) => setAuditoryHours(i, text, "hoursNum")}
                                placeholder="Кол-во"
                                className="form-control"
                                check="^[0-9]+" />
                            <div className="invalid-feedback">
                                Can be only numbers
                            </div>
                        </div>
                        {
                            discipline.auditoryHoursList.length - 1 !== i ?
                                <div style={{ flex: 0.29 }}></div>

                                :
                                <button style={{ backgroundColor: "transparent", borderColor: "transparent", flex: 0.25 }}>
                                    <img src={require(`../../icon/plusIcon.png`)} alt="+" onClick={() => addAuditoryHours()} />
                                </button>
                        }

                    </div>
                ))
            }


            <div className="form-group">
                <label>Самостоятельные часы</label>
                <MyInputValidator
                    value={discipline.independentHours?.hoursNum}
                    onText={text => setValue({ independentHours: { hoursNum: text } })}
                    placeholder="Самостоятельные часы"
                    className="form-control"
                    check="^[0-9]+" />
                <div className="invalid-feedback">
                    Can be only numbers
                </div>
            </div>


            <label>Индивидуальное задание</label>
            {
                discipline.personalTaskList &&
                discipline.personalTaskList.map((item, i) => (
                    <div style={{ display: "flex", flexDirection: "row" }} key={i}>
                        <div className="form-group" style={{ flex: 2.75 }}>
                            <MySelect
                                value={item.personalTaskForm?.id}
                                onChange={(type) => setPersonalTask(type, i)}
                                defaultValue="Индивидуальное задание"
                                options={personalTaskFormList} />
                        </div>
                        {
                            discipline.personalTaskList.length - 1 !== i ?
                                <button style={{ backgroundColor: "transparent", borderColor: "transparent", flex: 0.25 }}>
                                    <img src={require(`../../icon/checkIcon.png`)} alt="!" />
                                </button>
                                :
                                <button style={{ backgroundColor: "transparent", borderColor: "transparent", flex: 0.25 }}>
                                    <img src={require(`../../icon/plusIcon.png`)} alt="+" onClick={() => addPersonalTask()} />
                                </button>
                        }

                    </div>
                ))
            }

            <div style={{ textAlign: "center", margin: "5px" }}>
                <button className="btn btn-info" onClick={saveDiscipline}>Save</button>
                <button className="btn btn-danger" onClick={() => {
                    setDisciplineFullNum('');
                    setDiscipline({ ...disciplineInit, personalTaskList: [{}], auditoryHoursList: [{}] });
                    onCancel()
                }}>Cancel</button>
            </div>


        </div >
    )
}
export default DisciplineForm;