import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { useParams } from 'react-router-dom';
import { useFetching } from '../../hooks/useFetching';


import { getStudentInGroup, getStudentById, saveStudentData } from "../../API/GroupService";

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

    const [modal, setModal] = useState(false);

    const [fetchGroupData, isListLoading, listError] = useFetching(async () => {
        getStudentInGroup(id, token).then((resp_) => {
            setStudentInGroup(resp_.sort((a, b) => a.lastName - b.lastName))
        })
    });

    useEffect(() => {
        fetchGroupData();
    }, [])

    const saveStudent = (student) => {
        student = ({ ...student, groupInfo: { id: id } })
        console.log(JSON.stringify(student))
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

    return (
        <div className="container">
            {
                hasWriteAuthority &&
                <MyModal visible={modal} setVisible={setModal}>
                    <StudentForm
                        studentToUpdate={studentToUpdate}
                        onCancel={() => setModal(false)}
                        onSave={saveStudent} />
                </MyModal>
            }
            <button style={{ margin: "10px" }} className="btn btn-warning" onClick={() => setModal(true)}>Create Student</button>


            {studentInGroup.length === 0
                ? <h2 className="text-center">No student in group {groupName}</h2>
                :
                <div>
                    <h2 className="text-center">{groupName}</h2>
                    <StudentList
                        studentList={studentInGroup}
                        hasWriteAuthority={hasWriteAuthority}
                        onUpdate={getForUpdate}
                    />
                </div>
            }
        </div>
    );
});

export default StudentInGroup;