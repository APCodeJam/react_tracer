import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { useLogoutAppUserMutation } from '../../common/services/appUserSlice';

function Navbar() {
    const [logout, result] = useLogoutAppUserMutation();

    function logoutAction() {
        logout('');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {  !localStorage.getItem('appUser') ?
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to='/userlist'>Roll Call</Link>
                                </li>
                            </ul>
                        :  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to='/userlist'>Roll Call</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to={`/profile/${localStorage.getItem('appUser')}`}>My Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to='/' onClick={logoutAction}>Logout {localStorage.getItem('appUser')}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to={`/insights/${localStorage.getItem('appUser')}`}>Insights</Link>
                                </li>
                            </ul> }
                        
                    </div>
                    <div className="d-flex flex-row-reverse bd-highlight">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/darkmode">Darkmode</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export default Navbar;
