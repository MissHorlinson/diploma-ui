import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { getDisciplineForm, saveDisciplineForm } from "../../API/UtilDataService";

import MyInputValidator from "../UI/MyInputValdator";

const editImg = require(`../../icon/editIcon.png`);
const saveImg = require(`../../icon/checkIcon.png`);

const DisciplineForm = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role === 3
}))(({ token }) => {
    const [disciplineFormList, setDisciplineFormList] = useState([]);
    const [disciplineFormToUpdate, setDisciplineFormToUpdate] = useState('');
    const [disciplineFormToUpdateInx, setDisciplineFormToUpdateInx] = useState('');
    const [needUpd, setNeedUpd] = useState(false);

    useEffect(() => {
        getDisciplineForm(token).then((resp_) => setDisciplineFormList(resp_));
    }, []);

    const edit = (item) => {
        setNeedUpd(true);
        setDisciplineFormToUpdateInx(item.id);
        setDisciplineFormToUpdate(item.name)
    }

    const save = () => {
        const disciplineForm_ = ({
            id: disciplineFormToUpdateInx,
            name: disciplineFormToUpdate
        })
        saveDisciplineForm(token, disciplineForm_).then((resp_) => {
            let objIndex = disciplineFormList.findIndex((obj) => obj.id === resp_.id);
            if (objIndex === -1) {
                setDisciplineFormList([...disciplineFormList, resp_].sort((a, b) => a.id - b.id));
            } else {
                disciplineFormList[objIndex] = resp_;
                setDisciplineFormList([...disciplineFormList].sort((a, b) => a.id - b.id));
            }
        })
        setNeedUpd(false);
        setDisciplineFormToUpdateInx('');
        setDisciplineFormToUpdate('');
    }

    return (
        <div className="container">
            <h3 className="text-center py-2">Форма дисципліни</h3>
            <ul className="list-group list-group-flush">
                {
                    disciplineFormList &&
                    disciplineFormList.map((item) => (
                        <li className="list-group-item flexRow" key={item.id}>
                            {
                                needUpd && disciplineFormToUpdateInx === item.id ?
                                    <>
                                        <MyInputValidator
                                            value={disciplineFormToUpdate}
                                            onText={text => setDisciplineFormToUpdate(text)}
                                            className="form-control"
                                            check="[a-z]*$"
                                        />
                                        <button className="transparentBtn" onClick={() => save()} >
                                            <img src={saveImg} className="transparentEditBtn" alt="edit" />
                                        </button>
                                    </>
                                    :
                                    <>
                                        <div className="oneAndHalfFlex">{item.name}</div>
                                        <button className="transparentBtn" onClick={() => edit(item)}>
                                            <img src={editImg} className="transparentEditBtn" alt="edit" />
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

export default DisciplineForm;