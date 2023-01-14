import React, { useState } from "react";
import "./listStyle.css";

import MyModal from "../UI/MyModal";
import CourseSemesterOption from "../form/CourseSemesterOption";

const StudentList = ({ studentList, onUpdate, hasWriteAuthority, onLoad }) => {

    const [semester, setSemester] = useState('');
    const [modal, setModal] = useState(false);
    const [student, setStudent] = useState('')


    const modalActivate = (student) => {
        setModal(true);
        setStudent(student)
    }

    const loadBySemester = (sem) => {
        onLoad(student, sem);
        setModal(false);
    }

    return (
        <div className="container student">
            <MyModal visible={modal} setVisible={setModal}>
                <CourseSemesterOption
                    option="Семестр"
                    download={loadBySemester}
                    onCancel={() => setModal(false)}
                />
            </MyModal>

            {
                studentList.map((student, i) => (
                    <>
                        <div key={i} className="bodyRow">
                            <div className="studentItem">{`${student.lastName} ${student.firstName} ${student.secondName}`}</div>
                            <div className="studentRecordBookItem">{student.recordBook}</div>

                            <div>
                                <button style={{ backgroundColor: "transparent", borderColor: "transparent", flex: 0.5 }} onClick={() => modalActivate(student.id)}>Завантажити план за курс</button>
                            </div>

                            {
                                hasWriteAuthority &&
                                <div className="studentEditItem">
                                    <button style={{ backgroundColor: "transparent", borderColor: "transparent", flex: 0.5 }}>
                                        <img src={require(`../../icon/editIcon.png`)} style={{ width: "35px", height: "35px" }} alt="edit" onClick={() => onUpdate(student.id)} />
                                    </button>
                                </div>
                            }
                        </div>
                        <hr />
                    </>
                ))
            }
        </div>
    )
};

export default StudentList;