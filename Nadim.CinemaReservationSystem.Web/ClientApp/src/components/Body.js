import React from 'react';
import Cinema from './Cinema/Cinema';
import Film from './Film/Film';
import Session from './Session/Session';
import Reservation from './Reservation/Reservation';
import {Route, Switch} from 'react-router-dom';
import "../styles/Body.css";

const Body = () =>{
    return(
        <div className="body">
            <Switch>
                <Route path="/cinema" component={Cinema}/>
                <Route path="/film" component={Film}/>
                <Route path="/session" component={Session}/>
                <Route exact path="/" component={Reservation}/>
            </Switch>
        </div>
    );
}

export default Body;