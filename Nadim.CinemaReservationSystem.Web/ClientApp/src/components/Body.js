import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Cinema from './Cinema/Cinema';
import Film from './Film/Film';
import Session from './Session/Session';
import Reservation from './Reservation/Reservation';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import "../styles/Body.css";

export default class Body extends Component{
    constructor(props){
        super(props);
        this.state={
            chosenOperation: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.role !== this.props.role){
            if (nextProps.role !== 'admin'){
                this.setState({
                    chosenOperation: 'reservation'
                })
            }
            else{
                this.setState({chosenOperation: 'cinema'});
            }
        }
    }

    componentDidMount(){
        if (this.props.role !== 'admin'){
            this.setState({
                chosenOperation: 'reservation'
            })
        }
        else{
            this.setState({
                chosenOperation: 'cinema'
            })
        }
    }

    informWithMessage = (message) =>{
        this.props.callBackInformWithMessage(message);
    }

    handleSelectNav = (eventKey) =>{
        this.setState({
            chosenOperation: eventKey
        });
    }

    renderContent = () => {
        return(
            <Switch>
                <Route exact path="/cinema" component={()=> (<Cinema/>)}/>
                <Route exact path="/film" component={()=> (<Film/>)}/>
                <Route exact path="/session" component={()=> (<Session/>)}/>
                <Route exact path="/reservation" component={()=> (<Reservation/>)}/>
            </Switch>
        );
    }

    render(){
        let content = this.renderContent();
        return(
            <div className="body">
                {content}
            </div>
        );
    }
}