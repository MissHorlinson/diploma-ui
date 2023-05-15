import React, { useState, useEffect } from "react";

import MySelect from "./UI/MySelect";

const PersonalTaskItem = ({ item, index, personalTaskFormList, setPersonalTask, addPersonalTask, isLast }) => {

    const [form, setForm] = useState(0);
    const [id, setId] = useState('');

    useEffect(() => {
        setForm(0);
    }, [])

    useEffect(() => {
        if (item) {
            setForm(item.personalTaskFormId);
            setId(item?.id);
        }
    }, [item])

    const formSet = (type, index) => {
        setForm(type);
        setPersonalTask(type, index, id);
    }

    return (
        <div className="flexRow">
            <div className="form-group flex2-75 ">
                <MySelect
                    value={form}
                    onChange={(type) => { formSet(type, index) }}
                    defaultValue="Індивідуальні завдання"
                    options={personalTaskFormList} />
            </div>
            {
                isLast ?
                    <>
                        <button className="auditoryHoursBtn">
                            <img src={require(`../icon/deleteIcon.png`)} alt="x" onClick={() => console.log("remove")} />
                        </button>
                        <button className="personalTaskBtn">
                            <img src={require(`../icon/plusIcon.png`)} alt="+" onClick={addPersonalTask} />
                        </button>
                    </>
                    :
                    <>
                        <button className="auditoryHoursBtn">
                            <img src={require(`../icon/deleteIcon.png`)} alt="x" onClick={() => console.log("remove")} />
                        </button>
                        <div className="empty-0-15-space"></div>
                    </>
            }
        </div>
    )
}

export default PersonalTaskItem;