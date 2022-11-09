import React from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import AuthService from "../../API/AuthenticationService";

const Header = connect((data) => ({
    isAuth: Boolean(data.token)
}), (dispatch) => ({
    clearToken: () => dispatch({
        type: "saveData",
        data: { token: null }
    })
}))(({ isAuth, clearToken }) => {

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
                            <Link to="/plan" className="nav-link link-info link_style">Plan</Link>
                            <Link to="/group" className="nav-link link-info link_style">Group</Link>
                        </div>
                        :
                        <></>
                }

                <div style={{ position: 'relative', right: '50px' }}>
                    <button className="btn btn-secondary" onClick={logout}>Logout</button>
                </div>
            </nav>
        </header>
    );
});

export default Header;