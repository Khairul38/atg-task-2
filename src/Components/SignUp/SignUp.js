import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth/useAuth';
import Header from '../Header/Header';
import signUpImg from '../../images/login.png'

const SignUp = () => {
    const [registerData, setRegisterData] = useState({});
    const { allContext } = useAuth();
    const {
        handleRegistration,
        error } = allContext;

    /* Redirect */
    const location = useLocation();
    const navigate = useNavigate();

    /* Register data */
    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...registerData };
        newLoginData[field] = value;
        setRegisterData(newLoginData);
    }

    /* Email+Password Registration & Redirect */
    const registerSubmit = (e) => {
        e.preventDefault();
        handleRegistration(registerData.email, registerData.password, registerData.name, location, navigate);
    }
    return (
        <>
            <Header></Header>
            <div className="container row mx-auto align-items-center g-4 mt-5">
                <div className="col-md-7">
                    <img className="img-fluid" src={signUpImg} alt="" />
                </div>
                <div className=" col-md-5">
                    <h1>SignUp Account</h1>
                    {/* On Submit */}
                    <form onSubmit={registerSubmit} className="mt-5">
                        <div className="mb-3">
                            <label htmlFor="validationDefault01" className="form-label">Name</label>
                            {/* On Blur */}
                            <input onChange={handleOnChange}
                                type="text" name="name" className="form-control" id="validationDefault01" placeholder="Name" aria-label="Name"
                                required />
                        </div>
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
                                placeholder="Password" aria-label="Password"
                                autoComplete="current-password" required />
                            <div className="text-danger">
                                {error}
                            </div>
                        </div>
                        <div className="col-12 mb-3">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" required />
                                <label className="form-check-label" htmlFor="invalidCheck2">
                                    Agree to terms and conditions
                                </label>
                            </div>
                        </div>
                        <h6>Already have an account? <Link to='/signIn'>SignIn</Link></h6>
                        <div className="d-grid col-12 mt-3">
                            <button
                                type="submit"
                                className="btn btn-primary">
                                SignUp
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;