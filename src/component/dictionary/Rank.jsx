import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { getRank, saveRank } from "../../API/UtilDataService";

import MyInputValidator from "../UI/MyInputValdator";

const editImg = require(`../../icon/editIcon.png`);
const saveImg = require(`../../icon/checkIcon.png`);



const Rank = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role === 3
}))(({ token, hasWriteAuthority }) => {


    const [rankList, setRankList] = useState([]);

    const [rankToUpdate, setRankToUpdate] = useState('');
    const [rankToUpdateInx, setRankToUpdateInx] = useState('');

    const [needUpd, setNeedUpd] = useState(false);

    useEffect(() => {
        getRank(token).then((resp_) => setRankList(resp_));
    }, []);

    const edit = (item) => {
        setNeedUpd(true);
        setRankToUpdateInx(item.id);
        setRankToUpdate(item.name)
    }

    const save = () => {
        const rank_ = ({
            id: rankToUpdateInx,
            name: rankToUpdate
        })
        saveRank(token, rank_).then((resp_) => {
            let objIndex = rankList.findIndex((obj) => obj.id === resp_.id);
            if (objIndex === -1) {
                setRankList([...rankList, resp_].sort((a, b) => a.id - b.id));
            } else {
                rankList[objIndex] = resp_;
                setRankList([...rankList].sort((a, b) => a.id - b.id));
            }
        })
        setNeedUpd(false);
        setRankToUpdateInx('');
        setRankToUpdate('');
    }

    return (
        <div className="container">
            <ul class="list-group list-group-flush">
                {
                    rankList &&
                    rankList.map((item) => (
                        <li class="list-group-item" style={{ display: "flex", flexDirection: "row" }} key={item.id}>
                            {
                                needUpd && rankToUpdateInx === item.id ?
                                    <>
                                        <MyInputValidator
                                            value={rankToUpdate}
                                            onText={text => setRankToUpdate(text)}
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

export default Rank;