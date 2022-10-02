import React, { useState } from "react";

import MyInputValidator from "../UI/MyInputValdator";
import MySelect from "../UI/MySelect";


const initVal = {
    // rector: { id: "" },
    qualification: { id: '' },
    studyingTerm: { id: '' },
    base: { id: '' },
    step: { id: '' },
    planCipher: { id: '' },
    studyingForm: { id: '' },
    admissionYear: '',
    numberOfGroup: '',
    numberOfStudent: '',
    numberOfSemester: ''
}

const PlamInfoForm = ({ qualificationList, studyingTermList, baseList, cipherList, studyingFormList, stepList, btnClass, onCancel, onCreate }) => {

    const [planInfo, setPlanInfo] = useState(initVal);
    const [rector, setRector] = useState("");
    const [qualification, setQualification] = useState("");
    const [term, setTerm] = useState("");
    const [base, setBase] = useState("");
    const [step, setStep] = useState("");
    const [cipher, setCipher] = useState("");
    const [form, setForm] = useState("");

    const [semesterCheck, setSemesterCheck] = useState([])


    const createFllPlanInfo = (e) => {
        e.preventDefault();
        planInfo.numberOfSemester = semesterCheck.length;
        let day = planInfo.admissionYear.split('T');
        const fullPlan = {
            ...planInfo, admissionYear: day[0] + 'T00:00:00'
        }
        onCreate(fullPlan);
        setPlanInfo({ ...initVal });
        setQualification();
        setStep();
    }

    const setValue = (data) => {
        setPlanInfo((planInfo) => ({
            ...planInfo, ...data
        }))
    }

    const baseSet = (baseId) => {
        setBase(baseId);
        planInfo.base.id = baseId;
    }

    const termSet = (termId) => {
        setTerm(termId);
        planInfo.studyingTerm.id = termId
    };
    const stepSet = (stepId) => {
        setStep(stepId);
        planInfo.step.id = stepId
    };

    const cipherSet = (cipherId) => {
        setCipher(cipherId);
        planInfo.planCipher.id = cipherId
    };

    const formSet = (formId) => {
        setForm(formId);
        planInfo.studyingForm.id = formId
    };

    const rectorSet = (rectorId) => {
        setRector(rectorId);
        planInfo.rector.id = rectorId;
    };

    const qualificationSet = (qualificationId) => {
        setQualification(qualificationId);
        planInfo.qualification.id = qualificationId;
    };

    const setSemester = (semester) => {
        const checkSem = document.getElementById(semester);
        if (checkSem.checked) {
            setSemesterCheck([...semesterCheck, { key: semester, value: semester }])
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
                    onChange={qualificationSet}
                    defaultValue="Кваліфікація"
                    options={qualificationList} />
            </div>

            <div className="form-group">
                <label>Термін навчання</label>
                <MySelect
                    value={term}
                    onChange={termSet}
                    defaultValue="Термін навчання"
                    options={studyingTermList} />
            </div>

            <div className="form-group">
                <label>На основі</label>
                <MySelect
                    value={base}
                    onChange={baseSet}
                    defaultValue="На основі"
                    options={baseList} />
            </div>

            <div className="form-group">
                <label>Підготовки</label>
                <MySelect
                    value={step}
                    onChange={stepSet}
                    defaultValue="Підготовки"
                    options={stepList} />
            </div>

            <div className="form-group">
                <label>Шифр</label>
                <MySelect
                    value={cipher}
                    onChange={cipherSet}
                    defaultValue="Шифр"
                    options={cipherList} />
            </div>

            <div className="form-group">
                <label>Форма навчання</label>
                <MySelect
                    value={form}
                    onChange={formSet}
                    defaultValue="Форма навчання"
                    options={studyingFormList} />
            </div>

            <div className="form-group">
                <label>Год набора</label>
                <input
                    type="date"
                    value={planInfo.admissionYear.replace('T00:00', '')}
                    onChange={e => setValue({ admissionYear: e.target.value })}
                    className="form-control" />
            </div>

            {/* <div className="form-group">
                <label>Кількість груп</label>
                <MyInputValidator
                    value={planInfo.numberOfGroup}
                    onText={text => setValue({ numberOfGroup: text })}
                    name="firstName"
                    placeholder="Кількість груп"
                    className="form-control"
                    check="^[0-9]+" />
                <div className="invalid-feedback">
                    Can be only numbers
                </div>
            </div> */}

            <div className="form-group">
                <label>Кількість студентів</label>
                <MyInputValidator
                    value={planInfo.numberOfStudent}
                    onText={text => setValue({ numberOfStudent: text })}
                    name="firstName"
                    placeholder="Кількість студентів"
                    className="form-control"
                    check="^[0-9]+" />
                <div className="invalid-feedback">
                    can be only numbers
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
                            onClick={() => { setSemester(1) }} />
                        <label className="form-check-label">1</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="2"
                            onClick={() => setSemester(2)} />
                        <label className="form-check-label">2</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="3"
                            onClick={() => setSemester(3)} />
                        <label className="form-check-label">3</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="4"
                            onClick={() => { setSemester(4) }} />
                        <label className="form-check-label">4</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="5"
                            onClick={() => { setSemester(5) }} />
                        <label className="form-check-label">5</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="6"
                            onClick={() => { setSemester(6) }} />
                        <label className="form-check-label">6</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="7"
                            onClick={() => { setSemester(7) }} />
                        <label className="form-check-label">7</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="8"
                            onClick={() => { setSemester(8) }} />
                        <label className="form-check-label">8</label>
                    </div>
                </div>
                <hr />
            </div>

            <div className={btnClass}>
                <button className="btn btn-success" style={{ margin: "5px" }} onClick={createFllPlanInfo}>Save</button>
                <button className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={onCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default PlamInfoForm;