import React from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';

const AllGroupList = ({ groupList, title, onUpdate, onView, canSave}) => {
    return (
        <div className="container">
            <h2 className="text-center">{title}</h2>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead className="table-success">
                        <tr>
                            <th>Group</th>
                            <th>Faculty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            groupList.map(
                                group =>
                                    <tr key={group.id}>
                                        <td>{group.name}</td>
                                        <td>{group.facultyName}</td>
                                        <td style={{textAlign:'center'}}>
                                            {canSave && <button style={{ margin: "5px" }} className="btn btn-info" onClick={() => onUpdate(group.id)} >Update</button>}
                                            <Link className="btn btn-primary" to={"./" + group.id}>Student List</Link>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllGroupList;