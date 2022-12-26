import React from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { logOut } from "../../API/AuthenticationService";

const pathList = {
    1: ["Plan",
        "Group",
        "Teacher"],
    5: ["Group"],
    6: ["Group"],
    7: ["Group"]
}

const generalPlanDataPath = [
    { name: "На основі", path: "/base" },
    { name: "Підготовка", path: "/step" },
    { name: "Шифр групи", path: "/cipher" },
    { name: "Кваліфікація", path: "/qualification" },
    { name: "Форма навчання", path: "/studyingForm" },
    { name: "Строк навчання", path: "/studyingTerm" },
    { name: "Тип навчання", path: "/studyingType" }
]

const disciplineDataPath = [
    { name: "Форма", path: "/disciplineForm" },
    { name: "Тип", path: "/disciplineType" },
    { name: "Звітність", path: "/reportForm" },
    { name: "Індивідуальне завдання", path: "/personalTaskForm" }
]

const otherPath = [
    { name: "Посада", path: "/position" },
    { name: "Ступінь", path: "/degree" },
    { name: "Звання", path: "/rank" },
    { name: "Каферда", path: "/department" },
]




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
        logOut().then(() => {
            clearToken();
            navigate("/login");
        })
    }

    return (
        <header>
            <nav className="navbar navbar-dark bg-dark">
                <div className="navbar-brand" style={{ margin: '10px' }}>Department Management App</div>
                {
                    isAuth &&
                        authority === 3 ?
                        <div style={{ display: "flex" }}>
                            <DropdownButton id="btn-dropdown-plan" title="Загальні відомості плану" drop="end" variant="secondary" className="mx-2">
                                {
                                    generalPlanDataPath.map(({ name, path }, i) => <Dropdown.Item href={path} eventKey={i}>{name}</Dropdown.Item>)
                                }
                            </DropdownButton>

                            <DropdownButton id="btn-dropdown-discipline" title="Дисціпліна" drop="end" variant="secondary" className="mx-2">
                                {
                                    disciplineDataPath.map(({ name, path }, i) => <Dropdown.Item href={path} eventKey={i}>{name}</Dropdown.Item>)
                                }
                            </DropdownButton>

                            <DropdownButton id="btn-dropdown-other" title="Інше" drop="end" variant="secondary" className="mx-2">
                                {
                                    otherPath.map(({ name, path }, i) => <Dropdown.Item href={path} eventKey={i}>{name}</Dropdown.Item>)
                                }
                            </DropdownButton>

                            <Link to={`/admin`} className="nav-link link-info link_style">Admin</Link>
                        </div>
                        :
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            {
                                pathList[authority].map((path, i) => <Link to={`/${path.toLowerCase().replace(" ", "")}`} className="nav-link link-info link_style" key={i}>{path}</Link>)
                            }
                        </div>
                }

                <div style={{ position: 'relative', right: '50px' }}>
                    <button className="btn btn-secondary" onClick={logout}>Logout</button>
                </div>
            </nav>
        </header>
    );
});

export default Header;