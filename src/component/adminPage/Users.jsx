import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { useFetching } from "../../hooks/useFetching";

import { getRoleList, getStatusList, getUsersList, createUser, getUserByUsername } from "../../API/AdminService";

import CreateUserForm from "./CreateUserForm";
import MyModal from "../UI/MyModal";
import UsersList from "./UsersList";


const User = connect((user) => ({
    token: user.token
}))(({ token }) => {

    const [userList, setUserList] = useState([]);
    const [roleList, setRoleList] = useState([]);
    const [statusList, setStausList] = useState([]);
    const [usetToupdate, setUserToUpdate] = useState('');

    const [modal, setModal] = useState(false);

    const [fetchData, isListLoading, listError] = useFetching(async () => {

        getRoleList(token).then((resp_) => setRoleList(resp_.map((item, i) => ({ id: i, name: item }))));
        getStatusList(token).then((resp_) => setStausList(resp_.map((item, i) => ({ id: i, name: item }))));
        getUsersList(token).then((resp_) => setUserList(resp_));
    });

    useEffect(() => {
        fetchData();
    }, []);

    const getUserForUpdate = (user) => {
        getUserByUsername(token, user.username).then((resp_) => {
            setUserToUpdate(resp_);
            setModal(true);
        })
    }


    const saveNewUser = (user) => {
        createUser(token, user).then((resp_) => {
            let objIndex = userList.findIndex((obj) => obj.id === resp_.id)
            if (objIndex === -1) {
                setUserList([...userList, resp_].sort((a, b) => a.id - b.id));
            } else {
                userList[objIndex] = resp_;
                setUserList([...userList].sort((a, b) => a.id - b.id));
            }
            setModal(false)
        })
    }

    return (
        <div className="container">
            <button className="btn btn-warning m-2" onClick={() => setModal(true)}>Додати користувача</button>
            <MyModal visible={modal} setVisible={setModal}>
                <CreateUserForm
                    roleList={roleList}
                    statusList={statusList}
                    onSave={saveNewUser}
                    onCancel={() => setModal(false)}
                    userToUpdate={usetToupdate}
                />
            </MyModal>

            <h3 className="text-center py-2">Користувачі системи</h3>
            <ul className="list-group list-group-flush">
                <div className="d-flex justify-content-between userPgTitle">
                    <div className="px-2 oneAndHalfFlex">Логін</div>
                    <div className="oneAndHalfFlex">Роль</div>
                    <div className="oneAndHalfFlex">Статус</div>
                    <div className="halfFlex"></div>
                </div>
                <UsersList
                    userList={userList}
                    edit={getUserForUpdate}
                />
            </ul>
        </div>
    )

})

export default User;