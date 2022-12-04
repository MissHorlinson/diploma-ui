import React from "react";
import "./listStyle.css";

const StudentList = ({ studentList, onUpdate, hasWriteAuthority }) => {
    return (
        <div className="container student">

            {
                studentList.map((student, i) => (
                    <>
                        <div key={i} className="bodyRow">
                            <div className="studentItem">{`${student.lastName} ${student.firstName} ${student.secondName}`}</div>
                            <div className="studentRecordBookItem">{student.recordBook}</div>
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