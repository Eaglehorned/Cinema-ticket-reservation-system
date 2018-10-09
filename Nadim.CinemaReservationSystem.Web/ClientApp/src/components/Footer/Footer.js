import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Footer.css';

const Footer = () =>{
    return(
        <footer className="footer-wrap">
            <div className="wrap">
                <div className="footer-menu-items-container">
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
                <div className="social-media-links-container">
                    <div className="heading">
                        Social media links
                    </div>
                    <Link to="/">
                        <div className="icon-container instagram">
                            <i className="fa fa-instagram icon"></i>
                        </div>
                    </Link>
                    <Link to="/">
                        <div className="icon-container">
                            <i className="fa fa-twitter icon"></i>
                        </div>
                    </Link>
                    <Link to="/">
                        <div className="icon-container">
                            <i className="fa fa-facebook icon"></i>
                        </div>
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default(Footer);