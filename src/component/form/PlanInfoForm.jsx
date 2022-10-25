import React, { useState, useEffect } from "react";

import MyInputValidator from "../UI/MyInputValdator";
import MySelect from "../UI/MySelect";


const PlamInfoForm = ({ qualificationList, studyingTermList, baseList, cipherList, studyingFormList, stepList, btnClass, planToUpdate, onCancel, onCreate }) => {

    const [planInfo, setPlanInfo] = useState({});
    const [rector, setRector] = useState('');
    const [qualification, setQualification] = useState('');
    const [term, setTerm] = useState('');
    const [base, setBase] = useState('');
    const [step, setStep] = useState('');
    const [cipher, setCipher] = useState('');
    const [form, setForm] = useState('');
    const [year, setYear] = useState('');
    const [groupNum, setGroupNum] = useState('');
    const [studentNum, setStudentNum] = useState('');

    const [semesterCheck, setSemesterCheck] = useState([{ isCheck: false }, { isCheck: false }, { isCheck: false }, { isCheck: false }, { isCheck: false }, { isCheck: false }, { isCheck: false }, { isCheck: false }])


    useEffect(() => {
        if (planToUpdate) {
            setQualification(planToUpdate.qualificationId);
            setTerm(planToUpdate.studyingTermId);
            setBase(planToUpdate.baseId);
            setStep(planToUpdate.stepId);
            setCipher(planToUpdate.planCipherId);
            setForm(planToUpdate.studyingFormId);
            setYear(planToUpdate.admissionYear?.replace("T00:00:00", ""));
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
        setSemesterCheck([])
    }

    const createFllPlanInfo = (e) => {
        e.preventDefault();
        let day = year.split('T');
        let planId = planToUpdate ? planToUpdate.planId : null
        const fullPlan = {
            id: planId,
            rector: "rector",
            qualification: { id: qualification },
            studyingTerm: { id: term },
            base: { id: base },
            step: { id: step },
            planCipher: { id: cipher },
            studyingForm: { id: form },
            admissionYear: day[0] + 'T00:00:00',
            numberOfGroup: groupNum,
            numberOfStudent: studentNum,
            numberOfSemester: semesterCheck.length
        }
        onCreate(fullPlan);
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

    return (
        <div className="container">
            {/* <div className="form-group">
                <label>Ректор</label>
                <MySelect
                    value={rector}
                    onChange={rectorSet}
                    defaultValue="Ректор"
                    options={rectorList} />
            </div> */}

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
                    // value={planInfo?.admissionYear.replace('T00:00', '')}
                    onChange={e => setYear(e.target.value)}
                    className="form-control" />
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="form-group" style={{ flex: 1, marginInline: 2 }}>
                    <label>Кількість груп</label>
                    <MyInputValidator
                        value={groupNum}
                        onText={(text) => setGroupNum(text)}
                        name="firstName"
                        placeholder="Кількість груп"
                        className="form-control"
                        check="^[0-9]+" />
                    <div className="invalid-feedback">
                        Can be only numbers
                    </div>
                </div>

                <div className="form-group" style={{ flex: 1, marginInline: 2 }}>
                    <label>Кількість студентів</label>
                    <MyInputValidator
                        value={studentNum}
                        onText={(text) => setStudentNum(text)}
                        name="firstName"
                        placeholder="Кількість студентів"
                        className="form-control"
                        check="^[0-9]+" />
                    <div className="invalid-feedback">
                        can be only numbers
                    </div>
                </div>
            </div>

            <div className="semDiv">
                <hr />
                <label>Оберіть семестри</label>
                <hr />
                <div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="1"
                            checked={semesterCheck[0]?.isCheck}
                            onChange={() => { setSemester(1) }} />
                        <label className="form-check-label">1</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="2"
                            checked={semesterCheck[1]?.isCheck}
                            onChange={() => setSemester(2)} />
                        <label className="form-check-label">2</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="3"
                            checked={semesterCheck[2]?.isCheck}
                            onChange={() => setSemester(3)} />
                        <label className="form-check-label">3</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="4"
                            checked={semesterCheck[3]?.isCheck}
                            onChange={() => { setSemester(4) }} />
                        <label className="form-check-label">4</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="5"
                            checked={semesterCheck[4]?.isCheck}
                            onChange={() => { setSemester(5) }} />
                        <label className="form-check-label">5</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="6"
                            checked={semesterCheck[5]?.isCheck}
                            onChange={() => { setSemester(6) }} />
                        <label className="form-check-label">6</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="7"
                            checked={semesterCheck[6]?.isCheck}
                            onChange={() => { setSemester(7) }} />
                        <label className="form-check-label">7</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="8"
                            checked={semesterCheck[7]?.isCheck}
                            onChange={() => { setSemester(8) }} />
                        <label className="form-check-label">8</label>
                    </div>
                </div>
                <hr />
            </div>

            <div className={btnClass}>
                <button className="btn btn-success" style={{ margin: "5px" }} onClick={createFllPlanInfo}>Save</button>
                <button className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={() => {
                    clearStates();
                    onCancel()
                }}>Cancel</button>
            </div>
        </div >
    );
};

export default PlamInfoForm;