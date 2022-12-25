import React from "react";
import "./listStyle.css";

const TeacherList = ({ teacherList, onUpdate, hasWriteAuthority }) => {
    return (
        <div className="container student">

            {
                teacherList.map((teacher, i) => (
                    <>
                        <div key={i} className="bodyRow">
                            <div className="studentItem">{`${teacher.lastName} ${teacher.firstName} ${teacher.secondName}`}</div>
                            {
                                hasWriteAuthority &&
                                <div className="studentEditItem">
                                    <button style={{ backgroundColor: "transparent", borderColor: "transparent", flex: 0.5 }}>
                                        <img src={require(`../../icon/editIcon.png`)} style={{ width: "35px", height: "35px" }} alt="edit" onClick={() => onUpdate(teacher.id)} />
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

export default TeacherList;