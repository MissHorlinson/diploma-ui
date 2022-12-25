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


            <ul class="list-group list-group-flush">
                {
                    deparmentList &&
                    deparmentList.map((item) => (
                        <li class="list-group-item" style={{ display: "flex", flexDirection: "row" }} key={item.id}>
                            <div style={{ flex: 1.5 }}>{item.name} ({item.abbreviation})</div>
                            <button style={{ backgroundColor: "transparent", borderColor: "transparent", flex: 0.5 }} onClick={() => edit(item.id)}>
                                <img src={editImg} style={{ width: "35px", height: "35px" }} alt="edit" />
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
})

export default Department;