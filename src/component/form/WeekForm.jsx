import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

const WeekForm = () => {

    const { planId } = useParams();

    const [studuingTypeList, setStuduingTypeList] = useState([]);
    const [semesterNum, setSemesterNum] = useState([]);


    const [fullWeeksPlanList, setFullWeeksPlanList] = useState([]);


    const [fetchUtilData, isListLoading, listError] = useFetching(() => {
        getStudyingType().then((types) => setStuduingTypeList(types));

        let weekPlanList = [];
        let fullPlan = []

        getWeekByPlanId(planId).then((week) => {
            // setFullWeeksPlanList(week)
            // console.log(week.length);
            weekPlanList = week;

            console.log(weekPlanList)
        })
            // getSemesterNum(planId).then((num) => setSemesterNum([...Array(num).keys()]))
            .then(() =>
                getSemesterNum(planId).then((num) => {
                    // if (weekPlanList.length === 0) {
                    //     for (let i = 1; i <= num; i++) {
                    //         fullPlan = [{ ...initVal, weekPlanInfo: { id: planId }, }]
                    //         // fullPlan.push({ semester: i, weeks: [{ ...initVal, weekPlanInfo: { id: planId }, needSave: false }] })
                    //         // fullPlan.push({ semester: i, weeks: [{}] });
                    //     }
                    // } else {
                    for (let i = 1; i <= num; i++) {

                        const weeks_ = weekPlanList.filter(({ semester }) => semester === i);
                        weeks_.length > 0 ? fullPlan.push({ semester: i, weeks: weeks_ }) : fullPlan.push({ semester: i, weeks: [{}] });
                        // weeks_.length > 0 ? fullPlan.push({ semester: i, weeks: weeks_ }) : fullPlan.push({ semester: i, weeks: [{ ...initVal, weekPlanInfo: { id: planId }, needSave: false }] });
                    }

                    console.log(fullPlan)
                    // }
                    setFullWeeksPlanList(fullPlan)
                })
            )
    })

    useEffect(() => {
        fetchUtilData();
    }, []);

    // console.log(fullWeeksPlanList, semesterNum);

    const addWeek = (plan, sem) => {

        // console.log(plan)

        const existngPlan = plan.map((item) => ({ ...item.week }))

        console.log(sem, plan)
        console.log(fullWeeksPlanList);


        setFullWeeksPlanList(_plans => [..._plans.filter(({ semester }) => semester !== sem), { semester: sem, weeks: [...existngPlan, { ...initVal, weekPlanInfo: { id: planId }, semester: sem }] }].sort((a, b) => a.semester - b.semester))

    }

    const saveWeekData = () => {
        const weekList = fullWeeksPlanList.map(({ weeks }) => weeks)
        const allWeekList = [].concat.apply([], weekList)
        console.log(JSON.stringify(allWeekList))
        // saveWeekPlanData(allWeekList)
    }

    // console.log(fullWeeksPlanList)
    return (
        <div className="container">
            {
                fullWeeksPlanList &&
                fullWeeksPlanList.map((item, i) => (
                    <>
                        {/* <WeekFormItem weeks={fullWeeksPlanList.filter(({ semester }) => semester === i + 1)} studuingTypeList={studuingTypeList} onAdd={addWeek} /> */}
                        <div style={{ textAlign: "center" }}>
                            <label>Sem {item.semester}</label>
                        </div>
                        <WeekFormItem weeks={item.weeks} studuingTypeList={studuingTypeList} onAdd={addWeek} />
                        <hr />
                    </>
                ))
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
}

export default WeekForm;