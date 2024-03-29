import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { getReportingForm, saveReportingForm } from "../../API/UtilDataService";

import MyInputValidator from "../UI/MyInputValdator";

const editImg = require(`../../icon/editIcon.png`);
const saveImg = require(`../../icon/checkIcon.png`);


const ReportingForm = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role === 3
}))(({ token }) => {
    const [reportingFormList, setReportingFormList] = useState([]);
    const [reportingFormToUpdate, setReportingFormToUpdate] = useState('');
    const [reportingFormToUpdateInx, setReportingFormToUpdateInx] = useState('');
    const [needUpd, setNeedUpd] = useState(false);

    useEffect(() => {
        getReportingForm(token).then((resp_) => setReportingFormList(resp_));
    }, []);

    const edit = (item) => {
        setNeedUpd(true);
        setReportingFormToUpdateInx(item.id);
        setReportingFormToUpdate(item.name)
    }

    const save = () => {
        const reportingForm_ = ({
            id: reportingFormToUpdateInx,
            name: reportingFormToUpdate
        })
        saveReportingForm(token, reportingForm_).then((resp_) => {
            let objIndex = reportingFormList.findIndex((obj) => obj.id === resp_.id);
            if (objIndex === -1) {
                setReportingFormList([...reportingFormList, resp_].sort((a, b) => a.id - b.id));
            } else {
                reportingFormList[objIndex] = resp_;
                setReportingFormList([...reportingFormList].sort((a, b) => a.id - b.id));
            }
        })
        setNeedUpd(false);
        setReportingFormToUpdateInx('');
        setReportingFormToUpdate('');
    }

    return (
        <div className="container">
            <h3 className="text-center py-2">Форма звітності</h3>
            <ul className="list-group list-group-flush">
                {
                    reportingFormList &&
                    reportingFormList.map((item) => (
                        <li className="list-group-item flexRow" key={item.id}>
                            {
                                needUpd && reportingFormToUpdateInx === item.id ?
                                    <>
                                        <MyInputValidator
                                            value={reportingFormToUpdate}
                                            onText={text => setReportingFormToUpdate(text)}
                                            className="form-control"
                                            check="[a-z]*$"
                                        />
                                        <button className="transparentBtn" onClick={() => save()} >
                                            <img src={saveImg} className="transparentEditBtn" alt="edit" />
                                        </button>
                                    </>
                                    :
                                    <>
                                        <div className="oneAndHalfFlex">{item.name}</div>
                                        <button className="transparentBtn" onClick={() => edit(item)}>
                                            <img src={editImg} className="transparentEditBtn" alt="edit" />
                                        </button>
                                    </>
                            }
                        </li>
                    ))
                }
            </ul>
        </div>
    )
})

export default ReportingForm;