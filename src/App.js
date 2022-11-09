import React, { useEffect } from 'react';
import { connect } from "react-redux";

import './App.css';

import AppRoutes from './component/UI/AppRoutes';

const App = connect(
  ({ token, user }) => ({ token, user }),
  (dispatch) => ({
    loadUser: (user) => {
      dispatch(
        {
          type: 'saveData',
          data: user
        }
      )
    }
  })
)
  (({ token, user }) => {

    useEffect(() => { }, [])

    return (
      <AppRoutes />
    );
  })

export default App;
