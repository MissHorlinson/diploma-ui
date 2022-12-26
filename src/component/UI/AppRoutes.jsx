import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { connect } from "react-redux";

import LoginPage from './LoginPage';
import Header from './Header';
import Footer from "../UI/Footer";
import Plan from "../page/Plan";
import Group from "../page/Group";
import Teacher from "../page/Teacher";

import Base from '../dictionary/Base';
import Cipher from '../dictionary/Cipher';
import Step from "../dictionary/Step";
import Qualification from '../dictionary/Qualification';
import StudyingForm from '../dictionary/StudyingForm';
import DisciplineForm from '../dictionary/DisciplineForm';
import DisciplineType from "../dictionary/DisciplineType";
import PersonalTask from '../dictionary/PersonalTask';
import Position from '../dictionary/Position';
import Degree from '../dictionary/Degree';
import Rank from '../dictionary/Rank';
import ReportingForm from '../dictionary/ReportingForm';
import StudyingTerm from "../dictionary/StudyingTerm";
import StudyingType from "../dictionary/StudyingType";
import Department from '../dictionary/Department';

import User from '../adminPage/Users';


const AppRoutes = connect((data) => ({
    isAuth: Boolean(data.token),
    role: data.role
}))(({ isAuth, role }) => {

    return (
        isAuth
            ?
            <Router>
                <Header />
                <Routes>
                    {
                        role === 3 ?
                            <Route path="*" element={<Navigate to="/base" replace />} />
                            :
                            <Route path="*" element={<Navigate to="/plan" replace />} />
                    }
                    <Route path="/plan/*" element={<Plan />}></Route>
                    <Route path="/group/*" element={<Group />}></Route>
                    <Route path="/teacher/*" element={<Teacher />}></Route>


                    <Route path="/base" element={<Base />}></Route>
                    <Route path="/step" element={<Step />}></Route>
                    <Route path="/cipher" element={<Cipher />}></Route>
                    <Route path="/qualification" element={<Qualification />}></Route>
                    <Route path="/studyingForm" element={<StudyingForm />}></Route>
                    <Route path="/disciplineType" element={<DisciplineType />}></Route>
                    <Route path="/disciplineForm" element={<DisciplineForm />}></Route>

                    <Route path="/personalTaskForm" element={<PersonalTask />}></Route>
                    <Route path="/position" element={<Position />}></Route>
                    <Route path="/degree" element={<Degree />}></Route>
                    <Route path="/rank" element={<Rank />}></Route>
                    <Route path="/reportForm" element={<ReportingForm />}></Route>

                    <Route path="/studyingTerm" element={<StudyingTerm />}></Route>
                    <Route path="/studyingType" element={<StudyingType />}></Route>
                    <Route path="/department" element={<Department />}></Route>

                    <Route path="/admin/*" element={<User />}></Route>
                </Routes>
                <Footer />
            </Router>
            :
            <>
                <Router>
                    <Routes>
                        <Route path="/login" element={<LoginPage />}></Route>
                        <Route path="*" element={<Navigate to="/login" replace />}
                        />
                    </Routes>
                    <Footer />
                </Router>
            </>

    );
});

export default AppRoutes;