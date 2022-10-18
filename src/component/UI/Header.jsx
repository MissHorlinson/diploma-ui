import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-dark bg-dark">
                <div className="navbar-brand" style={{ margin: '10px' }}>Department Management App</div>
                {/* {
                    isAuth
                        ?
                        <div> */}
                <Link to="/plan" className="nav-link link-info link_style">Plan</Link>
                <Link to="/week" className="nav-link link-info link_style">Week</Link>
                <Link to="/group" className="nav-link link-info link_style">Group</Link>

                {/* </div>
                        :
                        <></>
                } */}

                <div style={{ position: 'relative', right: '50px' }}>
                    <button className="btn btn-secondary" onClick={() => console.log("logout")}>Logout</button>
                </div>
            </nav>
        </header>
    );
}

export default Header;