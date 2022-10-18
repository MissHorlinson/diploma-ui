import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Header';
import Plan from "../page/Plan";
import Group from "../page/Group";
import WeekForm from "../form/WeekForm";

const AppRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/plan/*" element={<Plan />}></Route>
                    {/* <Route path="/group" element={<Group />}></Route> */}
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default AppRoutes;