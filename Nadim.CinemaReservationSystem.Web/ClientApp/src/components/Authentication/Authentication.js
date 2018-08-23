import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import Login from './Login';
import Registration from './Registration';
import Modal from 'react-modal';
import '../../styles/Authentication.css';

export default class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            username: this.props.username,
            token: this.props.token,
            role: this.props.role,
            userId: this.props.userId
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.renderAuthenticationContent = this.renderAuthenticationContent.bind(this);
        this.renderLogoutContent = this.renderLogoutContent.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    openModal() {
        this.setState({
            modalIsOpen: true,
        })
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
        })
    }

    handleRegistration = (authenticationData) => {
        this.setState({
            username: authenticationData.username,
            token: authenticationData.token,
            role: authenticationData.role,
            userId: authenticationData.userId,
            modalIsOpen: false
        })
        this.props.callBackSetUserInfo({
            username: this.state.username,
            token: this.state.token,
            role: this.state.role,
            userId: this.state.userId
        })
    }

    handleLogin = (authenticationData) => {
        this.setState({
            username: authenticationData.username,
            token: authenticationData.token,
            role: authenticationData.role,
            userId: authenticationData.userId
        })
        this.props.callBackSetUserInfo({
            username: authenticationData.username,
            token: authenticationData.token,
            role: authenticationData.role,
            userId: authenticationData.userId
        })
    }

    handleLogout(){
        this.setState({
            username: '',
            token: '',
            role: '',
            userId: ''
        })
        localStorage.setItem('username', '');
        localStorage.setItem('token', '');
        localStorage.setItem('role', '');
        localStorage.setItem('userId', '');
        this.props.callBackSetUserInfo({
            username: '',
            token: '',
            role: '',
            userId: ''
        })
    }

    renderAuthenticationContent() {
        return(
            <React.Fragment>
                <fieldset className="login">
                    <Login 
                        callBackFromParent={this.handleLogin}
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
                    <Registration callBackFromParent={this.handleRegistration}/>
                </Modal>
            </React.Fragment>
        );
    }

    renderLogoutContent() {
        return(
            <div className="login">
                <h3>Username: {this.state.username}</h3>
                <Button
                    onClick={this.handleLogout}
                >
                    Log out
                </Button>
                {
                this.state.role === 'admin' ?
                <div>
                    <div>
                        <Button
                            bsSize="xsmall"
                            onClick={() => this.props.callBackSetShownRole('admin')}
                        >
                            Admin
                        </Button>
                    </div>
                    <div>
                        <Button
                            bsSize="xsmall"
                            onClick={() => this.props.callBackSetShownRole('user')}
                        >
                            User
                        </Button>
                    </div>
                </div>
                : ''
                }
            </div>
        );
    }

    render(){
        const content = this.state.username ? this.renderLogoutContent() : this.renderAuthenticationContent();
        return(
            <div className="authentication-container">
                {content}
            </div>
        );
    }
}