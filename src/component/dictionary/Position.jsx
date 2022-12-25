import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { getPosition, savePosition } from "../../API/UtilDataService";

import MyInputValidator from "../UI/MyInputValdator";

const editImg = require(`../../icon/editIcon.png`);
const saveImg = require(`../../icon/checkIcon.png`);



const Position = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role === 3
}))(({ token, hasWriteAuthority }) => {


    const [positionList, setPositionList] = useState([]);

    const [positionToUpdate, setPositionToUpdate] = useState('');
    const [positionToUpdateInx, setPositionToUpdateInx] = useState('');

    const [needUpd, setNeedUpd] = useState(false);

    useEffect(() => {
        getPosition(token).then((resp_) => setPositionList(resp_));
    }, []);

    const edit = (item) => {
        setNeedUpd(true);
        setPositionToUpdateInx(item.id);
        setPositionToUpdate(item.name)
    }

    const save = () => {
        const position_ = ({
            id: positionToUpdateInx,
            name: positionToUpdate
        })
        savePosition(token, position_).then((resp_) => {
            let objIndex = positionList.findIndex((obj) => obj.id === resp_.id);
            if (objIndex === -1) {
                setPositionList([...positionList, resp_].sort((a, b) => a.id - b.id));
            } else {
                positionList[objIndex] = resp_;
                setPositionList([...positionList].sort((a, b) => a.id - b.id));
            }
        })
        setNeedUpd(false);
        setPositionToUpdateInx('');
        setPositionToUpdate('');
    }

    return (
        <div className="container">
            <ul class="list-group list-group-flush">
                {
                    positionList &&
                    positionList.map((item) => (
                        <li class="list-group-item" style={{ display: "flex", flexDirection: "row" }} key={item.id}>
                            {
                                needUpd && positionToUpdateInx === item.id ?
                                    <>
                                        <MyInputValidator
                                            value={positionToUpdate}
                                            onText={text => setPositionToUpdate(text)}
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

export default Position;