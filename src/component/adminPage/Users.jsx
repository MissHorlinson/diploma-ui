import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { useFetching } from "../../hooks/useFetching";

import { getRoleList, getStatusList, getUsersList } from "../../API/AdminService";

import CreateUserForm from "./CreateUserForm";
import MyModal from "../UI/MyModal";

const editImg = require("../../icon/editIcon.png");

const User = connect((user) => ({
    token: user.token
}))(({ token }) => {

    const [userList, setUserList] = useState([]);
    const [roleList, setRoleList] = useState([]);
    const [statusList, setStausList] = useState([]);

    const [modal, setModal] = useState(false);

    const [fetchData, isListLoading, listError] = useFetching(async () => {

        getRoleList(token).then((resp_) => setRoleList(resp_.map((item, i) => ({ id: i, name: item }))));
        getStatusList(token).then((resp_) => setStausList(resp_.map((item, i) => ({ id: i, name: item }))));
        getUsersList(token).then((resp_) => setUserList(resp_));
    });

    useEffect(() => {
        fetchData();
    }, []);


    const edit = (item) => {

    }

    return (
        <div className="container">
            <button style={{ margin: "10px" }} className="btn btn-warning" onClick={() => setModal(true)}>Додати користувача</button>
            <MyModal visible={modal} setVisible={setModal}>
                <CreateUserForm
                    roleList={roleList}
                    statusList={statusList}
                    onCancel={() => setModal(false)}
                />
            </MyModal>

            <h3 className="text-center py-2">Користувачі системи</h3>
            <ul className="list-group list-group-flush">
                <div style={{ display: "flex", flex: 1 }} className="d-flex justify-content-between">
                    <div style={{ flex: 1.5 }} className="px-2">логін</div>
                    <div style={{ flex: 1.5 }}>роль</div>
                    <div style={{ flex: 1.5 }}>статус</div>
                    {/* <div style={{ flex: 0.5 }}>action</div> */}
                </div>
                {
                    userList &&
                    userList.map((item) => (
                        <li className="list-group-item" style={{ display: "flex", flexDirection: "row" }} key={item.id}>
                            <div style={{ display: "flex", flex: 1 }}>
                                <div style={{ flex: 1.5 }}>{item.username}</div>
                                <div style={{ flex: 1.5 }}>{item.role} </div>
                                <div style={{ flex: 1.5 }}>{item.status}</div>
                                {/* <button style={{ backgroundColor: "transparent", borderColor: "transparent", flex: 0.5 }} onClick={() => edit(item)}>
                                    <img src={editImg} style={{ width: "35px", height: "35px" }} alt="edit" />
                                </button> */}
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )

})

export default User;