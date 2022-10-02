import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../../hooks/useFetching";

import { getSemesterNum, saveWeekPlanData } from "../../API/PlanInfoService";
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
    const [studyingType, setStudyingType] = useState([]);
    const [fullWeeksPlanList, setFullWeeksPlanList] = useState([]);
    const [semesterWeekPlanList, setSemesterWeekPlanList] = useState([]);

    const [fetchUtilData, isListLoading, listError] = useFetching(async () => {
        getStudyingType().then((types) => setStuduingTypeList(types));

        getSemesterNum(planId).then((num) => {
            setFullWeeksPlanList([...Array(num).keys()].map((item) => (
                {
                    semester: item + 1,
                    weeks: [
                        {
                            ...initVal, weekPlanInfo: { id: planId }, semester: item + 1
                        }
                    ]
                }
            )))
        });
    })

    useEffect(() => {
        fetchUtilData();
    }, []);


    const addWeek = (plan, sem) => {

        const existngPlan = plan.map((item) => ({ ...item.week }))



        // console.log(sem, plan, p)
        // console.log(fullWeeksPlanList);

        setFullWeeksPlanList(_plans => [..._plans.filter(({ semester }) => semester !== sem), { semester: sem, weeks: [...existngPlan, { ...initVal, weekPlanInfo: { id: planId }, semester: sem }] }].sort((a, b) => a.semester - b.semester))


        // console.log(fullWeeksPlanList.filter(({ semester }) => semester !== sem))

        // const oldSemesterPlans = fullWeeksPlanList.find(({ semester }) => semester === sem).weeks;
        // const newSemesterPlans = [...oldSemesterPlans, { ...initVal, weekPlanInfo: { id: planId }, semester: sem }]


        // console.log(oldSemesterPlans)
        // console.log(newSemesterPlans)

        // console.log(fullWeeksPlanList.filter(({ semester }) => semester !== sem), newSemesterPlans)
        // setFullWeeksPlanList(_plans => [..._plans.filter(({ semester }) => semester !== sem), { semester: sem, weeks: [...newSemesterPlans] }].sort((a, b) => a.semester - b.semester))
        // fullWeeksPlanList.find(({ semester }) => semester === sem).weeks.push({ ...initVal, weekPlanInfo: { id: planId }, semester: sem });
    }


    // const studyingTypeSet = (typeId, sem) => {
    //     console.log(typeId, sem)
    //     const oldWweek = weeksPlanList.find(({ semester }) => semester === sem).week
    //     const newWeek = { ...oldWweek, studyingType: { id: typeId } }
    //     setWeeksPlanList(_items => [..._items.filter(({ semester }) => semester !== sem), { semester: sem, week: { ...newWeek } }].sort((a, b) => a.semester - b.semester))

    //     studyingType.find(({ semester }) => semester === sem).typeName = typeId
    // };


    // const setValue = (key, val, sem) => {
    //     const oldWweek = weeksPlanList.find(({ semester }) => semester === sem).week

    //     let newWeek;
    //     if (key === 'startWeek') {
    //         newWeek = { ...oldWweek, startWeek: val }
    //     } else if (key === 'term') {
    //         newWeek = { ...oldWweek, term: val }
    //     }
    //     setWeeksPlanList(_items => [..._items.filter(({ semester }) => semester !== sem), { semester: sem, week: { ...newWeek } }].sort((a, b) => a.semester - b.semester))
    // }


    // console.log(fullWeeksPlanList);

    return (
        <div className="container">
            {
                fullWeeksPlanList &&
                fullWeeksPlanList.map(({ semester, weeks }, i) => (
                    <>
                        <div style={{ textAlign: "center", }}>
                            <label>Sem {semester}</label>
                        </div>
                        <WeekFormItem weeks={weeks} studuingTypeList={studuingTypeList} onAdd={addWeek} />
                        <hr />
                    </>
                ))
            }
            <hr />
            <div className="text-center">
                <button
                    className="btn btn-info"
                    onClick={() => {
                        const weekList = fullWeeksPlanList.map(({ weeks }) => weeks)
                        const allWeekList = [].concat.apply([], weekList)
                        // const clearAllWeekList = allWeekList.filter(({ startWek, term }) => startWek !== null || term !== null)
                        console.log(JSON.stringify(allWeekList))
                        saveWeekPlanData(allWeekList)
                    }}>
                    Save
                </button>
            </div>

        </div>
    )
}

export default WeekForm;