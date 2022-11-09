import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { useParams } from 'react-router-dom';
import { useFetching } from '../../hooks/useFetching';


import { getStudentInGroup } from "../../API/GroupService";

import StudentForm from "../form/StudentForm";

import MyModal from '../UI/MyModal';


const StudentInGroup = connect((user) => ({
    token: user.token
}))(({ token }) => {
    const [studentInGroup, setStudentInGroup] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [modal, setModal] = useState(false);
    const [report, setReport] = useState();


    const { id } = useParams();

    const [fetchGroupData, isListLoading, listError] = useFetching(async () => {
        getStudentInGroup(id, token).then((resp_) => {
            setStudentInGroup(resp_.sort((a, b) => a.lastName - b.lastName))
        })
    });

    useEffect(() => {
        fetchGroupData();
    }, [])

    const saveStudent = (student) => {
        console.log(student)
    }

    return (
        <div className="container">
            <button style={{ margin: "10px" }} className="btn btn-warning" onClick={() => setModal(true)}>Create Student</button>
            <MyModal visible={modal} setVisible={setModal}>
                <StudentForm
                    onCancel={() => setModal(false)}
                    onCreate={saveStudent} />
            </MyModal>

            {studentInGroup.length === 0
                ? <h2 className="text-center">No student in group {groupName}</h2>
                :
                <div>
                    <h2 className="text-center">{groupName}</h2>
                    {studentInGroup.map((student, i) => (
                        <div style={{ fontSize: 20, }} key={i}>
                            {
                                `${student.lastName} ${student.firstName} ${student.secondName}`
                            }
                            <hr />
                        </div>
                    ))}
                </div>
            }
        </div>
    );
});

export default StudentInGroup;