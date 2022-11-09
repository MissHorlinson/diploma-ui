import React, { useState, useEffect } from 'react';


import MySelect from "../UI/MySelect";
import MyInputValidator from "../UI/MyInputValdator";

const initialVal = {
    name: '',
    admissionYear: '',
    index: '',
    facultyGroup: { id: '' }
}

const GroupForm = ({ onSave, cipherList, groupToUpdate, btnClass, onCancel }) => {

    const [groupCipher, setGroupCipher] = useState('');
    const [groupIndex, setGroupIndex] = useState('');
    const [groupYear, setGroupYear] = useState('');

    useEffect(() => {
        if (groupToUpdate) {
            setGroupIndex(groupToUpdate.index);
            setGroupCipher(groupToUpdate.groupCipherId);
            setGroupYear(groupToUpdate.admissionYear?.replace("T00:00:00", ""));
        }
    }, [groupToUpdate])

    useEffect(() => {
        clearStates();
    }, [])

    const clearStates = () => {
        setGroupIndex('');
        setGroupYear('');
        setGroupCipher('');
    }

    const saveGroup = (e) => {
        e.preventDefault();
        const newGroup = ({
            groupCipher: { id: groupCipher },
            index: groupIndex,
            admissionYear: groupYear + "T00:00:00"
        })
        onSave(newGroup);
    }

    return (
        <div className="container">
            <div className="form-group">
                <label>Name</label>
                <MySelect
                    value={groupCipher}
                    onChange={(type) => setGroupCipher(type)}
                    defaultValue="Cipher"
                    options={cipherList}
                />
            </div>

            <div className="form-group">
                <label>Admission Year</label>
                <input
                    type="date"
                    value={groupYear.replace('T00:00', '')}
                    onChange={e => setGroupYear(e.target.value)}
                    className="form-control" />
            </div>

            <div className="form-group">
                <label>Group Index</label>
                <MyInputValidator
                    value={groupIndex}
                    onText={text => setGroupIndex(text)}
                    name="index"
                    placeholder="Index"
                    className="form-control"
                    check="^[0-9-]*$"
                />
                <div className="invalid-feedback">
                    Index can be only numbers
                </div>
            </div>

            <div className={btnClass}>
                <button className="btn btn-success" style={{ margin: "5px" }} onClick={saveGroup}>Save</button>
                <button className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={() => {
                    clearStates();
                    onCancel()
                }}>Cancel</button>
            </div>
        </div>
    );
};

export default GroupForm;