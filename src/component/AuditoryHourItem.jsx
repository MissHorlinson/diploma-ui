import React, { useState, useEffect } from "react";

import MySelect from "./UI/MySelect";
import MyInputValidator from "./UI/MyInputValdator";

const AuditoryHourItem = ({ item, index, setAuditory, disciplineFormList, addAuditoryHours, isLast, removeAuditoryHours }) => {

    const [id, setId] = useState('');
    const [form, setForm] = useState('');
    const [hours, setHours] = useState('');

    useEffect(() => {
        if (item) {
            setId(item?.id);
            setForm(item.disciplineFormId);
            setHours(item.hoursNum);
        }
    }, [item])

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="form-group" style={{ margin: 2, flex: 1.5 }}>
                <MySelect
                    value={form}
                    onChange={(type) => {
                        setForm(type);
                        setAuditory(index, type, "disciplineForm", id)
                    }}
                    defaultValue="Аудиторные часы"
                    options={disciplineFormList} />
            </div>

            <div className="form-group" style={{ margin: 2, flex: 1.25 }}>
                <MyInputValidator
                    value={hours}
                    onText={(text) => {
                        setHours(text)
                        setAuditory(index, text, "hoursNum", id)
                    }}
                    placeholder="Кол-во"
                    className="form-control"
                    check="^[0-9]+" />
                <div className="invalid-feedback">
                    Can be only numbers
                </div>
            </div>
            {
                isLast ?
                    <>
                        <button style={{ backgroundColor: "transparent", borderColor: "transparent", flex: 0.1 }}>
                            <img src={require(`../icon/plusIcon.png`)} alt="+" onClick={addAuditoryHours} />
                        </button>
                        <button style={{ backgroundColor: "transparent", borderColor: "transparent", flex: 0.1 }}>
                            <img src={require(`../icon/deleteIcon.png`)} alt="x" onClick={() => removeAuditoryHours(index)} />
                        </button>
                    </>
                    :
                    <div style={{ flex: 0.29 }}></div>
            }
        </div>
    )

}

export default AuditoryHourItem;