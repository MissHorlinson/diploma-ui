import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";

import { useFetching } from "../../hooks/useFetching";
import { getBase, getCipher, getQualification, getStep, getStudyingForm, getStudyingTerm, getStudyingType } from "../../API/UtilDataService";
import { getPlanList, savePlanInfo } from "../../API/PlanInfoService";

import PlanInfoForm from "../form/PlanInfoForm";
import MyModal from "../UI/MyModal";
import Loader from "../UI/Loader";
import MySearch from "../UI/MySearch";
import AllPlanList from "../list/AllPlanList";
import WeekForm from "../form/WeekForm";
import DisciplineForm from "../form/DisciplineForm";



const Plan = () => {


    const [planList, setPlanList] = useState([]);

    const [baseList, setBaseList] = useState([]);
    const [cipherList, setCipherList] = useState([]);
    const [qualificationList, setQualificationList] = useState([]);
    const [stepList, setStepList] = useState([]);
    const [studyingFormList, setStudyingFormList] = useState([]);
    const [studyingTermList, setStudyingTermList] = useState([]);

    const [studyingTypeList, setStudyingTypeList] = useState([]);

    const [modal, setModal] = useState(false);
    const [btnClass, setBtnClass] = useState('updateControlBtn');
    const [filter, setFilter] = useState({ query: '' });

    const [fetchUtilData, isListLoading, listError] = useFetching(async () => {

        getBase().then((base) => {
            setBaseList(base);
        });
        getCipher().then((cipher) => {
            setCipherList(cipher);
        });
        getQualification().then((qualification) => {
            setQualificationList(qualification);
        });
        getStep().then((step) => {
            setStepList(step);
        });
        getStudyingForm().then((studyingForm) => {
            setStudyingFormList(studyingForm);
        });
        getStudyingTerm().then((studyingTerm) => {
            setStudyingTermList(studyingTerm);
        });
        getStudyingType().then((studyingType) => {
            setStudyingTypeList(studyingType);
        });

        getPlanList().then((plan) => {
            setPlanList(plan)
        })
    });

    useEffect(() => {
        fetchUtilData();
    }, []);

    const savePlan = (planInfo) => {
        // savePlanInfo(planInfo)
        setModal(false)
    }

    return (
        <div>
            <Routes>
                <Route path='' element={
                    <>
                        <button style={{ margin: "10px" }} className="btn btn-warning" onClick={() => setModal(true)}>Create Plan</button>
                        <MyModal visible={modal} setVisible={setModal}>
                            <PlanInfoForm
                                qualificationList={qualificationList}
                                studyingTermList={studyingTermList}
                                baseList={baseList}
                                cipherList={cipherList}
                                studyingFormList={studyingFormList}
                                stepList={stepList}
                                btnClass={btnClass}
                                onCancel={() => setModal(false)}
                                onCreate={savePlan} />
                        </MyModal>



                        <hr />
                        {/* {
                isListLoading
                    ? <Loader />
                    : */}
                        <div>
                            <MySearch filter={filter} setFilter={setFilter} />
                            <AllPlanList planList={planList} />
                        </div>
                        {/*  } */}
                    </>
                }>
                </Route>
                <Route path=':planId/weeks' element={
                    <>
                        <Link to='..' className="btn btn-primary" style={{ margin: '10px' }}>{"\<- Plan"}</Link>
                        <WeekForm />
                    </>
                }>
                </Route>
                <Route path=':planId/disciplines' element={
                    <>
                        <Link to='..' className="btn btn-primary" style={{ margin: '10px' }}>{"\<- Plan"}</Link>
                        <DisciplineForm />
                    </>
                }>
                </Route>
            </Routes>




        </div>
    )
}

export default Plan;