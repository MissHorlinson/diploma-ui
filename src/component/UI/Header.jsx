import React from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { logOut } from "../../API/AuthenticationService";

const pathList = {
    1: [{ name: "Плани", path: "/plan" }, { name: "Групи", path: "/group" }, { name: "Викладачі", path: "/teacher" },],
    5: [{ name: "Плани", path: "/plan" }, { name: "Групи", path: "/group" },],
    6: ["Групи"],
    7: ["Групи"]
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

const ffeksLogo = require(`../../icon/ffeks_logo.png`);

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
                <div className="navbar-brand m-2">
                    {/* <img src={ffeksLogo} className="logoStyle" /> */}
                    Кафедра ЕОМ
                </div>
                {
                    isAuth &&
                        authority === 3 ?
                        <div className="flex-display">
                            <DropdownButton id="btn-dropdown-plan" title="Загальні відомості плану" drop="end" variant="secondary" className="mx-2">
                                {
                                    generalPlanDataPath.map(({ name, path }, i) => <Dropdown.Item href={path} eventKey={i} key={i}>{name}</Dropdown.Item>)
                                }
                            </DropdownButton>

                            <DropdownButton id="btn-dropdown-discipline" title="Дисціпліна" drop="end" variant="secondary" className="mx-2">
                                {
                                    disciplineDataPath.map(({ name, path }, i) => <Dropdown.Item href={path} eventKey={i} key={i}>{name}</Dropdown.Item>)
                                }
                            </DropdownButton>

                            <DropdownButton id="btn-dropdown-other" title="Інше" drop="end" variant="secondary" className="mx-2">
                                {
                                    otherPath.map(({ name, path }, i) => <Dropdown.Item href={path} eventKey={i} key={i}>{name}</Dropdown.Item>)
                                }
                            </DropdownButton>

                            <Link to={`/admin`} className="nav-link link-info link_style">Адмін</Link>
                        </div>
                        :
                        <div className="flexRow">
                            {
                                pathList[authority].map(({ name, path }, i) => <Link to={`${path.toLowerCase().replace(" ", "")}`} className="nav-link link-info link_style" key={i}>{name}</Link>)
                            }
                        </div>
                }

                <div className="logoutBtn">
                    <button className="btn btn-secondary" onClick={logout}>Logout</button>
                </div>
            </nav>
        </header >
    );
});

export default Header;