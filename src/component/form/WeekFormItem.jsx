import React from "react";

import MySelect from "../UI/MySelect";
import MyInputValidator from "../UI/MyInputValdator";

const WeekFormItem = ({ week, weekIndex, studuingTypeList, semesterList, setWeekData, onAdd, isLast }) => {

    return (
        <div style={{ display: "flex", flexDirection: "row", paddingInline: 2 }} key={week.id}>
            <div className="form-group" style={{ margin: 2, flex: 0.25 }}>
                <MySelect
                    value={week.semester}
                    onChange={(type) => setWeekData('semester', type, weekIndex)}
                    defaultValue="Семестр"
                    options={semesterList} />
            </div>


            <div className="form-group oneAndHalfFlex m-1">
                <MySelect
                    value={week.studyingTypeId}
                    onChange={(type) => setWeekData('type', type, weekIndex)}
                    defaultValue="Форма навчання"
                    options={studuingTypeList} />
            </div>

            <div className="form-group oneFlex m-1">
                <MyInputValidator
                    value={week.startWeek}
                    onText={text => setWeekData('startWeek', text, weekIndex)}
                    placeholder="Перший тиждень"
                    className="form-control"
                    check="^[0-9]+" />
                <div className="invalid-feedback">
                    Може складатися лише з цифр
                </div>
            </div>

            <div className="form-group oneFlex m-1">
                <MyInputValidator
                    value={week.term}
                    onText={text => setWeekData('term', text, weekIndex)}
                    placeholder="Тривалiсть"
                    className="form-control"
                    check="^[0-9]+" />
                <div className="invalid-feedback">
                    Може складатися лише з цифр
                </div>
            </div>

            {
                isLast ?
                    <button className="transparentBtn">
                        <img src={require(`../../icon/plusIcon.png`)} alt="edit" onClick={() => onAdd(week.semester)} />
                    </button>
                    :
                    <div style={{ flex: 0.55 }}></div>

            }
        </div>
    )
}

export default WeekFormItem;