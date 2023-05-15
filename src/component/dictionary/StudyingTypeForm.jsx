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
                <label>Вид діяльності</label>
                <MyInputValidator
                    value={typeName}
                    onText={text => setTypeName(text)}
                    name="name"
                    className="form-control"
                />
                <div className="invalid-feedback">
                    Може складатися лише з цифр
                </div>
            </div>

            <div className="form-group">
                <label>Літерне позначення</label>
                <MyInputValidator
                    value={typeLetter}
                    onText={text => setTypeLetter(text)}
                    name="letter"
                    placeholder="Letter"
                    className="form-control"
                    check="^[a-zA-Z\s-]*$"
                />
                <div className="invalid-feedback">
                    Може складатися лише з літер
                </div>
            </div>

            <div className="text-center m-1">
                <button className="btn btn-success m-1" onClick={saveType}>Зберегти</button>
                <button className="btn btn-danger m-1" onClick={cancelBtn}>Відміна</button>
            </div>
        </div>
    )

}

export default StudyingTypeForm;