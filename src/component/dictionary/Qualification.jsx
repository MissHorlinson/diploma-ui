import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { getQualification, saveQualification } from "../../API/UtilDataService";

import MyInputValidator from "../UI/MyInputValdator";

const editImg = require(`../../icon/editIcon.png`);
const saveImg = require(`../../icon/checkIcon.png`);



const Qualification = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role === 3
}))(({ token, hasWriteAuthority }) => {


    const [qualificationList, setQualificationList] = useState([]);

    const [qualificationToUpdate, setQualificationToUpdate] = useState('');
    const [qualificationToUpdateInx, setQualificationToUpdateInx] = useState('');

    const [needUpd, setNeedUpd] = useState(false);

    useEffect(() => {
        getQualification(token).then((resp_) => setQualificationList(resp_));
    }, []);

    const edit = (item) => {
        setNeedUpd(true);
        setQualificationToUpdateInx(item.id);
        setQualificationToUpdate(item.name)
    }

    const save = () => {
        const qualification_ = ({
            id: qualificationToUpdateInx,
            name: qualificationToUpdate
        })
        saveQualification(token, qualification_).then((resp_) => {
            let objIndex = qualificationList.findIndex((obj) => obj.id === resp_.id);
            if (objIndex === -1) {
                setQualificationList([...qualificationList, resp_].sort((a, b) => a.id - b.id));
            } else {
                qualificationList[objIndex] = resp_;
                setQualificationList([...qualificationList].sort((a, b) => a.id - b.id));
            }
        })
        setNeedUpd(false);
        setQualificationToUpdateInx('');
        setQualificationToUpdate('');
    }

    return (
        <div className="container">
            <h3 className="text-center py-2">Кваліфікація</h3>
            <ul className="list-group list-group-flush">
                {
                    qualificationList &&
                    qualificationList.map((item) => (
                        <li className="list-group-item" style={{ display: "flex", flexDirection: "row" }} key={item.id}>
                            {
                                needUpd && qualificationToUpdateInx === item.id ?
                                    <>
                                        <MyInputValidator
                                            value={qualificationToUpdate}
                                            onText={text => setQualificationToUpdate(text)}
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

export default Qualification;