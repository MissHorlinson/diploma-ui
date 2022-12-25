import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { getDisciplineType, saveDisciplineType } from "../../API/UtilDataService";

import MyInputValidator from "../UI/MyInputValdator";

const editImg = require(`../../icon/editIcon.png`);
const saveImg = require(`../../icon/checkIcon.png`);



const DisciplineType = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role === 3
}))(({ token, hasWriteAuthority }) => {


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
            <ul class="list-group list-group-flush">
                {
                    disciplineTypeList &&
                    disciplineTypeList.map((item) => (
                        <li class="list-group-item" style={{ display: "flex", flexDirection: "row" }} key={item.id}>
                            {
                                needUpd && disciplineTypeToUpdateInx === item.id ?
                                    <>
                                        <MyInputValidator
                                            value={disciplineTypeToUpdate}
                                            onText={text => setDisciplineTypeToUpdate(text)}
                                            className="Type-control"
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

export default DisciplineType;