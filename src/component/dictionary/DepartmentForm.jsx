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
                <label>Назва</label>
                <MyInputValidator
                    value={departName}
                    onText={text => setDepartName(text)}
                    name="name"
                    className="form-control"
                />
                <div className="invalid-feedback">
                    Назва може складатися лише з літер
                </div>
            </div>

            <div className="form-group">
                <label>Абревіатура</label>
                <MyInputValidator
                    value={departLetter}
                    onText={text => setDepartLetter(text)}
                    name="abbreviation"
                    placeholder="Абревіатура"
                    className="form-control"
                    check="^[A-Z\s-]*$"
                />
                <div className="invalid-feedback">
                    Абревіатура може складатися лише з літер
                </div>
            </div>

            <div className="text-center m-1">
                <button className="btn btn-success m-1" onClick={saveDepart}>Зберегти</button>
                <button className="btn btn-danger m-1" onClick={() => {
                    clearForm();
                    cancelBtn();
                }}>Відміна</button>
            </div>
        </div>
    )

}

export default DepartmentForm;