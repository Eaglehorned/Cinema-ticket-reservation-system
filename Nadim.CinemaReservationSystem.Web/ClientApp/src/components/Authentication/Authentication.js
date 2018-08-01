import React, {Component} from 'react';
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
            modalIsOpen: false
        })
        this.props.callBackSetUserInfo({
            username: this.state.username,
            token:this.state.token,
        })
    }

    handleLogin = (AuthenticationData) => {
        this.setState({
            username: AuthenticationData.username,
            token: AuthenticationData.token,
        })
        this.props.callBackSetUserInfo({
            username: this.state.username,
            token:this.state.token,
        })
    }

    handleLogout(){
        this.setState({
            username: '',
            token: ''
        })
        localStorage.setItem('username', '');
        localStorage.setItem('token', '');
        this.props.callBackSetUserInfo({
            username: '',
            token: '',
        })
    }   

    renderAuthenticationContent() {
        return(
            <fieldset>
                <Login callBackFromParent={this.handleLogin}/>
                <button type="button" className="btn btn-primary" onClick={this.openModal}>Register</button>
                <Modal     
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    ariaHideApp={false}
                    className="authentication-Modal"
                >
                    <Registration callBackFromParent={this.handleRegistration}/>
                </Modal>
            </fieldset>
        );
    }

    renderLogoutContent() {
        return(
            <div>
                <h3>{this.state.username}</h3>
                <button 
                    type="button" 
                    className="btn btn-secondary btn-sm" 
                    onClick={this.handleLogout}
                >
                    Log out
                </button>
            </div>
        );
    }

    render(){
        let content = this.state.username ? this.renderLogoutContent() : this.renderAuthenticationContent();
        return(
            <div className="authentication-container">
                {content}
            </div>
        );
    }
}