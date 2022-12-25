import React, { useState, useEffect } from 'react';
import MyInputValidator from "../UI/MyInputValdator";

const DepartmentForm = ({ departmnetForUpdate, onSave, onCancel }) => {

    const [departName, setDepartName] = useState('');
    const [departLetter, setDepartLetter] = useState('');
    const [departInx, setDepartInx] = useState('');

    useEffect(() => {
        if (departmnetForUpdate) {
            setDepartName(departmnetForUpdate.name);
            setDepartLetter(departmnetForUpdate.abbreviation);
            setDepartInx(departmnetForUpdate.id);
        }
    }, [departmnetForUpdate])

    const clearForm = () => {
        setDepartName('');
        setDepartLetter('');
    }

    const cancelBtn = () => {
        clearForm();
        onCancel();
    }

    const saveDepart = () => {
        const depart_ = {
            id: departInx,
            name: departName,
            abbreviation: departLetter
        }

        onSave(depart_);
    }

    return (
        <div className="container">
            <div className="form-group">
                <label>Text</label>
                <MyInputValidator
                    value={departName}
                    onText={text => setDepartName(text)}
                    name="name"
                    className="form-control"
                />
                <div className="invalid-feedback">
                    Index can be only numbers
                </div>
            </div>

            <div className="form-group">
                <label>Abbreviation</label>
                <MyInputValidator
                    value={departLetter}
                    onText={text => setDepartLetter(text)}
                    name="abbreviation"
                    placeholder="Abbreviation"
                    className="form-control"
                    check="^[A-Z\s-]*$"
                />
                <div className="invalid-feedback">
                    Index can be only letters
                </div>
            </div>

            <div style={{ textAlign: "center", margin: "5px" }}>
                <button className="btn btn-info" onClick={saveDepart}>Save</button>
                <button className="btn btn-danger" onClick={() => {
                    clearForm();
                    cancelBtn();
                }}>Cancel</button>
            </div>
        </div>
    )

}

export default DepartmentForm;