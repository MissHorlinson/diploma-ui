import React from 'react';
import { Link } from 'react-router-dom';
import "./listStyle.css";

const AllGroupList = ({ groupList, onUpdate, hasWriteAuthority }) => {
    return (
        <div className="container">
            <div className="titleRow">
                <div className="headItemTitle">Группа</div>
                <div className="headItemTitle">Студенты</div>
                <div className="headItemTitle">Планы</div>
                {
                    hasWriteAuthority && <div className="headItemTitle">Action</div>
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
                            <div className="bodyItem text-center"><button>Save plan</button></div>
                            {
                                hasWriteAuthority &&
                                <div className="bodyItem text-center">
                                    <button style={{ backgroundColor: "transparent", borderColor: "transparent", flex: 0.5 }}>
                                        <img src={require(`../../icon/editIcon.png`)} style={{ width: "35px", height: "35px" }} alt="edit" onClick={() => onUpdate(item.id)} />
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