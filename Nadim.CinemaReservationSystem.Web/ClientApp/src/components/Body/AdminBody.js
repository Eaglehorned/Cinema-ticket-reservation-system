import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Cinema from '../Cinema/Cinema';
import Film from '../Film/Film';
import Session from '../Session/Session';
import userService from '../../Services/UserService';

const renderContent = (props) =>{
    return(
        <Switch>
            <Route path={`${props.match.url}/cinema`} component={Cinema}/>
            <Route path={`${props.match.url}/film`} component={Film}/>
            <Route path={`${props.match.url}/session`} component={Session}/>
        </Switch>
    );
}

const AdminBody = (props) =>{
    return userService.getRole() === 'admin'
    ? renderContent(props)
    : <Redirect to="/sessions"/>;
}

export default AdminBody;