import React from "react";
import { Link } from "react-router-dom";

import "./allPlanList.css";

const AllPlanList = ({ planList, onUpdate }) => {
    return (
        <div className="container">
            <div className="titleRow">
                <div className="headItemTitle">Year</div>
                <div className="headDoubletemTitle">Step</div>
                <div className="headDoubletemTitle">Rector</div>
                <div className="headDoubletemTitle">Base</div>
                <div className="headItemTitle">Cipher</div>
                <div className="headDoubletemTitle">Detail</div>
                <div className="headItemTitle"></div>
            </div>
            <div className="bodyContainer">
                {
                    planList &&
                    planList.map((item) => (
                        <div className="bodyRow" key={item.planId}>
                            <div className="bodyItem text-center">{item.admissionYear.substr(0, 4)}</div>
                            <div className="bodyDoubleItem">{item.step}</div>
                            <div className="bodyDoubleItem">{item.rector}</div>
                            <div className="bodyDoubleItem">{item.base}</div>
                            <div className="bodyItem text-center">{item.planCipher}</div>
                            <div className="bodyDoubleItem text-center">
                                {item.planId}
                                <Link className="btn btn-secondary actionBtn" to={"./" + item.planId + "/weeks"}>Weeks</Link>
                                <Link className="btn btn-secondary actionBtn" to={"./" + item.planId + "/disciplines"}>Discipline</Link>
                            </div>
                            <div className="bodyItem text-center">
                                <button style={{ backgroundColor: "transparent", borderColor: "transparent", flex: 0.5 }}>
                                    <img src={require(`../../icon/editIcon.png`)} style={{ width: "35px", height: "35px" }} alt="edit" onClick={() => onUpdate(item.planId)} />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AllPlanList;