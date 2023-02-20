import React, { useState, useEffect } from 'react';

import MySelect from "../UI/MySelect"
import PersonalInfoForm from './PersonalInfoForm';


const TeacherForm = ({ onSave, onCancel, departmentList, teacherToUpdate }) => {

    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [teacherId, setTeacherId] = useState(null);

    const enable = firstName.length > 0 && secondName.length > 0 && lastName.length > 0 && email.length > 0 && phone.length > 0 && departmentId > 0;


    const clearStates = () => {
        setTeacherId(null);
        setFirstName('');
        setSecondName('');
        setLastName('');
        setPhone('');
        setEmail('');
        setDepartmentId('');
    }

    useEffect(() => {
        clearStates();
    }, [])

    useEffect(() => {
        if (teacherToUpdate) {
            setTeacherId(teacherToUpdate.id);
            setFirstName(teacherToUpdate.firstName);
            setSecondName(teacherToUpdate.secondName);
            setLastName(teacherToUpdate.lastName);
            setPhone(teacherToUpdate.phone);
            setEmail(teacherToUpdate.email);
            setDepartmentId(teacherToUpdate.departmentId)
        } else {
            clearStates();
        }
    }, [teacherToUpdate]);


    const saveTeacher = (e) => {
        e.preventDefault();

        const teacher = ({
            id: teacherId,
            firstName: firstName,
            secondName: secondName,
            lastName: lastName,
            phone: phone,
            email: email,
            departmentId: departmentId
        });

        onSave(teacher);
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
                <label>Кафедра</label>
                <MySelect
                    value={departmentId}
                    onChange={(type) => setDepartmentId(type)}
                    defaultValue="Кафедра"
                    options={departmentList} />
            </div>

            <div className="text-center m-1">
                {
                    enable &&
                    <button className="btn btn-success m-1" onClick={saveTeacher}>Зберегти</button>
                }
                <button className="btn btn-danger m-1" onClick={cancelBtn}>Відміна </button>
            </div>
        </div>
    );
};

export default TeacherForm;