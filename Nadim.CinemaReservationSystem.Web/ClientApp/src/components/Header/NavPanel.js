import React from 'react';
import logo from '../Images/cinema_logo_white.png';
import { Route, Link } from 'react-router-dom';
import { Button, FormControl} from 'react-bootstrap';

const NavPanel = (props) =>{
    if (props.role !== 'admin'){
        return(
            <Route path="/" render={() => (
                <React.Fragment>
                    <div className="header-column">
                        <Link to="/">
                            <div className="logo">
                                <img
                                    src={logo}
                                    alt="logo"
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="header-column">
                        <div className="search-container">
                            <i className="fa fa-search icon-container"></i>
                            <FormControl
                                type="text"
                                name="search"
                                placeholder="Search..."
                            />
                            <Button>Search</Button>
                        </div>
                    </div>
                </React.Fragment>
            )}/>
        );
    }
    else{
        return(
            <div className="header-nav-menu">
                <Route path="/admin" render={() => (
                    <React.Fragment>
                        <Link to="/admin/cinema" className="link-box">Cinema</Link>
                        <Link to="/admin/film" className="link-box">Film</Link>
                        <Link to="/admin/session" className="link-box">Session</Link>
                    </React.Fragment>
                )}/>
            </div>
        );
    }
} 

export default NavPanel;