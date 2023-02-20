import React from "react";

const TeacherList = ({ teacherList, onUpdate, hasWriteAuthority }) => {
    return (
        <div className="container student">
            {
                teacherList.map((teacher, i) => (
                    <div key={i} >
                        <div className="bodyRow">
                            <div className="studentItem">{`${teacher.lastName} ${teacher.firstName} ${teacher.secondName}`}</div>
                            {
                                hasWriteAuthority &&
                                <div className="studentEditItem">
                                    <button className="transparentBtn">
                                        <img src={require(`../../icon/editIcon.png`)} className="transparentEditBtn" alt="edit" onClick={() => onUpdate(teacher.id)} />
                                    </button>
                                </div>
                            }
                        </div>
                        <hr />
                    </div>
                ))
            }
        </div>
    )
};

export default TeacherList;