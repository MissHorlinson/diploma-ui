import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { useFetching } from "../../hooks/useFetching";

import { getDepartment } from "../../API/UtilDataService";

import { getTeacherById, saveTeacherData, getAllTeachers } from "../../API/GroupService";

import MyModal from "../UI/MyModal";
import TeacherForm from "../form/TeacherForm";
import TeacherList from "../list/TeacherList";


const httpStatusCodes = {
    200: "OK",
    400: "BAD_REQUEST",
    404: "NOT_FOUND",
    500: "INTERNAL_SERVER ERROR"
}

const Teacher = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role < 3
}))(({ token, hasWriteAuthority }) => {

    const [departmentList, setDepartmentList] = useState([]);

    const [teacherList, setTeacherList] = useState([]);

    const [teacherToUpdate, setTeacherToUpdate] = useState('');

    const [modal, setModal] = useState(false);
    const [btnClass, setBtnClass] = useState('updateControlBtn');

    const [isError, setIsError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const [fetchTeacherData, isListLoading, listError] = useFetching(async () => {
        getAllTeachers(token).then((resp_) => {
            if (resp_.status !== 200) {
                setIsError(true);
                setErrorMsg(httpStatusCodes[resp_.status])
            } else {
                setTeacherList(resp_.body);
                setIsError(false);
            }
        })
        getDepartment(token).then((resp_) => { setDepartmentList(resp_) });
    })


    useEffect(() => {
        fetchTeacherData();
    }, [])


    const saveTeacher = (teacher) => {
        saveTeacherData(teacher, token).then((resp_) => {
            let objIndex = teacherList.findIndex((obj) => obj.id === resp_.id);
            if (objIndex === -1) {
                setTeacherList([...teacherList, resp_].sort((a, b) => a.id - b.id));
            } else {
                teacherList[objIndex] = resp_;
                setTeacherList([...teacherList].sort((a, b) => a.id - b.id));
            }
            setModal(false);
        });

    }
    const getForUpdate = (id) => {
        getTeacherById(id, token).then((resp_) => {
            setTeacherToUpdate(resp_);
            setModal(true);
        });
    }

    return (
        <div className="container">
            <button style={{ margin: "10px" }} className="btn btn-warning" onClick={() => {
                setModal(true)
            }}>Add Teacher</button>
            <MyModal visible={modal} setVisible={setModal}>
                <TeacherForm
                    onSave={saveTeacher}
                    teacherToUpdate={teacherToUpdate}
                    btnClass={btnClass}
                    onCancel={() => setModal(false)}
                    departmentList={departmentList}
                />
            </MyModal>

            {
                teacherList.length > 0 &&
                <TeacherList
                    teacherList={teacherList}
                    hasWriteAuthority={hasWriteAuthority}
                    onUpdate={getForUpdate}
                />
            }


        </div>
    )


})

export default Teacher;