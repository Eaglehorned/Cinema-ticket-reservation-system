import React,{ Component } from 'react';
import Authentication from './Authentication/Authentication';
import { Route, Link, withRouter } from 'react-router-dom';
import '../styles/Header.css'
import userService from '../Services/UserService';

class Header extends Component{
    constructor(props){
        super(props);
        this.state={ shownRole: userService.getRole() }
    }

    componentWillMount(){
        if (this.state.shownRole === 'admin' && this.props.location.pathname.indexOf('admin') === -1){
            this.setState({shownRole: 'user'});
        }
    }

    setShownRole = (role) =>{
        if (role !== this.state.shownRole){
            if (role !== 'admin'){
                this.props.history.push('/')
            }
            else{
                this.props.history.push('/admin/cinema')
            }
        }
        this.setState({
            shownRole: role
        })
    }

    renderNavMenu = () =>{
        if (this.state.shownRole !== 'admin'){
            return;
        }
        else{
            return(
                <Route path="/admin" render={() => (
                    <React.Fragment>
                        <Link to="/admin/cinema" className="link-box">Cinema</Link>
                        <Link to="/admin/film" className="link-box">Film</Link>
                        <Link to="/admin/session" className="link-box">Session</Link>
                    </React.Fragment>
                )}/>
            );
        }
    }

    render(){
        let navMenu = this.renderNavMenu();
        return(
            <div className="header">
                <div className="header-nav-menu">
                    {navMenu}
                </div>
                <Authentication
                    callBackSetShownRole={this.setShownRole}
                />
            </div>
        );
    }   
}

export default withRouter(Header);