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
        <div className="flexRow">
            <div className="form-group oneAndHalfFlex me-1">
                <MySelect
                    value={form}
                    onChange={(type) => {
                        setForm(type);
                        setAuditory(index, type, "disciplineForm", id)
                    }}
                    defaultValue="Аудиторні години"
                    options={disciplineFormList} />
            </div>

            <div className="form-group oneAndHalfFlex">
                <MyInputValidator
                    value={hours}
                    onText={(text) => {
                        let replacedText = text;
                        if (text.includes(",")) {
                            replacedText = text.replace(",", ".")
                        }
                        setHours(replacedText)
                        setAuditory(index, replacedText, "hoursNum", id)
                    }}
                    placeholder="Кол-во"
                    className="form-control"
                    check="^[0-9]+" />
                <div className="invalid-feedback">
                    Може складатися лише з цифр
                </div>
            </div>
            {
                isLast ?
                    <>
                        <button className="auditoryHoursBtn">
                            <img src={require(`../icon/plusIcon.png`)} alt="+" onClick={addAuditoryHours} />
                        </button>
                    </>
                    :
                    <>
                        <button className="auditoryHoursBtn">
                            <img src={require(`../icon/deleteIcon.png`)} alt="x" onClick={() => removeAuditoryHours(index)} />
                        </button>
                    </>
            }
        </div>
    )

}

export default AuditoryHourItem;