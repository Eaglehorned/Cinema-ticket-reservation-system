import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Footer.css';

const Footer = () =>{
    return(
        <footer className="footer-wrap">
            <div className="wrap">
                <div className="footer-menu-item">
                    <div className="heading">
                        First part of test links
                    </div>
                    <ul>
                        <li>
                            <Link to="/">
                                link 1
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                link 2
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                link 3
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-menu-item">
                    <div className="heading">
                        Second part
                    </div>
                    <ul>
                        <li>
                            <Link to="/">
                                link 1
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                link 2
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                link 3
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default(Footer);