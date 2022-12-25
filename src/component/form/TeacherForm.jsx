import React, { useState, useEffect } from 'react';
import MyInputValidator from '../UI/MyInputValdator';
import MySelect from "../UI/MySelect"




const TeacherForm = ({ onSave, btnClass, onCancel, departmentList, teacherToUpdate }) => {

    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [lastName, setLastName] = useState('');
    const [passport, setPassport] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [departmentId, setDepartmentId] = useState('');


    const clearStates = () => {
        setFirstName('');
        setSecondName('');
        setLastName('');
        setPhone('');
        setPassport('');
        setEmail('');
        setBirthday('');
        setDepartmentId('');
    }

    useEffect(() => {
        clearStates();
    }, [])

    useEffect(() => {
        console.log(teacherToUpdate)
        if (teacherToUpdate) {
            setFirstName(teacherToUpdate.firstName);
            setSecondName(teacherToUpdate.secondName);
            setLastName(teacherToUpdate.lastName);
            setPhone(teacherToUpdate.phone);
            // setPassport(teacherToUpdate.passport);
            setEmail(teacherToUpdate.email);
            // setBirthday(teacherToUpdate.birthday?.replace("T00:00", ""));
            setDepartmentId(teacherToUpdate.departmentId)
        } else {
            clearStates();
        }
    }, [teacherToUpdate]);


    const saveTeacher = (e) => {
        e.preventDefault();

        const teacher = ({
            firstName: firstName,
            secondName: secondName,
            lastName: lastName,
            phone: phone,
            // passport: passport,
            email: email,
            // birthday: birthday + "T00:00:00"
            departmentInfo: { id: departmentId }
        });

        onSave(teacher);
    }

    return (
        <div className="container">
            <div className="form-group">
                <label>First Name</label>
                <MyInputValidator
                    value={firstName}
                    onText={text => setFirstName(text)}
                    name="firstName"
                    placeholder="First Name"
                    className="form-control"
                    check="[A-Z][a-z]*$"
                />
                <div className="invalid-feedback">
                    First name should start with upper case and can not contains numbers or symbols
                </div>
            </div>

            <div className="form-group">
                <label>Second Name</label>
                <MyInputValidator
                    value={secondName}
                    onText={text => setSecondName(text)}
                    name="secondName"
                    placeholder="Second Name"
                    className="form-control"
                    check="[A-Z][a-z]*$"
                />
                <div className="invalid-feedback">
                    Second name should start with upper case and can not contains numbers or symbols
                </div>
            </div>

            <div className="form-group">
                <label>Last Name</label>
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
                <label>Phone</label>
                <MyInputValidator
                    value={phone}
                    onText={text => setPhone(text)}
                    name="phone"
                    placeholder="Phone"
                    className="form-control"
                    check="^[0-9-]+$"
                />
                <div className="invalid-feedback">
                    Phone can contain onle numbers
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

            <div className="form-group">
                <label>Кафедра</label>
                <MySelect
                    value={departmentId}
                    onChange={(type) => setDepartmentId(type)}
                    defaultValue="Кафедра"
                    options={departmentList} />
            </div>

            <div className={btnClass}>
                <button className="btn btn-success" style={{ margin: "5px" }} onClick={saveTeacher}>Save</button>
                <button className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={() => {
                    clearStates();
                    onCancel();
                }}>Cancel</button>
            </div>
        </div>
    );
};

export default TeacherForm;