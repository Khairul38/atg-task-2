import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth/useAuth';
import Logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const { allContext } = useAuth();
    const { user, logout } = allContext;
    return (
        <div className="sticky-top">
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand me-5" to="/">
                        <img src={Logo} alt="" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                            </li>
                        </ul>
                        {user.email ?
                            <>
                                <h5 className="me-3 my-2 text-color">{user.displayName}</h5>
                                <button type="button" className="btn btn-primary"
                                    onClick={logout} >Logout</button>
                            </> :
                            <div className="d-flex gap-3">
                                <Link to="/signIn"><button
                                    type="button" className="btn btn-primary">SignIn</button>
                                </Link>
                                <Link to="/signUp" ><button
                                    type="button" className="btn btn-primary">SignUp</button>
                                </Link>
                            </div>}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;