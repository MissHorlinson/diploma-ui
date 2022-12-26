import React, { useState, useEffect } from "react";

import MyInputValidator from "../UI/MyInputValdator";
import MySelect from "../UI/MySelect";

const CreateUserForm = ({ roleList, statusList, onSave, onCancel }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(4);
    const [status, setStatus] = useState(0);


    const clearForm = () => {
        setUsername('');
        setPassword('');
        setRole(4);
        setStatus(0);
    }

    const saveUser = () => {

    }

    const cancelBtn = () => {
        clearForm();
        onCancel();
    }

    return (
        <div className="container">
            <div className="form-group">
                <label>Логін</label>
                <MyInputValidator
                    value={username}
                    onText={text => setUsername(text)}
                    placeholder="логін"
                    className="form-control"
                    check="[А-Я][а-я]*$" />
                <div className="invalid-feedback">
                    Can be only numbers
                </div>
            </div>
            <div className="form-group">
                <label>Пароль</label>
                <MyInputValidator
                    value={password}
                    onText={text => setPassword(text)}
                    placeholder="Пароль"
                    className="form-control"
                    check="[А-Я][а-я]*$" />
                <div className="invalid-feedback">
                    Can be only numbers
                </div>
            </div>

            <div className="form-group">
                <label>Роль користувача</label>
                <MySelect
                    value={role}
                    onChange={(type) => setRole(type)}
                    defaultValue=""
                    options={roleList} />
            </div>
            <div className="form-group">
                <label>Статус користувача</label>
                <MySelect
                    value={status}
                    onChange={(type) => setStatus(type)}
                    defaultValue="статус"
                    options={statusList} />
            </div>

            <div style={{ textAlign: "center", margin: "5px" }}>
                <button className="btn btn-info" onClick={saveUser}>Save</button>
                <button className="btn btn-danger" onClick={() => cancelBtn()}>Cancel</button>
            </div>
        </div>
    )

}

export default CreateUserForm;