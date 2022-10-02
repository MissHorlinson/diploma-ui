import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
// import { connect } from 'react-redux';

import { useFetching } from "../../hooks/useFetching";

import Loader from '../UI/Loader';
import MyModal from '../UI/MyModal';
import MySearch from '../UI/MySearch';

// import GroupForm from '../form/GroupForm';
// import AllGroupList from '../list/AllGroupList';
// import StudentInGroup from '../list/StudentInGroup';

// import GroupService from '../../API/GroupService';
// import FucultyServie from '../../API/FacultyService';

const Group = () => {
    // connect((user) => ({
    //     token: user.token,
    //     canSave: user.role < 3
    // })) 
    // (({token, canSave}) => {

    const [groupList, setGroupList] = useState([]);
    const [modal, setModal] = useState(false);
    const [filter, setFilter] = useState({ query: '' });
    const [groupToUpdate, setGroupToupdate] = useState('');
    const [btnClass, setBtnClass] = useState('updateControlBtn');
    const [listForFront, setListForFront] = useState([]);
    const [facultyList, setFacultyList] = useState([]);

    const [fetchGruoup, isListLoading, listError] = useFetching(async () => {
        // const grL = await GroupService.getAll(token);
        // setListForFront(grL.sort((a, b) => a.name.localeCompare(b.name)));

        // const facultL = await FucultyServie.getAll(token);
        // setFacultyList(facultL.sort((a, b) => a.name.localeCompare(b.name)));
    });

    useEffect(() => {
        fetchGruoup()
    }, [])

    useEffect(() => {
        searchGoup()
    }, [listForFront, filter])

    const saveGroup = (newGroup) => {
        // GroupService.save(newGroup, token).then((group) => {
        //     let objIndex = listForFront.findIndex((obj) => obj.id === group.id);
        //     if (objIndex === -1) {
        //         setGroupList(groupList, group);
        //         setListForFront([...listForFront, group].sort((a, b) => a.name.localeCompare(b.name)));
        //     } else {
        //         listForFront[objIndex] = group;
        //         setListForFront([...listForFront]);
        //     }
        //     setModal(false);
        // });
    }

    const getForUpdate = (id) => {
        // GroupService.getById(id, token).then((group) => {
        //     setGroupToupdate(group);
        // });
        // setBtnClass('updateControlBtn');
        // setModal(true);
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
                        {/* {canSave && <button style={{ margin: "10px" }} className="btn btn-warning" onClick={() => setModal(true)}>Create Group</button>} */}
                        {/* <MyModal visible={modal} setVisible={setModal}>
                            <GroupForm onSave={saveGroup} facultyList={facultyList} groupToUpdate={groupToUpdate} btnClass={btnClass} onCancel={() => setModal(false)} />
                        </MyModal> */}
                        <hr />
                        {listError &&
                            <h1>Request error</h1>
                        }
                        {/* {isListLoading
                            ? <Loader />
                            : <div>
                                <MySearch filter={filter} setFilter={setFilter} onFilter={searchGoup} />
                                <AllGroupList groupList={groupList} title="GroupList" onUpdate={getForUpdate} onView={viewGroup} canSave={canSave} />
                            </div>
                        } */}
                    </>}>
                </Route>
                <Route path=':id' element={
                    <>
                        <Link to='..' className="btn btn-primary" style={{ margin: '10px' }}> {"\<- Groups"}</Link>
                        {/* <StudentInGroup /> */}
                    </>
                }></Route>
            </Routes>

        </div >
    );
};

export default Group;