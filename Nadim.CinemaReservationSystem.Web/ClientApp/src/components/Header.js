import React from 'react';
import Authentication from './Authentication/Authentication';
import '../styles/Header.css'

const Header = (props) =>{

    return(
        <div className="header">
            <Authentication
                username={props.username}
                role={props.role}
                callBackSetUserInfo={(userInfo) => props.callBackSetUserInfo(userInfo)}
                callBackSetShownRole={props.callBackSetShownRole}
            />
        </div>
    );
}

export default Header;