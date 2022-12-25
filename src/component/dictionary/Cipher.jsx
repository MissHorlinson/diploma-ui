import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { getCipher, saveCipher } from "../../API/UtilDataService";

import MyInputValidator from "../UI/MyInputValdator";

const editImg = require(`../../icon/editIcon.png`);
const saveImg = require(`../../icon/checkIcon.png`);



const Cipher = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role === 3
}))(({ token, hasWriteAuthority }) => {


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
            <ul class="list-group list-group-flush">
                {
                    cipherList &&
                    cipherList.map((item) => (
                        <li class="list-group-item" style={{ display: "flex", flexDirection: "row" }} key={item.id}>
                            {
                                needUpd && cipherToUpdateInx === item.id ?
                                    <>
                                        <MyInputValidator
                                            value={cipherToUpdate}
                                            onText={text => setCipherToUpdate(text)}
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

export default Cipher;