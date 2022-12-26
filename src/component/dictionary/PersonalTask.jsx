import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { getPersonalTaskForm, savePersonalTaskForm } from "../../API/UtilDataService";

import MyInputValidator from "../UI/MyInputValdator";

const editImg = require(`../../icon/editIcon.png`);
const saveImg = require(`../../icon/checkIcon.png`);



const PersonalTask = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role === 3
}))(({ token, hasWriteAuthority }) => {


    const [personalTaskFormList, setPersonalTaskFormList] = useState([]);

    const [personalTaskFormToUpdate, setPersonalTaskFormToUpdate] = useState('');
    const [personalTaskFormToUpdateInx, setPersonalTaskFormToUpdateInx] = useState('');

    const [needUpd, setNeedUpd] = useState(false);

    useEffect(() => {
        getPersonalTaskForm(token).then((resp_) => setPersonalTaskFormList(resp_));
    }, []);

    const edit = (item) => {
        setNeedUpd(true);
        setPersonalTaskFormToUpdateInx(item.id);
        setPersonalTaskFormToUpdate(item.name)
    }

    const save = () => {
        const personalTask_ = ({
            id: personalTaskFormToUpdateInx,
            name: personalTaskFormToUpdate
        })
        savePersonalTaskForm(token, personalTask_).then((resp_) => {
            let objIndex = personalTaskFormList.findIndex((obj) => obj.id === resp_.id);
            if (objIndex === -1) {
                setPersonalTaskFormList([...personalTaskFormList, resp_].sort((a, b) => a.id - b.id));
            } else {
                personalTaskFormList[objIndex] = resp_;
                setPersonalTaskFormList([...personalTaskFormList].sort((a, b) => a.id - b.id));
            }
        })
        setNeedUpd(false);
        setPersonalTaskFormToUpdateInx('');
        setPersonalTaskFormToUpdate('');
    }

    return (
        <div className="container">
            <h3 className="text-center py-2">Індивідуальне завдання</h3>
            <ul className="list-group list-group-flush">
                {
                    personalTaskFormList &&
                    personalTaskFormList.map((item) => (
                        <li className="list-group-item" style={{ display: "flex", flexDirection: "row" }} key={item.id}>
                            {
                                needUpd && personalTaskFormToUpdateInx === item.id ?
                                    <>
                                        <MyInputValidator
                                            value={personalTaskFormToUpdate}
                                            onText={text => setPersonalTaskFormToUpdate(text)}
                                            className="form-control"
                                            check="[a-z]*$"
                                        />
                                        <button style={{ backgroundColor: "transparent", borderColor: "transparent", flex: 0.5 }} onClick={() => save()} >
                                            <img src={saveImg} style={{ width: "35px", height: "35px" }} alt="edit" />
                                        </button>
                                    </>
                                    :
                                    <>
                                        <div style={{ flex: 1.5 }}>{item.name}</div>
                                        <button style={{ backgroundColor: "transparent", borderColor: "transparent", flex: 0.5 }} onClick={() => edit(item)}>
                                            <img src={editImg} style={{ width: "35px", height: "35px" }} alt="edit" />
                                        </button>

                                    </>
                            }


                        </li>
                    ))
                }
            </ul>
        </div>
    )
})

export default PersonalTask;