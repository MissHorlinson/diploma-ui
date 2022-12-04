import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

import { useFetching } from "../../hooks/useFetching";

import { getCipher } from '../../API/UtilDataService';
import { getGroupList, saveGroupData, getGroupById } from '../../API/GroupService';

import Loader from '../UI/Loader';
import MyModal from '../UI/MyModal';
import MySearch from '../UI/MySearch';

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
    hasWriteAuthority: user.role < 3,
    hasReadAuthority: user.role > 3 && user.role < 5
}))
    (({ token, hasWriteAuthority, hasReadAuthority }) => {


        const [filter, setFilter] = useState({ query: '' });
        const [groupToUpdate, setGroupToupdate] = useState('');
        const [btnClass, setBtnClass] = useState('updateControlBtn');
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

        useEffect(() => {
            searchGoup()
        }, [listForFront, filter])

        const saveGroup = (data) => {
            console.log(JSON.stringify(data))
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

        const viewGroup = (id) => {
            getForUpdate(id);
            setBtnClass('viewControlBtn');
        }

        const searchGoup = () => {
            return setGroupList(listForFront.filter((item) => item.name.toLowerCase().includes(filter.query.toLowerCase())));
        }


        return (
            <div>
                <Routes>
                    <Route path='' element={
                        <>
                            {
                                hasWriteAuthority &&
                                <>
                                    <button style={{ margin: "10px" }} className="btn btn-warning" onClick={() => setModal(true)}>Create Group</button>
                                    <MyModal visible={modal} setVisible={setModal}>
                                        <GroupForm
                                            onSave={saveGroup}
                                            cipherList={cipherList}
                                            facultyList={facultyList}
                                            groupToUpdate={groupToUpdate}
                                            btnClass={btnClass}
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
                                    <MySearch filter={filter} setFilter={setFilter} onFilter={searchGoup} />
                                    <AllGroupList
                                        groupList={groupList}
                                        title="GroupList"
                                        hasWriteAuthority={hasWriteAuthority}
                                        onUpdate={getForUpdate}
                                        onView={viewGroup} />
                                </div>
                            }
                        </>}>
                    </Route>
                    <Route path=':id/students' element={
                        <>
                            <Link to='..' className="btn btn-primary" style={{ margin: '10px' }}> {"\<- Groups"}</Link>
                            <StudentInGroup />
                        </>
                    }></Route>
                </Routes>

            </div >
        );
    });

export default Group;