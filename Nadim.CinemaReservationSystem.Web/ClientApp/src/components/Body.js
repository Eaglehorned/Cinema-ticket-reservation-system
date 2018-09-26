import React from 'react';
import Reservation from './Reservation/Reservation';
import {Route, Redirect, Switch} from 'react-router-dom';
import "../styles/Body.css";
import AdminBody from './AdminBody';

const Body = () =>{
    return(
        <div className="body">
            <div className="wrap">
                <Switch>
                    <Route path="/admin" component={AdminBody}/>
                    <Route path="/sessions" component={Reservation}/>
                    <Redirect from="/" to="/sessions"/>
                </Switch>
            </div>
        </div>
    );
}

export default Body;