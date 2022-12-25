import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { getDegree, saveDegree } from "../../API/UtilDataService";

import MyInputValidator from "../UI/MyInputValdator";

const editImg = require(`../../icon/editIcon.png`);
const saveImg = require(`../../icon/checkIcon.png`);



const Degree = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role === 3
}))(({ token, hasWriteAuthority }) => {


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
            <ul class="list-group list-group-flush">
                {
                    degreeList &&
                    degreeList.map((item) => (
                        <li class="list-group-item" style={{ display: "flex", flexDirection: "row" }} key={item.id}>
                            {
                                needUpd && degreeToUpdateInx === item.id ?
                                    <>
                                        <MyInputValidator
                                            value={degreeToUpdate}
                                            onText={text => setDegreeToUpdate(text)}
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

export default Degree;