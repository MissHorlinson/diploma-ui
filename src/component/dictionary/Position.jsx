import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { getPosition, savePosition } from "../../API/UtilDataService";

import MyInputValidator from "../UI/MyInputValdator";

const editImg = require(`../../icon/editIcon.png`);
const saveImg = require(`../../icon/checkIcon.png`);

const Position = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role === 3
}))(({ token }) => {
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
            <h3 className="text-center py-2">Посада</h3>
            <ul className="list-group list-group-flush">
                {
                    positionList &&
                    positionList.map((item) => (
                        <li className="list-group-item flexRow" key={item.id}>
                            {
                                needUpd && positionToUpdateInx === item.id ?
                                    <>
                                        <MyInputValidator
                                            value={positionToUpdate}
                                            onText={text => setPositionToUpdate(text)}
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

export default Position;