import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { getStudyingForm, saveStudyingForm } from "../../API/UtilDataService";

import MyInputValidator from "../UI/MyInputValdator";

const editImg = require(`../../icon/editIcon.png`);
const saveImg = require(`../../icon/checkIcon.png`);



const StudyingForm = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role === 3
}))(({ token, hasWriteAuthority }) => {


    const [studyingFormList, setStudyingFormList] = useState([]);

    const [studyingFormToUpdate, setStudyingFormToUpdate] = useState('');
    const [studyingFormToUpdateInx, setStudyingFormToUpdateInx] = useState('');

    const [needUpd, setNeedUpd] = useState(false);

    useEffect(() => {
        getStudyingForm(token).then((resp_) => setStudyingFormList(resp_));
    }, []);

    const edit = (item) => {
        setNeedUpd(true);
        setStudyingFormToUpdateInx(item.id);
        setStudyingFormToUpdate(item.name)
    }

    const save = () => {
        const studyingForm_ = ({
            id: studyingFormToUpdateInx,
            name: studyingFormToUpdate
        })
        saveStudyingForm(token, studyingForm_).then((resp_) => {
            let objIndex = studyingFormList.findIndex((obj) => obj.id === resp_.id);
            if (objIndex === -1) {
                setStudyingFormList([...studyingFormList, resp_].sort((a, b) => a.id - b.id));
            } else {
                studyingFormList[objIndex] = resp_;
                setStudyingFormList([...studyingFormList].sort((a, b) => a.id - b.id));
            }
        })
        setNeedUpd(false);
        setStudyingFormToUpdateInx('');
        setStudyingFormToUpdate('');
    }

    return (
        <div className="container">
            <h3 className="text-center py-2">Форма навчання</h3>
            <ul className="list-group list-group-flush">
                {
                    studyingFormList &&
                    studyingFormList.map((item) => (
                        <li className="list-group-item" style={{ display: "flex", flexDirection: "row" }} key={item.id}>
                            {
                                needUpd && studyingFormToUpdateInx === item.id ?
                                    <>
                                        <MyInputValidator
                                            value={studyingFormToUpdate}
                                            onText={text => setStudyingFormToUpdate(text)}
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

export default StudyingForm;