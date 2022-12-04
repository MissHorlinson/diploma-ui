import React from "react";

import "./listStyle.css";

const PlanDisciplineList = ({ disciplineList, onUpdate }) => {
    return (
        <div className="container">
            <div className="titleRow">
                <div className="headItemTitle">Семестр</div>
                <div className="headItemTitle">Шифр</div>
                <div className="headItemTitle">Номер</div>
                <div className="headDoubletemTitle">Название</div>
                <div className="headItemTitle">Кафедра</div>
                <div className="headItemTitle">Отчетность</div>
                <div className="headDoubletemTitle">Аудиторные часы</div>
                <div className="headDoubletemTitle">Самостоятельные часы</div>
                <div className="headDoubletemTitle">Индивидуальные задания</div>
                <div className="headItemTitle">Action</div>
            </div>

            <div className="bodyContainer">
                {
                    disciplineList &&
                    disciplineList.map((item) => (
                        <div className="bodyRow" key={item.id}>
                            <div className="bodyItem text-center">{item.semester}</div>
                            <div className="bodyItem text-center">{item.cipher}</div>
                            <div className="bodyItem text-center">{item.disciplineNum}</div>
                            <div className="bodyDoubleItem">{item.subjectName}</div>
                            <div className="bodyItem text-center">{item.departmentAbr}</div>
                            <div className="bodyItem text-center">{item.reporting}</div>
                            <div className="bodyDoubleItem">
                                {
                                    item.auditoryHoursList &&
                                    item.auditoryHoursList.map(({ disciplineForm, hoursNum }, i) => (
                                        <div key={i}>{disciplineForm}: {hoursNum}</div>
                                    ))
                                }
                            </div>
                            <div className="bodyDoubleItem text-center">{item.independentHours !== null ? item.independentHours : 0}</div>
                            <div className="bodyDoubleItem">
                                {
                                    item.personalTaskList &&
                                    item.personalTaskList.map(({ personalTaskForm }, i) => (
                                        <div key={i}>{personalTaskForm}</div>
                                    ))
                                }
                            </div>
                            <div className="bodyItem text-center">
                                <button style={{ backgroundColor: "transparent", borderColor: "transparent", flex: 0.5 }}>
                                    <img src={require(`../../icon/editIcon.png`)} style={{ width: "35px", height: "35px" }} alt="edit" onClick={() => onUpdate(item.id)} />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PlanDisciplineList;