import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { useParams } from 'react-router-dom';
import { useFetching } from '../../hooks/useFetching';

import { Alert } from '@mui/material';


import { getStudentInGroup, getStudentById, saveStudentData, getGroupById } from "../../API/GroupService";
import { savePersonalPlanInFile, getPlanByGroup } from "../../API/PlanInfoService";

import StudentForm from "../form/StudentForm";
import StudentList from '../list/StudentList';

import MyModal from '../UI/MyModal';


const StudentInGroup = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role < 3
}))(({ token, hasWriteAuthority }) => {

    const { id } = useParams();

    const [studentInGroup, setStudentInGroup] = useState([]);
    const [studentToUpdate, setStudentToUpdate] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [planId, setPlanId] = useState('');
    const [alertType, setAlertType] = useState('info');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVisible, setAlertVisible] = useState('hidden');
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setAlertMessage('');
            setAlertType('');
            setAlertVisible('hidden');
        }, 5000);
        return () => clearInterval(interval);
    }, [alertType, alertMessage])

    const [fetchGroupData, isListLoading, listError] = useFetching(async () => {
        getStudentInGroup(id, token).then((resp_) => {
            setStudentInGroup([...resp_.sort((a, b) => b.lastName - a.lastName)])
        });

        getGroupById(id, token).then((resp_) => {
            setGroupName(resp_.groupFullName);
            getPlanByGroup(resp_.streamId, token).then((resp_) => setPlanId(resp_))
        })
    });

    useEffect(() => {
        fetchGroupData();
    }, [])

    const saveStudent = (student) => {
        student = ({ ...student, groupId: id })
        saveStudentData(student, token).then((resp_) => {
            let objIndex = studentInGroup.findIndex((obj) => obj.id === resp_.id);
            if (objIndex === -1) {
                setStudentInGroup([...studentInGroup, resp_].sort((a, b) => a.id - b.id));
            } else {
                studentInGroup[objIndex] = resp_;
                setStudentInGroup([...studentInGroup].sort((a, b) => a.id - b.id));
            }
            setModal(false);
        });
    }

    const getForUpdate = (id) => {
        getStudentById(id, token).then((resp_) => {
            setStudentToUpdate(resp_);
            setModal(true);
        });
    }

    const downloadPlan = (studentId, course) => {
        savePersonalPlanInFile(planId, studentId, course, token).then((resp_) => {
            setAlertType(resp_.type);
            setAlertMessage(resp_.msg);
            setAlertVisible("visible");
        })
    }

    return (
        <div className="container">
            <div style={{ visibility: alertVisible }}>
                <Alert severity={alertType}>{alertMessage}</Alert>
            </div>
            {
                hasWriteAuthority &&
                <>
                    <button className="btn btn-warning m-1" onClick={() => setModal(true)}>Додати студента</button>
                    <MyModal visible={modal} setVisible={setModal}>
                        <StudentForm
                            studentToUpdate={studentToUpdate}
                            onCancel={() => setModal(false)}
                            onSave={saveStudent} />
                    </MyModal>
                </>
            }

            {studentInGroup.length === 0
                ? <h2 className="text-center">No student in group {groupName}</h2>
                :
                <div>
                    <h2 className="text-center">{groupName}</h2>
                    <StudentList
                        studentList={studentInGroup}
                        hasWriteAuthority={hasWriteAuthority}
                        onLoad={downloadPlan}
                        onUpdate={getForUpdate}
                    />
                </div>
            }
        </div>
    );
});

export default StudentInGroup;