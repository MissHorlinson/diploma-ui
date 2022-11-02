import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";

import { useFetching } from "../../hooks/useFetching";
import { getBase, getCipher, getQualification, getStep, getStudyingForm, getStudyingTerm } from "../../API/UtilDataService";
import { getPlanList, savePlanInfo, getPlanById } from "../../API/PlanInfoService";


import MyModal from "../UI/MyModal";
import Loader from "../UI/Loader";
import MySearch from "../UI/MySearch";

import AllPlanList from "../list/AllPlanList";
import PlanInfoForm from "../form/PlanInfoForm";

import WeekForm from "../form/WeekForm";
import Discipline from "./Discipline";


const httpStatusCodes = {
    200: "OK",
    400: "BAD_REQUEST",
    404: "NOT_FOUND",
    500: "INTERNAL_SERVER ERROR"
}

const Plan = () => {
    const [planList, setPlanList] = useState([]);
    const [planToUpdate, setPlanToUpdate] = useState();

    const [baseList, setBaseList] = useState([]);
    const [cipherList, setCipherList] = useState([]);
    const [qualificationList, setQualificationList] = useState([]);
    const [stepList, setStepList] = useState([]);
    const [studyingFormList, setStudyingFormList] = useState([]);
    const [studyingTermList, setStudyingTermList] = useState([]);

    const [modal, setModal] = useState(false);
    const [btnClass, setBtnClass] = useState('updateControlBtn');
    const [filter, setFilter] = useState({ query: '' });

    const [isError, setIsError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')


    const [fetchData, isListLoading, listError] = useFetching(() => {
        getPlanList().then((resp_) => {
            if (resp_.status !== 200) {
                setIsError(true);
                setErrorMsg(httpStatusCodes[resp_.status])
            } else {
                setPlanList(resp_.body);
                setIsError(false);
            }
        });
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
    })

    useEffect(() => {
        fetchData();
    }, []);

    const savePlan = (planInfo) => {
        savePlanInfo(planInfo).then((resp_) => {
            let objIndex = planList.findIndex((obj) => obj.planId === resp_.planId)
            if (objIndex === -1) {
                setPlanList([...planList, resp_].sort((a, b) => a.planId - b.planId));
            } else {
                planList[objIndex] = resp_;
                setPlanList([...planList].sort((a, b) => a.planId - b.planId));
            }
            setModal(false)
        })
    }

    const getForUpdate = (planId) => {
        getPlanById(planId).then((resp_) =>
            setPlanToUpdate(resp_),
            setModal(true)
        );
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
                                planToUpdate={planToUpdate}
                                onCancel={() => setModal(false)}
                                onCreate={savePlan} />
                        </MyModal>



                        <hr />
                        {
                            isListLoading
                                ? <Loader />
                                :
                                <div>
                                    <MySearch filter={filter} setFilter={setFilter} />
                                    {
                                        isError ?
                                            <div className="alert alert-primary text-center">{errorMsg}</div>
                                            :
                                            <>
                                                {
                                                    planList.length > 0 &&
                                                    <AllPlanList planList={planList} onUpdate={getForUpdate} />
                                                }
                                            </>

                                    }

                                </div>
                        }
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
                        <Discipline />
                    </>
                }>
                </Route>
            </Routes>
        </div>
    )
}

export default Plan;