import React from 'react';
import Authentication from './Authentication/Authentication';
import '../styles/Header.css'

const Header = (props) =>{

    return(
        <div className="header">
            <Authentication
                callBackSetShownRole={props.callBackSetShownRole}
            />
        </div>
    );
}

export default Header;