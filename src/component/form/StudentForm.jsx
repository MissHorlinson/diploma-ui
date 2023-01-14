import React, { useState, useEffect } from 'react';
import MyInputValidator from '../UI/MyInputValdator';


const StudentForm = ({ onSave, studentToUpdate, btnClass, onCancel }) => {

    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [lastName, setLastName] = useState('');
    const [passport, setPassport] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [recordBook, setRecordBook] = useState('');


    const clearStates = () => {
        setFirstName('');
        setSecondName('');
        setLastName('');
        setPhone('');
        setPassport('');
        setEmail('');
        setBirthday('');
        setRecordBook('');
    }

    useEffect(() => {
        clearStates();
    }, [])

    useEffect(() => {
        if (studentToUpdate) {
            setFirstName(studentToUpdate.firstName);
            setSecondName(studentToUpdate.secondName);
            setLastName(studentToUpdate.lastName);
            setPhone(studentToUpdate.phone);
            // setPassport(studentToUpdate.passport);
            setEmail(studentToUpdate.email);
            // setBirthday(studentToUpdate.birthday?.replace("T00:00", ""));
            setRecordBook(studentToUpdate.recordBook);
        } else {
            clearStates();
        }
    }, [studentToUpdate]);


    const saveStudent = (e) => {
        e.preventDefault();

        const student = ({
            firstName: firstName,
            secondName: secondName,
            lastName: lastName,
            phone: phone,
            // passport: passport,
            email: email,
            // birthday: birthday + "T00:00:00",
            recordBook: recordBook
        });

        onSave(student);
    }

    return (
        <div className="container">
            <div className="form-group">
                <label>Ім'я</label>
                <MyInputValidator
                    value={firstName}
                    onText={text => setFirstName(text)}
                    name="firstName"
                    placeholder="First Name"
                    className="form-control"
                    check="[А-Я][а-я]*$"
                />
                <div className="invalid-feedback">
                    Ім'я повинне прчинатися з великой літери і не може містити в собі цифри
                </div>
            </div>

            <div className="form-group">
                <label>По батькові</label>
                <MyInputValidator
                    value={secondName}
                    onText={text => setSecondName(text)}
                    name="secondName"
                    placeholder="Second Name"
                    className="form-control"
                    check="[А-Я][а-я]*$"
                />
                <div className="invalid-feedback">
                    По батькові повинне прчинатися з великой літери і не може містити в собі цифри
                </div>
            </div>

            <div className="form-group">
                <label>Прізвище</label>
                <MyInputValidator
                    value={lastName}
                    type="text"
                    onText={text => setLastName(text)}
                    name="lastName"
                    placeholder="Last Name"
                    className="form-control"
                    check="^[a-zA-Z\s-]*$"
                />
                <div className="invalid-feedback">
                    Last name can not contains numbers or symbols
                </div>
            </div>

            {/* <div className="form-group">
                <label>Passport</label>
                <MyInputValidator
                    value={passport}
                    onText={text => setPassport(text)}
                    name="passport"
                    placeholder="passport"
                    className="form-control"
                    check="[A-Za-z-0-9]+$"
                />
                <div className="invalid-feedback">
                    Record book can contain only numbers or letters
                </div>
            </div> */}

            <div className="form-group">
                <label>Email</label>
                <MyInputValidator
                    value={email}
                    onText={text => setEmail(text)}
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    check="^[A-Za-z0-9@.]+$"
                />
                <div className="invalid-feedback">
                    Email can contain only numbers, letters and @
                </div>
            </div>

            <div className="form-group">
                <label>Телефон</label>
                <MyInputValidator
                    value={phone}
                    onText={text => setPhone(text)}
                    name="phone"
                    placeholder="Phone"
                    className="form-control"
                    check="^[0-9-]+$"
                />
                <div className="invalid-feedback">
                    Номер телефону може містити лише цифри
                </div>
            </div>

            <div className="form-group">
                <label>Record Book</label>
                <MyInputValidator
                    value={recordBook}
                    onText={text => setRecordBook(text)}
                    name="recordBook"
                    placeholder="record Book"
                    className="form-control"
                    check="^[a-zA-Z0-9]+" />
                <div className="invalid-feedback">
                    Record book can contain only numbers or letters
                </div>
            </div>

            {/* <div className="form-group">
                <label>Birthday</label>
                <input
                    type="date"
                    value={birthday}
                    onChange={e => setBirthday(e.target.value)}
                    className="form-control" />
            </div> */}

            <div className={btnClass}>
                <button className="btn btn-success" style={{ margin: "5px" }} onClick={saveStudent}>Save</button>
                <button className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={() => {
                    clearStates();
                    onCancel();
                }}>Cancel</button>
            </div>
        </div>
    );
};

export default StudentForm;