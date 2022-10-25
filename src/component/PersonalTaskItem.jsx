import React, { useState, useEffect } from "react";

import MySelect from "./UI/MySelect";

const PersonalTaskItem = ({ item, index, personalTaskFormList, setPersonalTask, addPersonalTask, isLast }) => {

    const [form, setForm] = useState(0);

    useEffect(() => {
        setForm(0);
    }, [])

    useEffect(() => {
        if (item) {
            setForm(item)
        }
    }, [item])

    const formSet = (type, index) => {
        setForm(type);
        setPersonalTask(type, index);
    }

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="form-group" style={{ flex: 2.75 }}>
                <MySelect
                    value={form}
                    onChange={(type) => { formSet(type, index) }}
                    defaultValue="Индивидуальное задание"
                    options={personalTaskFormList} />
            </div>
            {
                isLast ?
                    <button style={{ backgroundColor: "transparent", borderColor: "transparent", flex: 0.25 }}>
                        <img src={require(`../icon/plusIcon.png`)} alt="+" onClick={addPersonalTask} />
                    </button>
                    :
                    <div style={{ flex: 0.29 }}> </div>

            }
        </div>
    )
}

export default PersonalTaskItem;