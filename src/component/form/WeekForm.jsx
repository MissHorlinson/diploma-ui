import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { useFetching } from "../../hooks/useFetching";

import { getSemesterNum, saveWeekPlanData, getWeekByPlanId } from "../../API/PlanInfoService";
import { getStudyingType } from "../../API/UtilDataService";

import MySelect from "../UI/MySelect";
import MyInputValidator from "../UI/MyInputValdator";
import WeekFormItem from "./WeekFormItem";

const initVal = {
    weekPlanInfo: { id: '' },
    semester: '',
    startWeek: '',
    term: '',
    studyingType: { id: '' }
}

const WeekForm = connect((user) => ({
    token: user.token
}))(({ token }) => {

    const { planId } = useParams();

    const [studuingTypeList, setStuduingTypeList] = useState([]);
    const [semesterNum, setSemesterNum] = useState(0);

    const [fullWeeksPlanList, setFullWeeksPlanList] = useState([]);


    const [fetchUtilData, isListLoading, listError] = useFetching(() => {
        getStudyingType(token).then((types) => setStuduingTypeList(types));
        getWeekByPlanId(planId, token).then((week) => {
            if (week.length > 0) {
                setFullWeeksPlanList(week)
            } else {
                setFullWeeksPlanList([{}])
            }
        });
        getSemesterNum(planId, token).then((num) => setSemesterNum(num));
    })

    const semesterList = [...Array(semesterNum).keys()].map((item) => (
        {
            id: item + 1,
            name: item + 1
        }
    ))

    useEffect(() => {
        fetchUtilData();
    }, []);

    const addWeek = () => {
        setFullWeeksPlanList((weeks_) => [...weeks_, {}])
    }

    const saveWeekData = () => {
        const forSave = fullWeeksPlanList.filter((item) => item.needSave === true);
        const result = forSave.map((item) => delete item.needSave && ({ ...item, weekPlanInfo: { id: planId } }));
        saveWeekPlanData(result, token)
    }

    const setWeekData = (key, val, index) => {
        let oldWeekIndex = 0;
        let newWeek;
        let oldWeek;

        if (fullWeeksPlanList.length > 0) {
            oldWeekIndex = fullWeeksPlanList.findIndex((obj, index_) => index_ === index);
        } else {
            fullWeeksPlanList[0] = {}
        }



        if (oldWeekIndex >= 0) {
            oldWeek = fullWeeksPlanList[oldWeekIndex];
        }


        if (key === 'startWeek') {
            newWeek = { ...oldWeek, startWeek: val, needSave: true }
        } else if (key === 'term') {
            newWeek = { ...oldWeek, term: val, needSave: true }
        } else if (key === 'type') {
            newWeek = { ...oldWeek, studyingType: { id: val }, needSave: true }
        } else if (key === 'semester') {
            newWeek = { ...oldWeek, semester: val, needSave: true }
        }


        fullWeeksPlanList[oldWeekIndex] = newWeek;

        setFullWeeksPlanList([...fullWeeksPlanList]);
    }

    return (
        <div className="container">
            <div style={{ display: "flex", flexDirection: "row" }}>
                <label style={{ flex: 0.3, textAlign: "center" }}>Sem</label>
                <label style={{ flex: 1.5, textAlign: "center" }}>Type</label>
                <label style={{ flex: 1, textAlign: "center" }}>Start</label>
                <label style={{ flex: 1, textAlign: "center" }}>Term</label>
                <label style={{ flex: 0.6 }}></label>
            </div>
            {
                fullWeeksPlanList.length > 0 ? fullWeeksPlanList.map((item, i) => (
                    <div key={i}>
                        <WeekFormItem
                            week={item}
                            weekIndex={i}
                            studuingTypeList={studuingTypeList}
                            semesterList={semesterList}
                            setWeekData={setWeekData}
                            onAdd={addWeek}
                            isLast={fullWeeksPlanList.length - 1 === i}
                        />
                    </div>
                ))
                    :
                    <div>
                        <WeekFormItem
                            week={initVal}
                            weekIndex={0}
                            studuingTypeList={studuingTypeList}
                            semesterList={semesterList}
                            setWeekData={setWeekData}
                            onAdd={addWeek}
                            isLast={true} />
                    </div>
            }
            <hr />
            <div className="text-center">
                <button
                    className="btn btn-info"
                    onClick={() => saveWeekData()}>
                    Save
                </button>
            </div>
        </div>
    )
});

export default WeekForm;