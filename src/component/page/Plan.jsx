import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from '@mui/material';
import { connect } from "react-redux";

import { useFetching } from "../../hooks/useFetching";
import {
    getBase,
    getCipher,
    getQualification,
    getStep,
    getStudyingForm,
    getStudyingTerm
} from "../../API/UtilDataService";

import {
    getPlanList,
    savePlanInfo,
    getPlanById,
    saveFullPlanInFile,
    uploadFileToServer
} from "../../API/PlanInfoService";

import { logOut } from "../../API/AuthenticationService";

import MyModal from "../UI/MyModal";
import Loader from "../UI/Loader";

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



const Plan = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role < 3,
    hasReadAuthority: user.role > 3 && user.role < 6
}), (dispatch) => ({
    clearToken: () => dispatch({
        type: "saveData",
        data: { token: null }
    })
}))(({ token, hasWriteAuthority, hasReadAuthority, clearToken }) => {

    const [planList, setPlanList] = useState([]);
    const [planToUpdate, setPlanToUpdate] = useState();
    const [baseList, setBaseList] = useState([]);
    const [cipherList, setCipherList] = useState([]);
    const [qualificationList, setQualificationList] = useState([]);
    const [stepList, setStepList] = useState([]);
    const [studyingFormList, setStudyingFormList] = useState([]);
    const [studyingTermList, setStudyingTermList] = useState([]);
    const [modal, setModal] = useState(false);
    const [isError, setIsError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [alertType, setAlertType] = useState('info');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVisible, setAlertVisible] = useState('hidden');

    useEffect(() => {
        const interval = setInterval(() => {
            setAlertMessage('');
            setAlertType('info');
            setAlertVisible('hidden');
        }, 5000);
        return () => clearInterval(interval);
    }, [alertType, alertMessage])

    const navigate = useNavigate();
    const [fetchData, isListLoading, listError] = useFetching(() => {
        getPlanList(token).then((resp_) => {
            if (resp_.status === 401) {
                logOut().then(() => {
                    clearToken();
                    navigate("/login");
                })
            }
            else if (resp_.status !== 200) {
                setIsError(true);
                setErrorMsg(httpStatusCodes[resp_.status])
            } else {
                setPlanList(resp_.body);
                setIsError(false);
            }
        });
        if (hasWriteAuthority) {
            getBase(token).then((base) => {
                setBaseList(base);
            });
            getCipher(token).then((cipher) => {
                setCipherList(cipher);
            });
            getQualification(token).then((qualification) => {
                setQualificationList(qualification);
            });
            getStep(token).then((step) => {
                setStepList(step);
            });
            getStudyingForm(token).then((studyingForm) => {
                setStudyingFormList(studyingForm);
            });
            getStudyingTerm(token).then((studyingTerm) => {
                setStudyingTermList(studyingTerm);
            });
        }
    })

    useEffect(() => {
        fetchData();
    }, []);

    const savePlan = (planInfo) => {
        savePlanInfo(planInfo, token).then((resp_) => unpdateViewPlanList(resp_))
    }

    const uploadFromFile = (file) => {
        uploadFileToServer(file, token).then(resp_ => unpdateViewPlanList(resp_));
    }

    const unpdateViewPlanList = (resp_) => {
        let objIndex = planList.findIndex((obj) => obj.planId === resp_.planId)
        if (objIndex === -1) {
            setPlanList([...planList, resp_].sort((a, b) => a.planId - b.planId));
        } else {
            planList[objIndex] = resp_;
            setPlanList([...planList].sort((a, b) => a.planId - b.planId));
        }
        setPlanToUpdate('')
        setModal(false)
    }

    const getForUpdate = (planId) => {
        getPlanById(planId, token).then((resp_) =>
            setPlanToUpdate(resp_),
            setModal(true)
        );
    }

    const loadFile = (planId) => {
        saveFullPlanInFile(planId, token).then((resp_) => {
            setAlertType(resp_.type);
            setAlertMessage(resp_.msg);
            setAlertVisible("visible");
        })
    }


    return (
        <div>
            <Routes>
                <Route path='' element={
                    <>
                        <div style={{ visibility: alertVisible }}>
                            <Alert severity={alertType}>{alertMessage}</Alert>
                        </div>
                        {
                            hasWriteAuthority &&
                            <>
                                <button className="btn btn-warning m-1" onClick={() => setModal(true)}>Створити план</button>
                                <MyModal visible={modal} setVisible={setModal}>
                                    <PlanInfoForm
                                        qualificationList={qualificationList}
                                        studyingTermList={studyingTermList}
                                        baseList={baseList}
                                        cipherList={cipherList}
                                        studyingFormList={studyingFormList}
                                        stepList={stepList}
                                        planToUpdate={planToUpdate}
                                        onCancel={() => { setModal(false) }}
                                        onCreate={savePlan}
                                        onCreateFromFile={uploadFromFile} />
                                </MyModal>
                            </>
                        }
                        <hr />
                        {
                            isListLoading
                                ? <Loader />
                                :
                                <div>
                                    {
                                        isError ?
                                            <div className="alert alert-primary text-center">{errorMsg}</div>
                                            :
                                            <>
                                                {
                                                    planList.length > 0 &&
                                                    <AllPlanList
                                                        planList={planList}
                                                        onUpdate={getForUpdate}
                                                        onLoad={loadFile}
                                                        hasWriteAuthority={hasWriteAuthority}
                                                        hasReadAuthority={hasReadAuthority}
                                                    />
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
                        <Link to='..' className="btn btn-primary m-2">{"\<- Список планів"}</Link>
                        <WeekForm />
                    </>
                }>
                </Route>
                <Route path=':planId/disciplines' element={
                    <>
                        <Link to='..' className="btn btn-primary m-2">{"\<- Список планів"}</Link>
                        <Discipline />
                    </>
                }>
                </Route>
            </Routes>
        </div>
    )
});

export default Plan;