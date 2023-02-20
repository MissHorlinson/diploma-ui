import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { getCipher, saveCipher } from "../../API/UtilDataService";

import MyInputValidator from "../UI/MyInputValdator";

const editImg = require(`../../icon/editIcon.png`);
const saveImg = require(`../../icon/checkIcon.png`);


const Cipher = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role === 3
}))(({ token }) => {
    const [cipherList, setCipherList] = useState([]);
    const [cipherToUpdate, setCipherToUpdate] = useState('');
    const [cipherToUpdateInx, setCipherToUpdateInx] = useState('');
    const [needUpd, setNeedUpd] = useState(false);

    useEffect(() => {
        getCipher(token).then((resp_) => setCipherList(resp_));
    }, []);

    const edit = (item) => {
        setNeedUpd(true);
        setCipherToUpdateInx(item.id);
        setCipherToUpdate(item.name)
    }

    const save = () => {
        const cipher_ = ({
            id: cipherToUpdateInx,
            name: cipherToUpdate
        })
        saveCipher(token, cipher_).then((resp_) => {
            let objIndex = cipherList.findIndex((obj) => obj.id === resp_.id);
            if (objIndex === -1) {
                setCipherList([...cipherList, resp_].sort((a, b) => a.id - b.id));
            } else {
                cipherList[objIndex] = resp_;
                setCipherList([...cipherList].sort((a, b) => a.id - b.id));
            }
        })
        setNeedUpd(false);
        setCipherToUpdateInx('');
        setCipherToUpdate('');
    }

    return (
        <div className="container">
            <h3 className="text-center py-2">Шифр</h3>
            <ul className="list-group list-group-flush">
                {
                    cipherList &&
                    cipherList.map((item) => (
                        <li className="list-group-item flexRow" key={item.id}>
                            {
                                needUpd && cipherToUpdateInx === item.id ?
                                    <>
                                        <MyInputValidator
                                            value={cipherToUpdate}
                                            onText={text => setCipherToUpdate(text)}
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

export default Cipher;