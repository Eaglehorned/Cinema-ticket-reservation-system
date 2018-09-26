import React,{ Component } from 'react';
import Authentication from '../Authentication/Authentication';
import { withRouter } from 'react-router-dom';
import '../../styles/Header.css'
import userService from '../../Services/UserService';
import NavPanel from './NavPanel';

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

    render(){
        return(
            <div className="header">
                <div className="wrap">
                    <NavPanel role={this.state.shownRole}/>
                    <Authentication
                        callBackSetShownRole={this.setShownRole}
                    />
                </div>
            </div>
        );
    }   
}

export default withRouter(Header);