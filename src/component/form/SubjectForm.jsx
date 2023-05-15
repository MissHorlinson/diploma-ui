import React, { useEffect, useState } from 'react';

import MyInputValidator from '../UI/MyInputValdator';

const initialVal = {
    name: ''
}
const SubjectForm = ({ onSave, subjectToUpdate, onCancel }) => {

    const [subject, setSubject] = useState(initialVal);

    useEffect(() => {
        if (subjectToUpdate) {
            setSubject((sub) => ({
                ...sub, ...subjectToUpdate
            }))
        }
    }, [subjectToUpdate]);

    const saveSubject = (e) => {
        e.preventDefault();
        const newSubject = {
            ...subject
        }
        onSave(newSubject);
        setSubject({ ...initialVal })
    }

    const setValue = (data) => {
        setSubject((sub) => ({
            ...sub, ...data
        }))
    }

    return (
        <div>
            <div className="container">
                <div className="form-group">
                    <label>Назва предмету</label>
                    <MyInputValidator
                        value={subject.name}
                        onText={text => setValue({ name: text })}
                        name="subjectName"
                        placeholder="Sublect Name"
                        className="form-control"
                        check="[A-Za-z\s-]+$"
                    />
                    <div className="invalid-feedback">
                        Назва повинна складатися з літер
                    </div>
                </div>

                <div className="text-center m-1">
                    <button className="btn btn-success m-1" onClick={saveSubject}>Зберегти</button>
                    <button className="btn btn-danger m-1" onClick={onCancel}>Відміна</button>
                </div>
            </div>
        </div>
    );
};

export default SubjectForm;