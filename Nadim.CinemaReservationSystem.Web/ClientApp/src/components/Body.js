import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Cinema from './Cinema/Cinema';
import Film from './Film/Film';

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

    renderNav(){
        return(
            <React.Fragment>
                {
                    this.props.role === 'admin'
                    ?
                    <Tabs
                        justified
                        activeKey={this.state.chosenOperation}
                        onSelect={key => this.handleSelectNav(key)}
                        id="select_operation"
                    >
                        <Tab 
                            eventKey={'cinema'}
                            title="Cinema"
                        >
                            <Cinema
                                token={this.props.token}
                                callBackInformWithMessage={this.informWithMessage}
                            />
                        </Tab>
                        <Tab 
                            eventKey={'film'}
                            title="Film"
                        >
                            <Film
                                token={this.props.token}
                                callBackInformWithMessage={this.informWithMessage}
                            />
                        </Tab>
                    </Tabs>
                    :''
                }
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