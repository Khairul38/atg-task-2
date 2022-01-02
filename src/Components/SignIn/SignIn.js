import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth/useAuth';
import Header from '../Header/Header';
import signInImg from '../../images/login.png';

const SignIn = () => {
    const [loginData, setLoginData] = useState({});
    const { allContext } = useAuth();
    const {
        handleLogin,
        error } = allContext;

    /* Redirect */
    const location = useLocation();
    const navigate = useNavigate();

    /* Login data */
    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    /* Email+Password Login & Redirect */
    const loginSubmit = (e) => {
        e.preventDefault();
        handleLogin(loginData.email, loginData.password, location, navigate);
    }
    return (
        <>
            <Header></Header>
            <div className="container row mx-auto align-items-center g-4 my-5">
                <div className="col-md-7">
                    <img className="img-fluid" src={signInImg} alt="" />
                </div>
                <div className=" col-md-5">
                    <h1>SignIn Account</h1>
                    {/* On Submit */}
                    <form onSubmit={loginSubmit} className="mt-5">
                        <div className="mb-3">
                            <label htmlFor="validationDefault02" className="form-label">Email</label>
                            {/* On Blur */}
                            <input onChange={handleOnChange} type="email" name="email" className="form-control" id="validationDefault02"
                                placeholder="Email" aria-label="Email"
                                autoComplete="email" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="validationDefault03" className="form-label">Password</label>
                            {/* On Blur */}
                            <input onChange={handleOnChange} type="password" name="password" className="form-control" id="validationDefault03"
                                placeholder="Password"
                                autoComplete="current-password" aria-label="Password" required />
                            <div className="text-danger">
                                {error}
                            </div>
                        </div>
                        <div className="col-12 mb-3">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" />
                                <label className="form-check-label" htmlFor="invalidCheck2">
                                    Remember Me
                                </label>
                            </div>
                        </div>
                        <h6>Don't have an account? <Link to='/signUp'>SignUp</Link></h6>
                        <div className="d-grid col-12 mt-3">
                            <button
                                type="submit"
                                className="btn btn-primary">
                                SignIN
                            </button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </>
    );
};

export default SignIn;