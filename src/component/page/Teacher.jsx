import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useNavigate } from "react-router";

import { useFetching } from "../../hooks/useFetching";

import { getDepartment } from "../../API/UtilDataService";
import { getTeacherById, saveTeacherData, getAllTeachers } from "../../API/GroupService";
import { logOut } from "../../API/AuthenticationService";

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
}), (dispatch) => ({
    clearToken: () => dispatch({
        type: "saveData",
        data: { token: null }
    })
}))(({ token, hasWriteAuthority, clearToken }) => {

    const [departmentList, setDepartmentList] = useState([]);
    const [teacherList, setTeacherList] = useState([]);
    const [teacherToUpdate, setTeacherToUpdate] = useState('');
    const [modal, setModal] = useState(false);
    const [isError, setIsError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const navigate = useNavigate();

    const [fetchTeacherData, isListLoading, listError] = useFetching(async () => {
        getAllTeachers(token).then((resp_) => {
            if (resp_.status === 401) {
                logOut().then(() => {
                    clearToken();
                    navigate("/login");
                })
            } else if (resp_.status !== 200) {
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
            <button className="btn btn-warning m-1" onClick={() => {
                setModal(true)
            }}>Додати викладача</button>
            <MyModal visible={modal} setVisible={setModal}>
                <TeacherForm
                    onSave={saveTeacher}
                    teacherToUpdate={teacherToUpdate}
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