import React, { useState, useEffect } from "react";

import MyInputValidator from "../UI/MyInputValdator";
import MySelect from "../UI/MySelect";


const PlamInfoForm = ({ qualificationList,
    studyingTermList,
    baseList, cipherList,
    studyingFormList, stepList,
    planToUpdate,
    onCancel,
    onCreate,
    onCreateFromFile }) => {

    const [qualification, setQualification] = useState('');
    const [term, setTerm] = useState('');
    const [base, setBase] = useState('');
    const [step, setStep] = useState('');
    const [cipher, setCipher] = useState('');
    const [form, setForm] = useState('');
    const [year, setYear] = useState('');
    const [groupNum, setGroupNum] = useState('');
    const [studentNum, setStudentNum] = useState('');

    const [planFile, setPlanFile] = useState("");

    const [semesterCheck, setSemesterCheck] = useState([{ isCheck: false }, { isCheck: false }, { isCheck: false }, { isCheck: false }, { isCheck: false }, { isCheck: false }, { isCheck: false }, { isCheck: false }])


    const enableByField = term > 0 &&
        base > 0 &&
        step > 0 &&
        cipher > 0 &&
        form > 0 &&
        year.length > 0 &&
        qualification > 0;

    const enableByFile = planFile;

    const [fileInput, setFileInput] = useState("none");

    useEffect(() => {
        if (planToUpdate) {
            setQualification(planToUpdate.qualificationId);
            setTerm(planToUpdate.studyingTermId);
            setBase(planToUpdate.baseId);
            setStep(planToUpdate.stepId);
            setCipher(planToUpdate.planCipherId);
            setForm(planToUpdate.studyingFormId);
            setYear(planToUpdate.admissionYear?.replace("T00:00", ""));
            setGroupNum(planToUpdate.numberOfGroup);
            setStudentNum(planToUpdate.numberOfStudent);
            setSemesterCheck([...Array(planToUpdate.numberOfSemester).keys()].map((value_, index_) => ({
                isCheck: true,
                key: value_ + 1,
                value: value_ + 1,
            })))
        }
    }, [planToUpdate])

    useEffect(() => {
        clearStates();
    }, [])

    useEffect(() => {
        if (term) {
            setSemesterCheck([]);
            setSemesterCheck([...Array(studyingTermList[term - 1].semesterNum).keys()].map((value_, index_) => ({
                isCheck: true,
                key: value_ + 1,
                value: value_ + 1,
            })))
        }
    }, [term])

    useEffect(() => {
        if (qualification) {
            let stepId = stepList[qualification - 1]?.id;
            setStep(stepId.toString())
        }
    }, [qualification])

    const clearStates = () => {
        setQualification('');
        setTerm('');
        setBase('');
        setStep('');
        setCipher('');
        setForm('');
        setYear('');
        setGroupNum('');
        setStudentNum('');
        setSemesterCheck([]);
        setPlanFile('');
        document.getElementById("planFileInput").value = '';
        setFileInput('none');
    }

    const createFllPlanInfo = (e) => {
        e.preventDefault();

        if (planFile) {
            var formdata = new FormData();
            formdata.append("file", planFile);
            onCreateFromFile(formdata)
        } else {
            let day = year.split('T');
            let planId = planToUpdate ? planToUpdate.planId : null

            console.log(planToUpdate, planId)

            const fullPlan = {
                planId: planId,
                qualificationId: qualification,
                studyingTermId: term,
                baseId: base,
                stepId: step,
                planCipherId: cipher,
                studyingFormId: form,
                admissionYear: day[0] + 'T00:00:00',
                numberOfGroup: groupNum,
                numberOfStudent: studentNum,
                numberOfSemester: semesterCheck.length
            }
            onCreate(fullPlan);
        }
        clearStates();
    }

    const setSemester = (semester) => {
        const checkSem = document.getElementById(semester);
        if (checkSem.checked) {
            setSemesterCheck([...semesterCheck, { key: semester, value: semester, isCheck: true }])
        } else {
            setSemesterCheck(_sem => [..._sem.filter(({ key }) => key !== semester)])
        }
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            setPlanFile(e.target.files[0]);
        }
    };

    const loadFromFile = () => {
        setFileInput("inline")
    }

    const cancelBtn = () => {
        clearStates();
        onCancel();
    }

    return (
        <div className="container">
            <div className="form-group">
                <label>Кваліфікація</label>
                <MySelect
                    value={qualification}
                    onChange={setQualification}
                    defaultValue="Кваліфікація"
                    options={qualificationList} />
            </div>

            <div className="form-group">
                <label>Термін навчання</label>
                <MySelect
                    value={term}
                    onChange={setTerm}
                    defaultValue="Термін навчання"
                    options={studyingTermList} />
            </div>

            <div className="form-group">
                <label>На основі</label>
                <MySelect
                    value={base}
                    onChange={setBase}
                    defaultValue="На основі"
                    options={baseList} />
            </div>

            <div className="form-group">
                <label>Підготовки</label>
                <MySelect
                    value={step}
                    onChange={setStep}
                    defaultValue="Підготовки"
                    options={stepList} />
            </div>

            <div className="form-group">
                <label>Шифр</label>
                <MySelect
                    value={cipher}
                    onChange={setCipher}
                    defaultValue="Шифр"
                    options={cipherList} />
            </div>

            <div className="form-group">
                <label>Форма навчання</label>
                <MySelect
                    value={form}
                    onChange={setForm}
                    defaultValue="Форма навчання"
                    options={studyingFormList} />
            </div>

            <div className="form-group">
                <label>Год набора</label>
                <input
                    type="date"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    className="form-control" />
            </div>

            <div className="flexRow">
                <div className="form-group oneFlex m-1">
                    <label>Кількість груп</label>
                    <MyInputValidator
                        value={groupNum}
                        onText={(text) => setGroupNum(text)}
                        name="firstName"
                        placeholder="Кількість груп"
                        className="form-control"
                        check="^[0-9]+" />
                    <div className="invalid-feedback">
                        Може включати лише цифри
                    </div>
                </div>

                <div className="form-group oneFlex m-1">
                    <label>Кількість студентів</label>
                    <MyInputValidator
                        value={studentNum}
                        onText={(text) => setStudentNum(text)}
                        name="firstName"
                        placeholder="Кількість студентів"
                        className="form-control"
                        check="^[0-9]+" />
                    <div className="invalid-feedback">
                        Може включати лише цифри
                    </div>
                </div>
            </div>

            <div className="semDiv">
                <hr />
                <label>Оберіть семестри</label>
                <hr />
                <div>
                    {
                        [...Array(8).keys()].map(i =>
                            <div className="form-check form-check-inline" key={i}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={i}
                                    checked={semesterCheck[i]?.isCheck}
                                    onChange={() => { setSemester(i + 1) }} />
                                <label className="form-check-label">{i + 1}</label>
                            </div>
                        )
                    }
                </div>
                <hr />
            </div>

            <div style={{ display: fileInput }}>
                <input
                    type="file"
                    accept=".xls,.xlsx"
                    id="planFileInput"
                    onChange={handleFileChange} />
            </div>

            <div className="text-center">
                <button className="btn btn-info m-1" onClick={loadFromFile}>Завантажти з файлу</button>
            </div>

            <div className="text-center m-1">
                {
                    (enableByField || enableByFile) &&
                    <button className="btn btn-success m-1" onClick={createFllPlanInfo}>Зберегти</button>
                }
                <button className="btn btn-danger m-1" onClick={cancelBtn}>Відміна</button>
            </div>
        </div >
    );
};

export default PlamInfoForm;