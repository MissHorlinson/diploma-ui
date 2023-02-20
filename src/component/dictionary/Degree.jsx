import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { getDegree, saveDegree } from "../../API/UtilDataService";

import MyInputValidator from "../UI/MyInputValdator";

const editImg = require(`../../icon/editIcon.png`);
const saveImg = require(`../../icon/checkIcon.png`);


const Degree = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role === 3
}))(({ token }) => {
    const [degreeList, setDegreeList] = useState([]);
    const [degreeToUpdate, setDegreeToUpdate] = useState('');
    const [degreeToUpdateInx, setDegreeToUpdateInx] = useState('');
    const [needUpd, setNeedUpd] = useState(false);

    useEffect(() => {
        getDegree(token).then((resp_) => setDegreeList(resp_));
    }, []);

    const edit = (item) => {
        setNeedUpd(true);
        setDegreeToUpdateInx(item.id);
        setDegreeToUpdate(item.name)
    }

    const save = () => {
        const degree_ = ({
            id: degreeToUpdateInx,
            name: degreeToUpdate
        })
        saveDegree(token, degree_).then((resp_) => {
            let objIndex = degreeList.findIndex((obj) => obj.id === resp_.id);
            if (objIndex === -1) {
                setDegreeList([...degreeList, resp_].sort((a, b) => a.id - b.id));
            } else {
                degreeList[objIndex] = resp_;
                setDegreeList([...degreeList].sort((a, b) => a.id - b.id));
            }
        })
        setNeedUpd(false);
        setDegreeToUpdateInx('');
        setDegreeToUpdate('');
    }

    return (
        <div className="container">
            <h3 className="text-center py-2">Ступінь</h3>
            <ul className="list-group list-group-flush">
                {
                    degreeList &&
                    degreeList.map((item) => (
                        <li className="list-group-item flexRow" key={item.id}>
                            {
                                needUpd && degreeToUpdateInx === item.id ?
                                    <>
                                        <MyInputValidator
                                            value={degreeToUpdate}
                                            onText={text => setDegreeToUpdate(text)}
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

export default Degree;