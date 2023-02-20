import React from 'react';
import { Link } from 'react-router-dom';

const AllGroupList = ({ groupList, onUpdate, hasWriteAuthority }) => {
    return (
        <div className="container">
            <div className="titleRow">
                <div className="headItemTitle">Группа</div>
                <div className="headItemTitle">Студенты</div>
                {
                    hasWriteAuthority &&
                    <div className="headItemTitle"></div>
                }
            </div>

            <div className="bodyContainer">
                {
                    groupList &&
                    groupList.map((item) => (
                        <div className="bodyRow" key={item.id}>
                            <div className="bodyItem text-center">{item.groupFullName}</div>
                            <div className="bodyItem text-center">
                                <Link className="btn btn-secondary actionBtn" to={"./" + item.id + "/students"}>Студенты</Link>
                            </div>
                            {
                                hasWriteAuthority &&
                                <div className="bodyItem text-center">
                                    <button className="transparentBtn">
                                        <img src={require(`../../icon/editIcon.png`)} className="transparentEditBtn" alt="edit" onClick={() => onUpdate(item.id)} />
                                    </button>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default AllGroupList;