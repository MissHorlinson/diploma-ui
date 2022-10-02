import React, { useState, useEffect } from 'react';
import MyInputValidator from '../UI/MyInputValdator';
import MySelect from "../UI/MySelect";

const initialVal = {
    firstName: '',
    secondName: '',
    lastName: '',
    passport: '',
    recordBook: '',
    birthday: '',
    email: '',
    phone: '',
    groupInfo: { id: '' },
    degree: ''
}

const StudentForm = ({ onSave, groupList, studentToUpdate, btnClass, onCancel }) => {

    const [student, setStudent] = useState(initialVal);

    const [degree, setDegree] = useState('');
    const [groupInfo, setGroupInfo] = useState('');


    useEffect(() => {
        if (studentToUpdate) {
            setStudent((stud) => ({
                ...stud, ...studentToUpdate
            }));

            var filter = groupList.filter(function (el) {
                return el.name === studentToUpdate.group;
            })
            //  student.groupInfo.id = filter[0].id;
            groupSet(studentToUpdate.groupId);
            degreeChoise(studentToUpdate.degree);
        }
    }, [studentToUpdate]);


    const degreeChoise = (choise) => {
        setDegree(choise)
        student.degree = choise
    }

    const groupSet = (group) => {
        setGroupInfo(group);
        student.groupInfo.id = group;
    }

    const saveStudent = (e) => {
        e.preventDefault();
        let day = student.birthday.split('T');
        const newStudent = {
            ...student, birthday: day[0] + 'T00:00:00'
        }
        onSave(newStudent);
        setStudent({ ...initialVal });
    }


    const setValue = (data) => {
        setStudent((stud) => ({
            ...stud, ...data
        }));
    }


    return (
        <div className="container">
            <div className="form-group">
                <label>First Name</label>
                <MyInputValidator
                    value={student.firstName}
                    onText={text => setValue({ firstName: text })}
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
                    value={student.secondName}
                    onText={text => setValue({ secondName: text })}
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
                    value={student.lastName}
                    type="text"
                    onText={text => setValue({ lastName: text })}
                    name="lastName"
                    placeholder="Last Name"
                    className="form-control"
                    check="^[a-zA-Z\s-]*$"
                />
                <div className="invalid-feedback">
                    Last name can not contains numbers or symbols
                </div>
            </div>

            <div className="form-group">
                <label>Passport</label>
                <MyInputValidator
                    value={student.passport}
                    onText={text => setValue({ passport: text })}
                    name="passport"
                    placeholder="passport"
                    className="form-control"
                    check="[A-Za-z-0-9]+$"
                />
                <div className="invalid-feedback">
                    Record book can contain only numbers or letters
                </div>
            </div>

            <div className="form-group">
                <label>Email</label>
                <MyInputValidator
                    value={student.email}
                    onText={text => setValue({ email: text })}
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
                    value={student.phone}
                    onText={text => setValue({ phone: text })}
                    name="phone"
                    placeholder="Phone"
                    className="form-control"
                    check="^[0-9-]+$"
                />
                <div className="invalid-feedback">
                    Phone can contain onle numbers
                </div>
            </div>

            <div className="form-group">
                <label>Record Book</label>
                <MyInputValidator
                    value={student.recordBook}
                    onText={text => setValue({ recordBook: text })}
                    name="recordBook"
                    placeholder="record Book"
                    className="form-control"
                    check="^[a-zA-Z0-9]+" />
                <div className="invalid-feedback">
                    Record book can contain only numbers or letters
                </div>
            </div>

            <div className="form-group">
                <label>Birthday</label>
                <input
                    type="date"
                    value={student.birthday.replace('T00:00', '')}
                    onChange={e => setValue({ birthday: e.target.value })}
                    className="form-control" />
            </div>

            {/* <div className="form-group">
                <label>Group</label>
                <MySelect
                    value={groupInfo}
                    onChange={groupSet}
                    defaultValue="Group"
                    options={groupList} />
            </div>

            <div className="form-group">
                <label>Degree</label>
                <MySelect
                    value={degree}
                    onChange={degreeChoise}
                    defaultValue="Degree"
                    options={[
                        { id: "Bachelor", name: "Bachelor" },
                        { id: "Master", name: "Master" },
                        { id: "PhD", name: "PhD" }
                    ]} />
            </div> */}

            <div className={btnClass}>
                <button className="btn btn-success" style={{ margin: "5px" }} onClick={saveStudent}>Save</button>
                <button className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default StudentForm;