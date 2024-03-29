import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { getDisciplineType, saveDisciplineType } from "../../API/UtilDataService";

import MyInputValidator from "../UI/MyInputValdator";

const editImg = require(`../../icon/editIcon.png`);
const saveImg = require(`../../icon/checkIcon.png`);


const DisciplineType = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role === 3
}))(({ token }) => {
    const [disciplineTypeList, setDisciplineTypeList] = useState([]);
    const [disciplineTypeToUpdate, setDisciplineTypeToUpdate] = useState('');
    const [disciplineTypeToUpdateInx, setDisciplineTypeToUpdateInx] = useState('');
    const [needUpd, setNeedUpd] = useState(false);

    useEffect(() => {
        getDisciplineType(token).then((resp_) => setDisciplineTypeList(resp_));
    }, []);

    const edit = (item) => {
        setNeedUpd(true);
        setDisciplineTypeToUpdateInx(item.id);
        setDisciplineTypeToUpdate(item.name)
    }

    const save = () => {
        const disciplineType_ = ({
            id: disciplineTypeToUpdateInx,
            name: disciplineTypeToUpdate
        })
        saveDisciplineType(token, disciplineType_).then((resp_) => {
            let objIndex = disciplineTypeList.findIndex((obj) => obj.id === resp_.id);
            if (objIndex === -1) {
                setDisciplineTypeList([...disciplineTypeList, resp_].sort((a, b) => a.id - b.id));
            } else {
                disciplineTypeList[objIndex] = resp_;
                setDisciplineTypeList([...disciplineTypeList].sort((a, b) => a.id - b.id));
            }
        })
        setNeedUpd(false);
        setDisciplineTypeToUpdateInx('');
        setDisciplineTypeToUpdate('');
    }

    return (
        <div className="container">
            <h3 className="text-center py-2">Цикл дисципліни</h3>
            <ul className="list-group list-group-flush">
                {
                    disciplineTypeList &&
                    disciplineTypeList.map((item) => (
                        <li className="list-group-item flexRow" key={item.id}>
                            {
                                needUpd && disciplineTypeToUpdateInx === item.id ?
                                    <>
                                        <MyInputValidator
                                            value={disciplineTypeToUpdate}
                                            onText={text => setDisciplineTypeToUpdate(text)}
                                            className="Type-control"
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

export default DisciplineType;