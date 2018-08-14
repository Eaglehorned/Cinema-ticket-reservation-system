import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Cinema from './Cinema/Cinema';
import Film from './Film/Film';
import Session from './Session/Session';

export default class Body extends Component{
    constructor(props){
        super(props);
        this.state={
            chosenOperation: 'cinema'
        }
        this.renderNav = this.renderNav.bind(this);
        this.handleSelectNav = this.handleSelectNav.bind(this);
        this.informWithMessage = this.informWithMessage.bind(this);
    }

    informWithMessage(message){
        this.props.callBackInformWithMessage(message);
    }

    handleSelectNav(eventKey){
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

    renderContent = () => {
        switch(this.state.chosenOperation){
            case 'cinema': 
                return this.renderCinemaContent();
            case 'film':
                return this.renderFilmContent();
            case 'session': 
                return this.renderSessionContent();
        }
    }

    renderNav(){
        let content = this.renderContent();
        return(
            <React.Fragment>
                {
                    //this.props.role === 'admin'
                    //?
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
                    //:''
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