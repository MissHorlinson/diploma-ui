import React, { useState, useEffect } from 'react';
import MyInputValidator from '../UI/MyInputValidator';

import MySelect from '../UI/MySelect';

const initialVal = {
    name: '',
    admissionYear: '',
    index: '',
    facultyGroup: { id: '' }
}

const GroupForm = ({ onSave, facultyList, groupToUpdate, btnClass, onCancel }) => {

    const [group, setGroup] = useState(initialVal);
    const [facultyGroup, setFacultyGroup] = useState('');

    useEffect(() => {
        if (groupToUpdate) {
            console.log(groupToUpdate)
            setGroup((group) => ({
                ...group, ...groupToUpdate
            }));
            facultySet(groupToUpdate.facultyId);
        }
    }, [groupToUpdate])

    const setValue = (data) => {
        setGroup((group) => ({
            ...group, ...data
        }))
    }

    const facultySet = (facultyId) => {
        setFacultyGroup(facultyId);
        group.facultyGroup.id = facultyId;
    }

    const saveGroup = (e) => {
        e.preventDefault();
        let day = group.admissionYear.split('T');
        const newGroup = {
            ...group, admissionYear: day[0] + 'T00:00:00'
        }
        onSave(newGroup);
        setGroup({ ...initialVal });
    }

    return (
        <div className="container">
            <div className="form-group">
                <label>Name</label>
                <MyInputValidator
                    value={group.name}
                    onText={text => setValue({ name: text })}
                    name="name"
                    placeholder="Name"
                    className="form-control"
                    check="[A-Za-z]*$"
                />
                <div className="invalid-feedback">
                    Name should not contains numbers or symbols
                </div>
            </div>

            <div className="form-group">
                <label>Admission Year</label>
                <input
                    type="date"
                    value={group.admissionYear.replace('T00:00', '')}
                    onChange={e => setValue({ admissionYear: e.target.value })}
                    className="form-control" />
            </div>

            <div className="form-group">
                <label>Group Index</label>
                <MyInputValidator
                    value={group.index}
                    onText={text => setValue({ index: text })}
                    name="index"
                    placeholder="Index"
                    className="form-control"
                    check="^[0-9-]*$"
                />
                <div className="invalid-feedback">
                    Index can be only numbers
                </div>
            </div>

            <div className="form-group">
                <label>Faculty</label>
                <MySelect
                    value={facultyGroup}
                    onChange={facultySet}
                    defaultValue="Faculty"
                    options={facultyList} />
            </div>

            <div className={btnClass}>
                <button className="btn btn-success" style={{ margin: "5px" }} onClick={saveGroup}>Save</button>
                <button className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default GroupForm;