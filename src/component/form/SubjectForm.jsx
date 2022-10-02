import React, { useEffect, useState } from 'react';
import MyInputValidator from '../UI/MyInputValdator';

const initialVal = {
    name: ''
}
const SubjectForm = ({ onSave, subjectToUpdate, btnClass, onCancel }) => {

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
                    <label>Subject Name</label>
                    <MyInputValidator
                        value={subject.name}
                        onText={text => setValue({ name: text })}
                        name="subjectName"
                        placeholder="Sublect Name"
                        className="form-control"
                        check="[A-Za-z\s-]+$"
                    />
                    <div className="invalid-feedback">
                        Name should can not contains numbers or symbols
                    </div>
                </div>

                <div className={btnClass}>
                    <button className="btn btn-success" style={{ margin: "5px" }} onClick={saveSubject}>Save</button>
                    <button className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default SubjectForm;