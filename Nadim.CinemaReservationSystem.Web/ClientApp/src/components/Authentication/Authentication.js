import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import Login from './Login';
import Registration from './Registration';
import Modal from 'react-modal';
import '../../styles/Authentication.css';
import Logout from './Logout';
import TokenService from '../../Services/TokenService';

export default class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        }
    }

    openModal = () =>{
        this.setState({
            modalIsOpen: true,
        });
    }

    closeModal = () =>{
        this.setState({
            modalIsOpen: false,
        });
    }

    setUserInfo = (authenticationData) =>{
        this.setState({
            username: authenticationData.username,
            role: authenticationData.role,
            userId: authenticationData.userId,
            modalIsOpen: false
        });

        localStorage.setItem('username', authenticationData.username);
        localStorage.setItem('role', authenticationData.role);
        localStorage.setItem('userId', authenticationData.userId);

        this.props.callBackSetUserInfo({
            username: authenticationData.username,
            role: authenticationData.role,
            userId: authenticationData.userId
        });
    }

    handleAuthorization = (authenticationData) => {
        this.setUserInfo(authenticationData);
    }

    handleLogout = () =>{
        this.setUserInfo({
            username: '',
            role: '',
            userId: ''
        });
        TokenService.setToken('')
    }

    renderAuthenticationContent = () =>{
        return(
            <React.Fragment>
                <fieldset className="login">
                    <Login 
                        callBackFromParent={this.handleAuthorization}
                    />
                    <Button
                        bsStyle="primary"
                        bsSize="small"
                        onClick={this.openModal}
                    >
                        Register
                    </Button>
                </fieldset>
                <Modal     
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    ariaHideApp={false}
                    className="authentication-Modal"
                >
                    <Registration 
                        callBackFromParent={this.handleAuthorization}
                    />
                </Modal>
            </React.Fragment>
        );
    }

    renderLogoutContent = () =>{
        return(
            <Logout
                username={this.props.username}
                role={this.props.role}
                callBackHandleLogout={this.handleLogout}
                callBackSetShownRole={this.props.callBackSetShownRole}
            />
        );
    }

    render(){
        const content = this.props.username ? this.renderLogoutContent() : this.renderAuthenticationContent();
        return(
            <div className="authentication-container">
                {content}
            </div>
        );
    }
}