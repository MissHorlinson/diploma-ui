import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { getBase, saveBase } from "../../API/UtilDataService";

import MyInputValidator from "../UI/MyInputValdator";

const editImg = require(`../../icon/editIcon.png`);
const saveImg = require(`../../icon/checkIcon.png`);



const Base = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role === 3
}))(({ token, hasWriteAuthority }) => {


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
            <ul class="list-group list-group-flush">
                {
                    baseList &&
                    baseList.map((item) => (
                        <li class="list-group-item" style={{ display: "flex", flexDirection: "row" }} key={item.id}>
                            {
                                needUpd && baseToUpdateInx === item.id ?
                                    <>
                                        <MyInputValidator
                                            value={baseToUpdate}
                                            onText={text => setBaseToUpdate(text)}
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

export default Base;