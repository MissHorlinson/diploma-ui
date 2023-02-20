import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { getRank, saveRank } from "../../API/UtilDataService";

import MyInputValidator from "../UI/MyInputValdator";

const editImg = require(`../../icon/editIcon.png`);
const saveImg = require(`../../icon/checkIcon.png`);

const Rank = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role === 3
}))(({ token }) => {
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
            <h3 className="text-center py-2">Звання</h3>
            <ul className="list-group list-group-flush">
                {
                    rankList &&
                    rankList.map((item) => (
                        <li className="list-group-item flexRow" key={item.id}>
                            {
                                needUpd && rankToUpdateInx === item.id ?
                                    <>
                                        <MyInputValidator
                                            value={rankToUpdate}
                                            onText={text => setRankToUpdate(text)}
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

export default Rank;