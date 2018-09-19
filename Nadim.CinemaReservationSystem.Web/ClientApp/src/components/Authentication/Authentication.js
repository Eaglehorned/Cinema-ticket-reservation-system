import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import Login from './Login';
import Registration from './Registration';
import Modal from 'react-modal';
import Logout from './Logout';
import userService from '../../Services/UserService';
import '../../styles/Authentication.css';

export default class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            userAuthorized: userService.getToken() ? true : false
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

    handleAuthorization = () => {
        this.setState({ userAuthorized: true });
        this.props.callBackSetShownRole(userService.getRole())
    }

    handleLogout = () =>{
        this.setState({ userAuthorized: false });
        this.props.callBackSetShownRole('');
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
                callBackHandleLogout={this.handleLogout}
                callBackSetShownRole={this.props.callBackSetShownRole}
            />
        );
    }

    renderContent = () =>{
        return this.state.userAuthorized
        ? this.renderLogoutContent() 
        : this.renderAuthenticationContent();
    }

    render(){
        const content = this.renderContent();
        return(
            <div className="authentication-container">
                {content}
            </div>
        );
    }
}