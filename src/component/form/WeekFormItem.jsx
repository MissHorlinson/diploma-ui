import React, { useState, useEffect } from "react";

import MySelect from "../UI/MySelect";
import MyInputValidator from "../UI/MyInputValdator";

const WeekFormItem = ({ weeks, studuingTypeList, onAdd }) => {

    const [weekPlan, setWeekPlan] = useState([]);

    useEffect(() => {
        setWeekPlan(weeks.map((week, id) => ({ id, week })));
    }, [weeks])

    const studyingTypeSet = (plan, typeId, index) => {
        console.log(plan, typeId, index)
        const oldWeek = weekPlan[index].week
        const newWeek = { ...oldWeek, studyingType: { id: typeId } }
        setWeekPlan(_items => [..._items.filter((_value, _index) => _index !== index), { id: index, week: { ...newWeek } }].sort((a, b) => a.id - b.id))
    };

    const setValue = (key, val, index) => {
        const oldWeek = weekPlan[index].week
        let newWeek;
        if (key === 'startWeek') {
            newWeek = { ...oldWeek, startWeek: val }
        } else if (key === 'term') {
            newWeek = { ...oldWeek, term: val }
        }
        setWeekPlan(_items => [..._items.filter((_value, _index) => _index !== index), { id: index, week: { ...newWeek } }].sort((a, b) => a.id - b.id))
    }

    // console.log(weekPlan)
    return (
        <>
            {
                weekPlan &&
                weekPlan.map(({ week, id }) =>
                    <div style={{ display: "flex", flexDirection: "row", paddingInline: 2 }} key={week.semester + id}>
                        <div className="form-group" style={{ margin: 2, flex: 1.5 }}>
                            <MySelect
                                value={week.studyingType?.id}
                                onChange={(type) => studyingTypeSet(week, type, id)}
                                defaultValue="Форма навчання"
                                options={studuingTypeList} />
                        </div>

                        <div className="form-group" style={{ margin: 2, flex: 1 }}>
                            <MyInputValidator
                                value={week.startWeek}
                                onText={text => setValue('startWeek', text, id)}
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
                                onText={text => setValue('term', text, id)}
                                placeholder="Тривалiсть"
                                className="form-control"
                                check="^[0-9]+" />
                            <div className="invalid-feedback">
                                Can be only numbers
                            </div>
                        </div>

                        {
                            weekPlan.length - 1 === id ?
                                <button style={{ backgroundColor: "transparent", borderColor: "transparent", flex: 0.5 }}>
                                    <img src={require(`../../icon/plusIcon.png`)} alt="+" onClick={() => onAdd(weekPlan, week.semester)} />
                                </button>
                                :
                                <div style={{ flex: 0.56 }}></div>
                            // <button style={{ backgroundColor: "transparent", borderColor: "transparent", flex: 0.5 }}>
                            //     <img src={require(`../../icon/checkIcon.png`)} alt="!" />
                            // </button>
                        }
                    </div>
                )
            }
        </>
    )
}

export default WeekFormItem;