import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { getStudyingForm, saveStudyingForm } from "../../API/UtilDataService";

import MyInputValidator from "../UI/MyInputValdator";

const editImg = require(`../../icon/editIcon.png`);
const saveImg = require(`../../icon/checkIcon.png`);

const StudyingForm = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role === 3
}))(({ token }) => {
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
                        <li className="list-group-item flexRow" key={item.id}>
                            {
                                needUpd && studyingFormToUpdateInx === item.id ?
                                    <>
                                        <MyInputValidator
                                            value={studyingFormToUpdate}
                                            onText={text => setStudyingFormToUpdate(text)}
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

export default StudyingForm;