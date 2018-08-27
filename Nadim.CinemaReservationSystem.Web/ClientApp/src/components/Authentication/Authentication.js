import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import Login from './Login';
import Registration from './Registration';
import Modal from 'react-modal';
import '../../styles/Authentication.css';
import AuthenticationActions from '../../Actions/AuthenticationActions';

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
    }

    openModal = () =>{
        this.setState({
            modalIsOpen: true,
        })
    }

    closeModal = () =>{
        this.setState({
            modalIsOpen: false,
        })
    }

    setUserInfo = (authenticationData) =>{
        this.setState({
            username: authenticationData.username,
            token: authenticationData.token,
            role: authenticationData.role,
            userId: authenticationData.userId,
            modalIsOpen: false
        })

        localStorage.setItem('username', authenticationData.username);
        localStorage.setItem('token', authenticationData.token);
        localStorage.setItem('role', authenticationData.role);
        localStorage.setItem('userId', authenticationData.userId);

        this.props.callBackSetUserInfo({
            username: authenticationData.username,
            token: authenticationData.token,
            role: authenticationData.role,
            userId: authenticationData.userId
        })  
    }

    handleAuthorization = (authenticationData) => {
        this.setUserInfo(authenticationData)
    }

    handleLogout = () =>{
        this.setUserInfo({
            username: '',
            token: '',
            role: '',
            userId: ''
        })
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
                    <Registration callBackFromParent={this.handleAuthorization}/>
                </Modal>
            </React.Fragment>
        );
    }

    renderLogoutContent = () =>{
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