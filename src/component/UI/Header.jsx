import React from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import AuthService from "../../API/AuthenticationService";

const pathList = {
    1: ["Plan",
        "Group",
        "Teacher"],
    3: [
        "Base",
        "Step",
        "Cipher",
        "Qualification",
        "Stud form",
        "Disc form",
        "Disc type",
        "Personal task",
        "Position",
        "Degree",
        "Report form",
        "Rank",
        "Stud term",
        "Stud type",
        "Department",
    ],
    5: ["Group"],
    6: ["Group"],
    7: ["Group"]
}


const Header = connect((data) => ({
    isAuth: Boolean(data.token),
    authority: data.role
}), (dispatch) => ({
    clearToken: () => dispatch({
        type: "saveData",
        data: { token: null }
    })
}))(({ isAuth, clearToken, authority }) => {


    const navigate = useNavigate();
    const logout = e => {
        AuthService.logout().then(() => {
            clearToken();
            navigate("/login");
        })
    }

    return (
        <header>
            <nav className="navbar navbar-dark bg-dark">
                <div className="navbar-brand" style={{ margin: '10px' }}>Department Management App</div>
                {
                    isAuth
                        ?
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            {
                                //  console.log(pathList[authority], authority)
                                pathList[authority].map((path, i) => <Link to={`/${path.toLowerCase().replace(" ", "")}`} className="nav-link link-info link_style" key={i}>{path}</Link>)
                            }
                        </div>
                        :
                        <>
                            {
                                console.log("empty")
                            }
                        </>
                }

                <div style={{ position: 'relative', right: '50px' }}>
                    <button className="btn btn-secondary" onClick={logout}>Logout</button>
                </div>
            </nav>
        </header>
    );
});

export default Header;