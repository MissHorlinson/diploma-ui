import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { getBase, saveBase } from "../../API/UtilDataService";

import MyInputValidator from "../UI/MyInputValdator";

const editImg = require(`../../icon/editIcon.png`);
const saveImg = require(`../../icon/checkIcon.png`);


const Base = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role === 3
}))(({ token }) => {
    const [baseList, setBaseList] = useState([]);
    const [baseToUpdate, setBaseToUpdate] = useState('');
    const [baseToUpdateInx, setBaseToUpdateInx] = useState('');
    const [needUpd, setNeedUpd] = useState(false);

    useEffect(() => {
        getBase(token).then((resp_) => setBaseList(resp_));
    }, []);

    const edit = (item) => {
        setNeedUpd(true);
        setBaseToUpdateInx(item.id);
        setBaseToUpdate(item.name)
    }

    const save = () => {
        const base_ = ({
            id: baseToUpdateInx,
            name: baseToUpdate
        })
        saveBase(token, base_).then((resp_) => {
            let objIndex = baseList.findIndex((obj) => obj.id === resp_.id);
            if (objIndex === -1) {
                setBaseList([...baseList, resp_].sort((a, b) => a.id - b.id));
            } else {
                baseList[objIndex] = resp_;
                setBaseList([...baseList].sort((a, b) => a.id - b.id));
            }
        })
        setNeedUpd(false);
        setBaseToUpdateInx('');
        setBaseToUpdate('');
    }

    return (
        <div className="container">
            <h3 className="text-center py-2">На основі</h3>
            <ul className="list-group list-group-flush">
                {
                    baseList &&
                    baseList.map((item) => (
                        <li className="list-group-item flexRow" key={item.id}>
                            {
                                needUpd && baseToUpdateInx === item.id ?
                                    <>
                                        <MyInputValidator
                                            value={baseToUpdate}
                                            onText={text => setBaseToUpdate(text)}
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

export default Base;