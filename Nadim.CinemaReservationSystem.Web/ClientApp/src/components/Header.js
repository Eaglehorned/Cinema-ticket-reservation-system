import React from 'react';
import Authentication from './Authentication/Authentication';
import { Link } from 'react-router-dom';
import '../styles/Header.css'

const Header = (props) =>{

    return(
        <div className="header">
            <div className="body-nav-menu">
                <Link to="/cinema" className="link-box">Cinema</Link>
                <Link to="/film" className="link-box">Film</Link>
                <Link to="/session" className="link-box">Session</Link>
            </div>
            <Authentication
                callBackSetShownRole={props.callBackSetShownRole}
            />
        </div>
    );
}

export default Header;