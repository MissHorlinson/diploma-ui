import React from "react";
import { Link } from "react-router-dom";

import "./allPlanList.css";

const AllPlanList = ({ planList }) => {

    return (
        <div className="container">
            <div className="titleRow">
                <div className="headItemTitle">Year</div>
                <div className="headItemTitle">Step</div>
                <div className="headDoubletemTitle">Rector</div>
                <div className="headDoubletemTitle">Base</div>
                <div className="headItemTitle">Cipher</div>
                <div className="headDoubletemTitle">Action</div>
            </div>
            <div className="bodyContainer">
                {
                    planList &&
                    planList.map((item) => (
                        <div className="bodyRow" key={item.planId}>
                            <div className="bodyItem text-centers">{item.admissionYear.substr(0, 4)}</div>
                            <div className="bodyItem text-center">{item.step}</div>
                            <div className="bodyDoubleItem">{item.rector}</div>
                            <div className="bodyDoubleItem">{item.base}</div>
                            <div className="bodyItem text-center">{item.planCipher}</div>
                            <div className="bodyDoubleItem text-center">
                                <Link className="btn btn-secondary actionBtn" to={"./" + item.planId + "/weeks"}>Weeks</Link>
                                <Link className="btn btn-secondary actionBtn" to={"./" + item.planId + "/disciplines"}>Discipline</Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AllPlanList;