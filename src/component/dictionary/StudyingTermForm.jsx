import React, { useState, useEffect } from 'react';
import MyInputValidator from "../UI/MyInputValdator";

const StudyingTermForm = ({ termToUpdate, onSave, onCancel }) => {

    const [termName, setTermName] = useState('');
    const [termInMonth, setTermInMonth] = useState(0);
    const [termInx, setTermInx] = useState('');

    useEffect(() => {
        if (termToUpdate) {
            setTermName(termToUpdate.name);
            setTermInMonth(termToUpdate.termInMonthInt);
            setTermInx(termToUpdate.id);
        }
    }, [termToUpdate])

    const clearForm = () => {
        setTermName('');
        setTermInMonth(0);
    }

    const cancelBtn = () => {
        clearForm();
        onCancel();
    }

    const saveTerm = () => {
        const sudyingTerm_ = {
            id: termInx,
            name: termName,
            termInMonth: termInMonth
        }

        onSave(sudyingTerm_);
    }

    return (
        <div className="container">
            <div className="form-group">
                <label>Text</label>
                <MyInputValidator
                    value={termName}
                    onText={text => setTermName(text)}
                    name="name"
                    className="form-control"
                />
                <div className="invalid-feedback">
                    Index can be only numbers
                </div>
            </div>

            <div className="form-group">
                <label>Month</label>
                <MyInputValidator
                    value={termInMonth}
                    onText={text => setTermInMonth(text)}
                    name="month"
                    placeholder="Month"
                    className="form-control"
                    check="^[0-9-]*$"
                />
                <div className="invalid-feedback">
                    Index can be only numbers
                </div>
            </div>

            <div style={{ textAlign: "center", margin: "5px" }}>
                <button className="btn btn-info" onClick={saveTerm}>Save</button>
                <button className="btn btn-danger" onClick={() => {
                    clearForm();
                    cancelBtn();
                }}>Cancel</button>
            </div>
        </div>
    )

}

export default StudyingTermForm;