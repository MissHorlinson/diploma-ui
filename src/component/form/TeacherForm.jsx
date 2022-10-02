import React, { useEffect, useState } from 'react';
import MyInputValidator from '../UI/MyInputValdator';
import MySelect from "../UI/MySelect";

const initialVal = {
    firstName: '',
    secondName: '',
    lastName: '',
    passport: '',
    birthday: '',
    email: '',
    phone: '',
    departmentInfo: { id: '' },
    academicRank: ''
}

const TeacherForm = ({ onSave, departmentList, teacherToUpdate, btnClass, onCancel }) => {

    const [teacher, setTeacher] = useState(initialVal);

    const [departmentInfo, setDepartmentInfo] = useState('');
    const [academicRank, setAcademicRank] = useState('');

    useEffect(() => {
        if (teacherToUpdate) {
            setTeacher((teach) => ({
                ...teach, ...teacherToUpdate
            }));
            rankChoise(teacherToUpdate.academicRank);

            var filter = departmentList.filter(function (el) {
                return el.name === teacherToUpdate.department;
            })
            teacher.departmentInfo.id = filter[0].id;
            departmentSet(teacherToUpdate.departmentId)
        }
    }, [teacherToUpdate]);


    const departmentSet = (departmentId) => {
        setDepartmentInfo(departmentId);
        teacher.departmentInfo.id = departmentId;
    }

    const rankChoise = (rank) => {
        console.log(rank)
        setAcademicRank(rank);
        teacher.academicRank = rank;
    }

    const saveTeacher = (e) => {
        e.preventDefault();
        let day = teacher.birthday.split('T');
        const newTeacher = {
            ...teacher, birthday: day[0] + "T00:00:00"
        }
        onSave(newTeacher);
        setTeacher({ ...initialVal });
    }

    const setValue = (data) => {
        setTeacher((teach) => ({
            ...teach, ...data
        }));
    }

    return (
        <div className="container">
            <div className="form-group">
                <label>First Name</label>
                <MyInputValidator
                    value={teacher.firstName}
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
                    value={teacher.secondName}
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
                    value={teacher.lastName}
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
                    value={teacher.passport}
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
                    value={teacher.email}
                    onText={text => setValue({ email: text })}
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    check="^[A-Za-z0-9@.]+$" />
                <div className="invalid-feedback">
                    Email can contain only numbers, letters and @
                </div>
            </div>

            <div className="form-group">
                <label>Phone</label>
                <MyInputValidator
                    value={teacher.phone}
                    onText={text => setValue({ phone: text })}
                    name="phone"
                    placeholder="Phone"
                    className="form-control"
                    check="^[0-9-]+$" />
                <div className="invalid-feedback">
                    Phone can contain onle numbers
                </div>

            </div>

            <div className="form-group">
                <label>Birthday</label>
                <input
                    type="date"
                    value={teacher.birthday.replace('T00:00', '')}
                    onChange={e => setValue({ birthday: e.target.value })}
                    className="form-control" />
            </div>

            <div className="form-group">
                <label>Department</label>
                <MySelect
                    value={departmentInfo}
                    onChange={departmentSet}
                    defaultValue="Department"
                    options={departmentList} />
            </div>

            <div className="form-group">
                <label>Academic Rank</label>
                <MySelect
                    value={academicRank}
                    onChange={rankChoise}
                    defaultValue="Academic Rank"
                    options={[
                        { id: "Assistant", name: "Assistant" },
                        { id: "Professor", name: "Professor" },
                        { id: "PhD", name: "PhD" }
                    ]} />
            </div>

            <div className={btnClass}>
                <button className="btn btn-success" style={{ margin: "5px" }} onClick={saveTeacher}>Save</button>
                <button className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default TeacherForm;
