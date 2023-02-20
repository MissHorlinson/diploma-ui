import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

import { useFetching } from "../../hooks/useFetching";

import { getCipher } from '../../API/UtilDataService';
import { getGroupList, saveGroupData, getGroupById } from '../../API/GroupService';

import Loader from '../UI/Loader';
import MyModal from '../UI/MyModal';

import GroupForm from '../form/GroupForm';
import AllGroupList from '../list/AllGroupList';
import StudentInGroup from './StudentInGroup';


const httpStatusCodes = {
    200: "OK",
    400: "BAD_REQUEST",
    404: "NOT_FOUND",
    500: "INTERNAL_SERVER ERROR"
}

const Group = connect((user) => ({
    token: user.token,
    hasWriteAuthority: user.role < 3
}))
    (({ token, hasWriteAuthority }) => {

        const [groupToUpdate, setGroupToupdate] = useState('');
        const [listForFront, setListForFront] = useState([]);
        const [facultyList, setFacultyList] = useState([]);
        const [groupList, setGroupList] = useState([]);
        const [modal, setModal] = useState(false);
        const [cipherList, setCipherList] = useState([]);
        const [isError, setIsError] = useState(false)
        const [errorMsg, setErrorMsg] = useState('')

        const [fetchGruoup, isListLoading, listError] = useFetching(async () => {
            getCipher(token).then((resp) => setCipherList(resp));
            getGroupList(token).then((resp_) => {
                if (resp_.status !== 200) {
                    setIsError(true);
                    setErrorMsg(httpStatusCodes[resp_.status])
                } else {
                    setGroupList(resp_.body);
                    setIsError(false);
                }
            })
        });

        useEffect(() => {
            fetchGruoup()
        }, [])


        const saveGroup = (data) => {
            saveGroupData(data, token).then((resp_) => {
                let objIndex = groupList.findIndex((obj) => obj.id === resp_.id);
                if (objIndex === -1) {
                    setGroupList([...groupList, resp_].sort((a, b) => a.id - b.id));
                } else {
                    groupList[objIndex] = resp_;
                    setGroupList([...groupList].sort((a, b) => a.id - b.id));
                }
                setModal(false);
            })
        }

        const getForUpdate = (id) => {
            getGroupById(id, token).then((resp_) => {
                setGroupToupdate(resp_);
                setModal(true);
            });
        }
        return (
            <div>
                <Routes>
                    <Route path='' element={
                        <>
                            {
                                hasWriteAuthority &&
                                <>
                                    <button className="btn btn-warning m-2" onClick={() => setModal(true)}>Додати групу</button>
                                    <MyModal visible={modal} setVisible={setModal}>
                                        <GroupForm
                                            onSave={saveGroup}
                                            cipherList={cipherList}
                                            facultyList={facultyList}
                                            groupToUpdate={groupToUpdate}
                                            onCancel={() => setModal(false)}
                                        />
                                    </MyModal>
                                </>
                            }

                            <hr />
                            {listError &&
                                <h1>Request error</h1>
                            }
                            {isListLoading
                                ? <Loader />
                                : <div>
                                    <AllGroupList
                                        groupList={groupList}
                                        onUpdate={getForUpdate}
                                        hasWriteAuthority={hasWriteAuthority}
                                    />
                                </div>
                            }
                        </>}>
                    </Route>
                    <Route path=':id/students' element={
                        <>
                            <Link to='..' className="btn btn-primary m-2"> {"\<- Список груп"}</Link>
                            <StudentInGroup />
                        </>
                    }></Route>
                </Routes>

            </div >
        );
    });

export default Group;