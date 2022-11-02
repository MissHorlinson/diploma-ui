import React, { useState, useEffect } from "react";

import MySelect from "../UI/MySelect";
import MyInputValidator from "../UI/MyInputValdator";

const WeekFormItem = ({ week, studuingTypeList, semesterList, setWeekData, onAdd, isLast }) => {

    const [weekPlan, setWeekPlan] = useState([]);

    // useEffect(() => {
    //     setWeekPlan(week.map((week, id) => ({ id, week })));
    // }, [week])

    // const studyingTypeSet = (plan, typeId, index) => {
    //     console.log(plan, typeId, index)
    //     const oldWeek = weekPlan[index].week
    //     const newWeek = { ...oldWeek, studyingType: { id: typeId } }
    //     setWeekPlan(_items => [..._items.filter((_value, _index) => _index !== index), { id: index, week: { ...newWeek } }].sort((a, b) => a.id - b.id))
    // };

    // const setValue = (key, val, index) => {
    //     const oldWeek = weekPlan[index].week
    //     let newWeek;
    //     if (key === 'startWeek') {
    //         newWeek = { ...oldWeek, startWeek: val }
    //     } else if (key === 'term') {
    //         newWeek = { ...oldWeek, term: val }
    //     }
    //     setWeekPlan(_items => [..._items.filter((_value, _index) => _index !== index), { id: index, week: { ...newWeek } }].sort((a, b) => a.id - b.id))
    // }

    // console.log(weekPlan)
    return (
        <div style={{ display: "flex", flexDirection: "row", paddingInline: 2 }} key={week.id}>
            <div className="form-group" style={{ margin: 2, flex: 0.25 }}>
                <MySelect
                    value={week.semester}
                    onChange={(type) => setWeekData('semester', type, week.id)}
                    defaultValue="Семестр"
                    options={semesterList} />
            </div>


            <div className="form-group" style={{ margin: 2, flex: 1.5 }}>
                <MySelect
                    value={week.studyingType?.id}
                    onChange={(type) => setWeekData('type', type, week.id)}
                    defaultValue="Форма навчання"
                    options={studuingTypeList} />
            </div>

            <div className="form-group" style={{ margin: 2, flex: 1 }}>
                <MyInputValidator
                    value={week.startWeek}
                    onText={text => setWeekData('startWeek', text, week.id)}
                    placeholder="Перший тиждень"
                    className="form-control"
                    check="^[0-9]+" />
                <div className="invalid-feedback">
                    Can be only numbers
                </div>
            </div>

            <div className="form-group" style={{ margin: 2, flex: 1 }}>
                <MyInputValidator
                    value={week.term}
                    onText={text => setWeekData('term', text, week.id)}
                    placeholder="Тривалiсть"
                    className="form-control"
                    check="^[0-9]+" />
                <div className="invalid-feedback">
                    Can be only numbers
                </div>
            </div>

            {
                isLast ?
                    <button style={{ backgroundColor: "transparent", borderColor: "transparent", flex: 0.5 }}>
                        <img src={require(`../../icon/plusIcon.png`)} alt="edit" onClick={() => onAdd(weekPlan, week.semester)} />
                    </button>
                    :
                    <div style={{ flex: 0.6 }}></div>

            }
        </div>
    )
}

export default WeekFormItem;