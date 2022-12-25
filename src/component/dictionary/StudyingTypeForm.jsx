import React, { useState, useEffect } from 'react';
import MyInputValidator from "../UI/MyInputValdator";

const StudyingTypeForm = ({ typeToUpdate, onSave, onCancel }) => {

    const [typeName, setTypeName] = useState('');
    const [typeLetter, setTypeLetter] = useState('');
    const [typeInx, setTypeInx] = useState('');

    useEffect(() => {
        if (typeToUpdate) {
            setTypeName(typeToUpdate.name);
            setTypeLetter(typeToUpdate.letter);
            setTypeInx(typeToUpdate.id);
        }
    }, [typeToUpdate])

    const clearForm = () => {
        setTypeName('');
        setTypeLetter('');
    }

    const cancelBtn = () => {
        clearForm();
        onCancel();
    }

    const saveType = () => {
        const sudyingType_ = {
            id: typeInx,
            name: typeName,
            letter: typeLetter
        }

        onSave(sudyingType_);
    }

    return (
        <div className="container">
            <div className="form-group">
                <label>Text</label>
                <MyInputValidator
                    value={typeName}
                    onText={text => setTypeName(text)}
                    name="name"
                    className="form-control"
                />
                <div className="invalid-feedback">
                    Index can be only numbers
                </div>
            </div>

            <div className="form-group">
                <label>Letter</label>
                <MyInputValidator
                    value={typeLetter}
                    onText={text => setTypeLetter(text)}
                    name="letter"
                    placeholder="Letter"
                    className="form-control"
                    check="^[a-zA-Z\s-]*$"
                />
                <div className="invalid-feedback">
                    Index can be only letters
                </div>
            </div>

            <div style={{ textAlign: "center", margin: "5px" }}>
                <button className="btn btn-info" onClick={saveType}>Save</button>
                <button className="btn btn-danger" onClick={() => {
                    clearForm();
                    cancelBtn();
                }}>Cancel</button>
            </div>
        </div>
    )

}

export default StudyingTypeForm;