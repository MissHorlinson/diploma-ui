import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { logIn } from "../../API/AuthenticationService";

const initValue = {
    username: '',
    password: ''
}

const LoginPage = connect(null, (dispatch) => ({
    setUser: (user) => dispatch(
        {
            type: 'saveData',
            data: user
        }
    )
}))
    (({ setUser }) => {
        const [cred, setCred] = useState(initValue);
        const [credValid, setCredValid] = useState('none');
        const [errorMsg, setErrorMsg] = useState('');

        const navigate = useNavigate();

        const setValue = (data) => {
            setCred((creds) => ({
                ...creds, ...data
            }));
        }

        const login = e => {
            logIn(cred).then((resp) => {
                if (resp.status === 200) {
                    setUser(resp.body);
                    navigate("/plan");
                }
            }).catch((err) => {
                setErrorMsg(err.response.data)
                setCredValid('contents');
            });

        }

        return (
            <div className="container">
                <div className="d-flex justify-content-center h-100" style={{ margin: '20px' }}>
                    <div className="card">
                        <article className="card-body">
                            <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>
                            <hr />
                            <div className="login">
                                <div className="form-group" style={{ margin: '5px' }}>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"> <i className="fa fa-user" style={{ height: '25px' }}></i> </span>
                                        </div>
                                        <input value={cred.username}
                                            onChange={e => setValue({ username: e.target.value })}
                                            className="form-control"
                                            required="required"
                                            placeholder="Email or login" />
                                    </div>
                                </div>
                                <div className="form-group" style={{ margin: '5px' }}>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"> <i className="fa fa-lock" style={{ height: '25px' }}></i> </span>
                                        </div>
                                        <input value={cred.password}
                                            onChange={e => setValue({ password: e.target.value })}
                                            className="form-control"
                                            required="required"
                                            placeholder="******"
                                            type="password" />
                                    </div>
                                </div>
                                <div className="form-group text-center" style={{ margin: '5px' }}>
                                    <button className="btn btn-primary btn-block" onClick={login}> Login  </button>
                                </div>
                                <div style={{ display: credValid }} className="text-center alert alert-danger" role="alert">
                                    {errorMsg}
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        );
    });

export default LoginPage;


