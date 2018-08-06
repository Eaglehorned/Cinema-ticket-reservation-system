import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Cinema from './Cinema/Cinema';

export default class Body extends Component{
    constructor(props){
        super(props);
        this.state={
            chosenOperation: 'cinema'
        }
        this.renderNav = this.renderNav.bind(this);
        this.handleSelectNav = this.handleSelectNav.bind(this);
    }

    handleSelectNav(eventKey){
        this.setState({
            chosenOperation: eventKey
        });
    }

    renderNav(){
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
                >
                    <Cinema
                        token={this.props.token}
                    />
                </Tab>
                <Tab 
                    eventKey={'new'}
                    title="New"
                >
                    <React.Fragment></React.Fragment>
                </Tab>
            </Tabs>
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