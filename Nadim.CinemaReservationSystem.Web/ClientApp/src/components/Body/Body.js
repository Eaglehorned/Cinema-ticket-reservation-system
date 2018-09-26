import React from 'react';
import img1 from '../Images/1.jpg';
import img2 from '../Images/2.jpg';
import img3 from '../Images/3.jpg';
import Reservation from '../Reservation/Reservation';
import {Route, Redirect, Switch} from 'react-router-dom';
import "../../styles/Body.css";
import AdminBody from './AdminBody';
import DisplayCarousel from './DisplayCarousel';

const Body = () =>{
    return(
        <div className="body">
            <DisplayCarousel
                list={[img1, img2, img3]}
            />
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