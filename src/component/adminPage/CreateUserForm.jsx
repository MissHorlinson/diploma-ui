import React, { useEffect, useState } from "react";

import MyInputValidator from "../UI/MyInputValdator";
import MySelect from "../UI/MySelect";

const CreateUserForm = ({ roleList, statusList, onSave, onCancel, userToUpdate }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(4);
    const [status, setStatus] = useState(0);

    useEffect(() => {
        if (userToUpdate) {
            setUsername(userToUpdate.username);
            const roleInx = roleList.findIndex(({ name }) => name === userToUpdate.role);
            setRole(roleInx);
            const statusInx = statusList.findIndex(({ name }) => name === userToUpdate.status);
            setStatus(statusInx);
        }
    }, [userToUpdate])

    const clearForm = () => {
        setUsername('');
        setPassword('');
        setRole(4);
        setStatus(0);
    }

    const saveUser = () => {
        const newUserCred = {
            username: username,
            role: role,
            status: status,
            password: password
        }

        onSave(newUserCred);
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
                    placeholder="Логін"
                    className="form-control"
                    check="[А-Я][а-я]*$" />
                <div className="invalid-feedback">
                    Може складатися лише з літер
                </div>
            </div>
            <div className="form-group">
                <label>Пароль</label>
                <MyInputValidator
                    value={password}
                    onText={text => setPassword(text)}
                    placeholder="Пароль"
                    className="form-control"
                    check="[А-Я][а-я][0-9]*$" />
                <div className="invalid-feedback">
                    Повинен складатися з цифр та літер
                </div>
            </div>

            <div className="form-group">
                <label>Роль користувача</label>
                <MySelect
                    value={role}
                    onChange={(type) => setRole(type)}
                    defaultValue="Роль"
                    options={roleList} />
            </div>
            <div className="form-group">
                <label>Статус користувача</label>
                <MySelect
                    value={status}
                    onChange={(type) => setStatus(type)}
                    defaultValue="Статус"
                    options={statusList} />
            </div>

            <div className="formBtnStyle">
                <button className="btn btn-success m-1" onClick={saveUser}>Зберегти</button>
                <button className="btn btn-danger m-1" onClick={cancelBtn}>Відміна</button>
            </div>
        </div>
    )
}

export default CreateUserForm;