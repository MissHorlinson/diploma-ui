import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { connect } from "react-redux";

import LoginPage from './LoginPage';
import Header from './Header';
import Plan from "../page/Plan";
import Group from "../page/Group";


const AppRoutes = connect((data) => ({
    isAuth: Boolean(data.token)
}))(({ isAuth }) => {

    return (
        isAuth
            ?
            <Router>
                <Header />
                <Routes>
                    <Route path="/plan/*" element={<Plan />}></Route>
                    <Route path="/group/*" element={<Group />}></Route>
                    <Route path="*" element={<Navigate to="/plan" replace />} />

                </Routes>
            </Router>
            :
            <>
                <Router>
                    <Routes>
                        <Route path="/login" element={<LoginPage />}></Route>
                        <Route path="*" element={<Navigate to="/login" replace />}
                        />
                    </Routes>
                </Router>
            </>

    );
});

export default AppRoutes;