import React, { useState, useEffect } from 'react';

import MySelect from "../UI/MySelect";
import MyInputValidator from "../UI/MyInputValdator";


const GroupForm = ({ onSave, cipherList, groupToUpdate, onCancel }) => {

    const [groupCipher, setGroupCipher] = useState('');
    const [groupIndex, setGroupIndex] = useState('');
    const [groupYear, setGroupYear] = useState('');
    const [groupId, setGroupId] = useState(null);

    useEffect(() => {
        if (groupToUpdate) {
            setGroupId(groupToUpdate.id)
            setGroupIndex(groupToUpdate.index);
            setGroupCipher(groupToUpdate.groupCipherId);
            setGroupYear(groupToUpdate.admissionYear?.replace("T00:00", ""));
        }
    }, [groupToUpdate])

    useEffect(() => {
        clearStates();
    }, [])

    const clearStates = () => {
        setGroupIndex('');
        setGroupYear('');
        setGroupCipher('');
        setGroupId(null);
    }

    const saveGroup = (e) => {
        e.preventDefault();
        const newGroup = ({
            id: groupId,
            groupCipherId: groupCipher,
            index: groupIndex,
            admissionYear: groupYear + "T00:00:00"
        })
        onSave(newGroup);
    }

    const cancelBtn = () => {
        clearStates();
        onCancel();
    }

    return (
        <div className="container">
            <div className="form-group">
                <label>Шифр</label>
                <MySelect
                    value={groupCipher}
                    onChange={(type) => setGroupCipher(type)}
                    defaultValue="Шифр"
                    options={cipherList}
                />
            </div>

            <div className="form-group">
                <label>Рік вступу</label>
                <input
                    type="date"
                    value={groupYear.replace('T00:00', '')}
                    onChange={e => setGroupYear(e.target.value)}
                    className="form-control" />
            </div>

            <div className="form-group">
                <label>Індекс групи</label>
                <MyInputValidator
                    value={groupIndex}
                    onText={text => setGroupIndex(text)}
                    name="index"
                    placeholder="Індекс"
                    className="form-control"
                    check="^[0-9-]*$"
                />
                <div className="invalid-feedback">
                    Індекс може складатися лише з цифр
                </div>
            </div>

            <div className="text-center m-1">
                <button className="btn btn-success m-1" onClick={saveGroup}>Зберегти</button>
                <button className="btn btn-danger m-1" onClick={cancelBtn}>Відміна</button>
            </div>
        </div>
    );
};

export default GroupForm;