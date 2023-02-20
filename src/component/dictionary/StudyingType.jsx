import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getStudyingType, saveStudyingType, getStudyingTypeById } from "../../API/UtilDataService";

import MyModal from "../UI/MyModal";
import StudyingTypeForm from "./StudyingTypeForm";

const editImg = require(`../../icon/editIcon.png`);

const StudyingType = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role === 3
}))(({ token, hasWriteAuthority }) => {
    const [studyingTypeList, setStudyingTypeList] = useState([]);
    const [modal, setModal] = useState(false);
    const [typeToUpdate, setTypeToUpdate] = useState('');

    useEffect(() => {
        getStudyingType(token).then((resp_) => setStudyingTypeList(resp_));
    }, []);

    const edit = (id) => {
        getStudyingTypeById(token, id).then((resp_) => setTypeToUpdate(resp_));
        setModal(true);
    }

    const saveType = (type) => {
        saveStudyingType(token, type).then((resp_) => {
            let objIndex = studyingTypeList.findIndex((obj) => obj.id === resp_.id);
            if (objIndex === -1) {
                setStudyingTypeList([...studyingTypeList, resp_].sort((a, b) => a.id - b.id));
            } else {
                studyingTypeList[objIndex] = resp_;
                setStudyingTypeList([...studyingTypeList].sort((a, b) => a.id - b.id));
            }
            setModal(false);
        })
    }

    return (
        <div className="container">
            {
                hasWriteAuthority &&
                <>
                    <MyModal visible={modal} setVisible={setModal}>
                        <StudyingTypeForm
                            onSave={saveType}
                            typeToUpdate={typeToUpdate}
                            onCancel={() => setModal(false)}
                        />
                    </MyModal>
                </>
            }

            <h3 className="text-center py-2">Тип навчання</h3>
            <ul className="list-group list-group-flush">
                {
                    studyingTypeList &&
                    studyingTypeList.map((item) => (
                        <li className="list-group-item flexRow" key={item.id}>
                            <div className="oneAndHalfFlex">{item.name}</div>
                            <button className="transparentBtn" onClick={() => edit(item.id)}>
                                <img src={editImg} className="transparentEditBtn" alt="edit" />
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )

})

export default StudyingType;