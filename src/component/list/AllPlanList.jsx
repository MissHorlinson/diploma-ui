import React from "react";
import { Link } from "react-router-dom";

const AllPlanList = ({ planList, onUpdate, onLoad, hasWriteAuthority, hasReadAuthority }) => {
    return (
        <div className="container">
            <div className="titleRow">
                <div className="headItemTitle">Рік</div>
                <div className="headDoubletemTitle">Кваліфікаця</div>
                <div className="headDoubletemTitle">Основа</div>
                <div className="headItemTitle">Шифр</div>
                {hasReadAuthority && <div className="headItemTitle">Завантажити</div>}
                {hasWriteAuthority && <div className="headDoubletemTitle">Деталі</div>}
                {hasWriteAuthority && <div className="headItemTitle"></div>}
            </div>
            <div className="bodyContainer">
                {
                    planList &&
                    planList.map((item) => (
                        <div className="bodyRow" key={item.planId}>
                            <div className="bodyItem text-center">{item.admissionYear.substr(0, 4)}</div>
                            <div className="bodyDoubleItem">{item.step}</div>
                            <div className="bodyDoubleItem">{item.base}</div>
                            <div className="bodyItem text-center">{item.planCipher}</div>
                            {
                                hasReadAuthority &&
                                <div className="bodyItem text-center">
                                    <button onClick={() => onLoad(item.planId)}>Завантажити план</button>
                                </div>
                            }
                            {
                                hasWriteAuthority &&
                                <div className="bodyDoubleItem text-center">
                                    <Link className="btn btn-secondary actionBtn" to={"./" + item.planId + "/weeks"}>Тиждні</Link>
                                    <Link className="btn btn-secondary actionBtn" to={"./" + item.planId + "/disciplines"}>Дисципліни</Link>
                                </div>
                            }
                            {
                                hasWriteAuthority &&
                                <div className="bodyItem text-center">
                                    <button className="transparentBtn">
                                        <img src={require(`../../icon/editIcon.png`)} className="transparentEditBtn" alt="edit" onClick={() => onUpdate(item.planId)} />
                                    </button>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AllPlanList;