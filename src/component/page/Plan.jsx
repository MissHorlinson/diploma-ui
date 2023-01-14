import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
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
    getPlanById
} from "../../API/PlanInfoService";

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

const { ip, port } = require('../../urlConfig.json');


const Plan = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role < 3,
    hasReadAuthority: user.role > 3 && user.role < 6
}))(({ token, hasWriteAuthority, hasReadAuthority }) => {

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

    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const [os, setOS] = useState('');



    const getOs = () => {
        const os_ = ['Windows', 'Linux', 'Mac']; // add your OS values
        setOS(os_.find(v => navigator.userAgent.indexOf(v) >= 0));
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setAlertMessage('');
            setAlertType('');
        }, 5000);
        return () => clearInterval(interval);
    }, [alertType, alertMessage])

    const [fetchData, isListLoading, listError] = useFetching(() => {
        getPlanList(token).then((resp_) => {
            if (resp_.status !== 200) {
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
        getOs();
    }, []);

    const savePlan = (planInfo) => {
        savePlanInfo(planInfo, token).then((resp_) => {
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
        getPlanById(planId, token).then((resp_) =>
            setPlanToUpdate(resp_),
            setModal(true)
        );
    }

    const loadFile = (planId) => {
        // console.log(`http://${ip}:${port}/xlsFiles/getFullPlanXlsFile/${planId}`)
        fetch(`/xlsFiles/getFullPlanXlsFile/${planId}`, {
            method: "get",
            headers: {
                "Authorization": token,
                "Content-Type": 'application/json'
            }
        }).then(res => {
            if (res.ok) {
                const head = res.headers.get("content-disposition");
                const file_ = head.split("=")[1];
                return res.blob();
            } else {
                setAlertType("error");
                setAlertMessage("ops have some problem");
            }
        }).then((blob) => {
            console.log(blob)
            const href = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', "plan.xlsx");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setAlertType("success");
            setAlertMessage("plan downloaded");
        }).catch((err) => {
            return Promise.reject({ Error: 'Something Went Wrong', err });
        });
    }


    return (
        <div>
            <Routes>
                <Route path='' element={
                    <>
                        <div>
                            <Alert severity={alertType}>{alertMessage}</Alert>
                        </div>
                        {
                            hasWriteAuthority &&
                            <>
                                <button style={{ margin: "10px" }} className="btn btn-warning" onClick={() => setModal(true)}>Створити план</button>
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
                            </>
                        }
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
                        <Link to='..' className="btn btn-primary" style={{ margin: '10px' }}>{"\<- Список планів"}</Link>
                        <WeekForm />
                    </>
                }>
                </Route>
                <Route path=':planId/disciplines' element={
                    <>
                        <Link to='..' className="btn btn-primary" style={{ margin: '10px' }}>{"\<- Список планів"}</Link>
                        <Discipline />
                    </>
                }>
                </Route>
            </Routes>
        </div>
    )
});

export default Plan;