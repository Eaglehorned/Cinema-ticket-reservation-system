import React, { Component } from 'react';
import Cinema from './Cinema/Cinema';

export default class Body extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div className="body">
                <Cinema
                    token={this.props.token}
                />
            </div>
        );
    }
}