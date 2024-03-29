import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getStudyingTerm, saveStudyingTerm, getStudyingTermById } from "../../API/UtilDataService";

import MyModal from "../UI/MyModal";
import StudyingTermForm from "./StudyingTermForm";


const editImg = require(`../../icon/editIcon.png`);
const saveImg = require(`../../icon/checkIcon.png`);


const StudyingTerm = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role === 3
}))(({ token, hasWriteAuthority }) => {
    const [studyingTermList, setStudyingTermList] = useState([]);
    const [modal, setModal] = useState(false);
    const [termToUpdate, setTermToUpdate] = useState('');

    useEffect(() => {
        getStudyingTerm(token).then((resp_) => setStudyingTermList(resp_));
    }, []);

    const edit = (id) => {
        getStudyingTermById(token, id).then((resp_) => setTermToUpdate(resp_));
        setModal(true);
    }

    const saveTerm = (term) => {
        saveStudyingTerm(token, term).then((resp_) => {
            let objIndex = studyingTermList.findIndex((obj) => obj.id === resp_.id);
            if (objIndex === -1) {
                setStudyingTermList([...studyingTermList, resp_].sort((a, b) => a.id - b.id));
            } else {
                studyingTermList[objIndex] = resp_;
                setStudyingTermList([...studyingTermList].sort((a, b) => a.id - b.id));
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
                        <StudyingTermForm
                            onSave={saveTerm}
                            termToUpdate={termToUpdate}
                            onCancel={() => setModal(false)}
                        />
                    </MyModal>
                </>
            }


            <h3 className="text-center py-2">Строк навчання</h3>
            <ul className="list-group list-group-flush">
                {
                    studyingTermList &&
                    studyingTermList.map((item) => (
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

export default StudyingTerm;