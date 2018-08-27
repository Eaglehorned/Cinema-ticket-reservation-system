import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Cinema from './Cinema/Cinema';
import Film from './Film/Film';
import Session from './Session/Session';
import Reservation from './Reservation/Reservation';

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

    renderCinemaContent = () => {
        return(
            <Cinema
                token={this.props.token}
                callBackInformWithMessage={this.informWithMessage}
            />
        );
    }

    renderFilmContent = () => {
        return(
            <Film
                token={this.props.token}
                callBackInformWithMessage={this.informWithMessage}
            />
        );
    }

    renderSessionContent = () => {
        return(
            <Session
                token={this.props.token}
                callBackInformWithMessage={this.informWithMessage}
            />
        );
    }

    renderReservationContent = () =>{
        return(
            <Reservation
                token={this.props.token}
                callBackInformWithMessage={this.props.callBackInformWithMessage}
                userId={this.props.userId}
            />
        );
    }

    renderContent = () => {
        switch(this.state.chosenOperation){
            case 'cinema': 
                return this.renderCinemaContent();
            case 'film':
                return this.renderFilmContent();
            case 'session': 
                return this.renderSessionContent();
            case 'reservation':
                return this.renderReservationContent();
            default: 
                return '';
        }
    }

    renderAdminNav = () =>{
        return(
            <Tabs
                justified
                activeKey={this.state.chosenOperation}
                onSelect={key => this.handleSelectNav(key)}
                id="select_operation"
            >
                <Tab 
                    eventKey={'cinema'}
                    title="Cinema"
                />
                <Tab 
                    eventKey={'film'}
                    title="Film"
                />
                <Tab 
                    eventKey={'session'}
                    title="Session"
                />
            </Tabs>
        );
    }

    renderNav = () =>{
        let content = this.renderContent();
        return(
            <React.Fragment>
            {
                this.props.role === 'admin'
                ? this.renderAdminNav()
                : ''
            }
            {content}
            </React.Fragment>
        );
    }

    render(){
        return(
            <div className="body">
                {this.renderNav()}
            </div>
        );
    }
}