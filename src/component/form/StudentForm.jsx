import React, { useState, useEffect } from 'react';

import MyInputValidator from '../UI/MyInputValdator';
import PersonalInfoForm from './PersonalInfoForm';


const StudentForm = ({ onSave, studentToUpdate, onCancel }) => {

    const [firstName, setFirstName] = useState('gj');
    const [secondName, setSecondName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [recordBook, setRecordBook] = useState('rec');
    const [studentId, setStudentId] = useState(null);

    const enable = firstName.length > 0 && secondName.length > 0 && lastName.length > 0 && email.length > 0 && phone.length > 0 && recordBook.length > 0;

    useEffect(() => {
        if (studentToUpdate) {
            setStudentId(studentToUpdate.id);
            setFirstName(studentToUpdate.firstName);
            setSecondName(studentToUpdate.secondName);
            setLastName(studentToUpdate.lastName);
            setPhone(studentToUpdate.phone);
            setEmail(studentToUpdate.email);
            setRecordBook(studentToUpdate.recordBook);
        } else {
            clearStates();
        }
    }, [studentToUpdate]);

    useEffect(() => {
        clearStates();
    }, [])

    const clearStates = () => {
        setFirstName('');
        setSecondName('');
        setLastName('');
        setPhone('');
        setEmail('');
        setRecordBook('');
        setStudentId(null);
    }

    const saveStudent = (e) => {
        e.preventDefault();

        const student = ({
            id: studentId,
            firstName: firstName,
            secondName: secondName,
            lastName: lastName,
            phone: phone,
            email: email,
            recordBook: recordBook
        });

        onSave(student);
    }

    const cancelBtn = () => {
        clearStates();
        onCancel();
    }

    return (
        <div className="container">
            <PersonalInfoForm
                firstName={firstName} setFirstName={setFirstName}
                secondName={secondName} setSecondName={setSecondName}
                lastName={lastName} setLastName={setLastName}
                email={email} setEmail={setEmail}
                phone={phone} setPhone={setPhone}
            />
            <div className="form-group">
                <label>Залікова книжка</label>
                <MyInputValidator
                    value={recordBook}
                    onText={text => setRecordBook(text)}
                    name="recordBook"
                    placeholder="record Book"
                    className="form-control"
                    check="^[a-zA-Z0-9]+" />
                <div className="invalid-feedback">
                    Номер злікової книжи може складатися лише з цифр та літер
                </div>
            </div>

            <div className="text-center m-1">
                {
                    enable &&
                    <button className="btn btn-success m-1" onClick={saveStudent}>Зберегти</button>
                }

                <button className="btn btn-danger m-1" onClick={cancelBtn}>Відміна</button>
            </div>
        </div>
    );
};

export default StudentForm;