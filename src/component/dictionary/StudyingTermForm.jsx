import React, { useState, useEffect } from 'react';
import MyInputValidator from "../UI/MyInputValdator";

const StudyingTermForm = ({ termToUpdate, onSave, onCancel }) => {

    const [termName, setTermName] = useState('');
    const [termInMonth, setTermInMonth] = useState(0);
    const [termInSemester, setTermInSemester] = useState(0);
    const [termId, setTermId] = useState(null);

    useEffect(() => {
        if (termToUpdate) {
            setTermName(termToUpdate.name);
            setTermInMonth(termToUpdate.termInMonthInt);
            setTermId(termToUpdate.id);
            setTermInSemester(termToUpdate.semesterNum);
        }
    }, [termToUpdate])

    const clearForm = () => {
        setTermName('');
        setTermInMonth(0);
        setTermInSemester(0);
        setTermId(null);
    }

    const cancelBtn = () => {
        clearForm();
        onCancel();
    }

    const saveTerm = () => {
        const sudyingTerm_ = {
            id: termId,
            name: termName,
            termInMonthInt: termInMonth,
            semesterNum: termInSemester
        }

        onSave(sudyingTerm_);
    }

    return (
        <div className="container">
            <div className="form-group">
                <label>Строк навчання</label>
                <MyInputValidator
                    value={termName}
                    onText={text => setTermName(text)}
                    name="name"
                    className="form-control"
                />
                <div className="invalid-feedback">
                    Може мати в собі лице букви та цифри
                </div>
            </div>

            <div className="form-group">
                <label>Кількість місяців</label>
                <MyInputValidator
                    value={termInMonth}
                    onText={text => setTermInMonth(text)}
                    name="month"
                    placeholder="Month"
                    className="form-control"
                    check="^[0-9-]*$"
                />
                <div className="invalid-feedback">
                    Може складатися лише з цифр
                </div>
            </div>

            <div className="form-group">
                <label>Кількість семестрів</label>
                <MyInputValidator
                    value={termInSemester}
                    onText={text => setTermInSemester(text)}
                    name="month"
                    placeholder="Month"
                    className="form-control"
                    check="^[0-9-]*$"
                />
                <div className="invalid-feedback">
                    Може складатися лише з цифр
                </div>
            </div>

            <div className="text-center m-1">
                <button className="btn btn-success m-1" onClick={saveTerm}>Зберегти</button>
                <button className="btn btn-danger m-1" onClick={cancelBtn}>Відміна</button>
            </div>
        </div>
    )

}

export default StudyingTermForm;