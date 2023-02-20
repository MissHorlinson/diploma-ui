import React from "react";

const editImg = require("../../icon/editIcon.png");

const UsersList = ({ userList, edit }) => {
    return (
        <>
            {
                userList &&
                userList.map((item) => (
                    <li className="list-group-item flexRow" key={item.id}>
                        <div className="oneAndHalfFlex">{item.username}</div>
                        <div className="oneAndHalfFlex">{item.role} </div>
                        <div className="oneAndHalfFlex">{item.status}</div>
                        <button className="transparentBtn" onClick={() => edit(item)}>
                            <img src={editImg} className="transparentEditBtn" alt="edit" />
                        </button>
                    </li>
                ))
            }
        </>
    )
}

export default UsersList;