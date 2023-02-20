import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getDepartment, saveDepartment, getDepartmentById } from "../../API/UtilDataService";

import MyModal from "../UI/MyModal";
import DepartmentForm from "./DepartmentForm";

const editImg = require(`../../icon/editIcon.png`);

const Department = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role === 3
}))(({ token, hasWriteAuthority }) => {
    const [deparmentList, setDepartmentList] = useState([]);
    const [departmnetForUpdate, setDepartmnetForUpdate] = useState('');
    const [modal, setModal] = useState(false);

    useEffect(() => {
        getDepartment(token).then((resp_) => setDepartmentList(resp_));
    }, [])


    const edit = (id) => {
        getDepartmentById(token, id).then((resp_) => setDepartmnetForUpdate(resp_));
        setModal(true);
    }

    const saveDepart = (depart) => {
        saveDepartment(token, depart).then((resp_) => {
            let objIndex = deparmentList.findIndex((obj) => obj.id === resp_.id);
            if (objIndex === -1) {
                setDepartmentList([...deparmentList, resp_].sort((a, b) => a.id - b.id));
            } else {
                deparmentList[objIndex] = resp_;
                setDepartmentList([...deparmentList].sort((a, b) => a.id - b.id));
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
                        <DepartmentForm
                            onSave={saveDepart}
                            departmnetForUpdate={departmnetForUpdate}
                            onCancel={() => setModal(false)}
                        />
                    </MyModal>
                </>
            }


            <h3 className="text-center py-2">Кафедра</h3>
            <ul className="list-group list-group-flush">
                {
                    deparmentList &&
                    deparmentList.map((item) => (
                        <li className="list-group-item flexRow" key={item.id}>
                            <div className="oneAndHalfFlex">{item.name} ({item.abbreviation})</div>
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

export default Department;