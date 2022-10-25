import React, { useState, useEffect } from "react";

import MySelect from "./UI/MySelect";
import MyInputValidator from "./UI/MyInputValdator";

const AuditoryHourItem = ({ item, index, setAuditory, disciplineFormList, addAuditoryHours, isLast }) => {
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="form-group" style={{ margin: 2, flex: 1.5 }}>
                <MySelect
                    value={item.disciplineFormId}
                    onChange={(type) => setAuditory(index, type, "disciplineForm")}
                    defaultValue="Аудиторные часы"
                    options={disciplineFormList} />
            </div>

            <div className="form-group" style={{ margin: 2, flex: 1.25 }}>
                <MyInputValidator
                    value={item.hoursNum}
                    onText={(text) => setAuditory(index, text, "hoursNum")}
                    placeholder="Кол-во"
                    className="form-control"
                    check="^[0-9]+" />
                <div className="invalid-feedback">
                    Can be only numbers
                </div>
            </div>
            {
                isLast ?
                    <button style={{ backgroundColor: "transparent", borderColor: "transparent", flex: 0.25 }}>
                        <img src={require(`../icon/plusIcon.png`)} alt="+" onClick={addAuditoryHours} />
                    </button>
                    :
                    <div style={{ flex: 0.29 }}></div>
            }
        </div>
    )

}

export default AuditoryHourItem;