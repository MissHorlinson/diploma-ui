import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { getStep, saveStep } from "../../API/UtilDataService";

import MyInputValidator from "../UI/MyInputValdator";

const editImg = require(`../../icon/editIcon.png`);
const saveImg = require(`../../icon/checkIcon.png`);

const Step = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role === 3
}))(({ token }) => {
    const [stepList, setStepList] = useState([]);
    const [stepToUpdate, setStepToUpdate] = useState('');
    const [stepToUpdateInx, setStepToUpdateInx] = useState('');
    const [needUpd, setNeedUpd] = useState(false);

    useEffect(() => {
        getStep(token).then((resp_) => setStepList(resp_));
    }, []);

    const edit = (item) => {
        setNeedUpd(true);
        setStepToUpdateInx(item.id);
        setStepToUpdate(item.name)
    }

    const save = () => {
        const step_ = ({
            id: stepToUpdateInx,
            name: stepToUpdate
        })
        saveStep(token, step_).then((resp_) => {
            let objIndex = stepList.findIndex((obj) => obj.id === resp_.id);
            if (objIndex === -1) {
                setStepList([...stepList, resp_].sort((a, b) => a.id - b.id));
            } else {
                stepList[objIndex] = resp_;
                setStepList([...stepList].sort((a, b) => a.id - b.id));
            }
        })
        setNeedUpd(false);
        setStepToUpdateInx('');
        setStepToUpdate('');
    }

    return (
        <div className="container">
            <h3 className="text-center py-2">Підготовка</h3>
            <ul className="list-group list-group-flush">
                {
                    stepList &&
                    stepList.map((item) => (
                        <li className="list-group-item flexRow" key={item.id}>
                            {
                                needUpd && stepToUpdateInx === item.id ?
                                    <>
                                        <MyInputValidator
                                            value={stepToUpdate}
                                            onText={text => setStepToUpdate(text)}
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

export default Step;