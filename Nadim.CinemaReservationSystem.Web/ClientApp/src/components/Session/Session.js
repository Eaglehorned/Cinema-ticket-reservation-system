import React, { Component } from 'react';
import FormSession from './FormSession';
import { Button } from 'react-bootstrap';

export default class Session extends Component{
    displayName = Session.displayName;
    constructor(props){
        super(props);
        this.state={
            chosenAction:''
        }
    }

    informWithMessage = (message) => {
        this.props.callBackInformWithMessage(message);
    }

    createSession = (receivedSessionInfo) =>{
        console.log(receivedSessionInfo);
        fetch('api/sessions', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            },
            body: JSON.stringify(receivedSessionInfo)
        })
        .then(response => {
            if (response.ok){
                return response;
            }
            if (response.status === 400){
                return response.json().then((err) => {
                    throw new Error(`Bad request. ${err.details}`);
                });
            }
            if (response.status === 401){
                throw new Error('You need to authorize to do that action.');
            }
            if (response.status === 404){
                return response.json().then((err) => {
                    throw new Error(`Not found. ${err.details}`);
                });
            }
        })
        .then(response => {
            //TODO add to list
            // this.setState({
            //     filmList: this.state.filmList.concat({
            //         name: receivedSessionInfo.name,
            //         filmId: response.headers.get('location').substring(response.headers.get('location').lastIndexOf('/') + 1, response.headers.get('location').length)
            //     })
            // });
            this.informWithMessage('Session created.');
        })
        .catch(error => {
            this.informWithMessage(
            { 
                text: error.message,
                isError: true
            });
        });
    }

    renderActionsContent(){
        return(
            <React.Fragment>
                <h1>Session list</h1>
                {/* <div className="list-container">
                    {
                        this.state.filmList.map((el)=>
                            <FilmDisplayInfoBox
                                key={el.filmId}
                                filmInfo={el}
                                callBackEditFilm={this.getFilm}
                            />
                        )
                    } */}
                <Button
                    bsStyle="primary"
                    onClick={ () => this.setState({ chosenOperation: 'createSession' })}
                >
                    Create session
                </Button>
                {/* </div> */}
            </React.Fragment>
        );
    }

    renderContent = () =>{
        switch(this.state.chosenOperation){
            case 'createSession':
                return( 
                    <FormSession
                        callBackInformWithMessage={this.informWithMessage}
                        token={this.props.token}
                        callBackReceiveSessionInfo={this.createSession}
                    />
                );
            case 'editSessionLoading': 
                return(
                    <div className="font-x-large font-italic">
                        Loading...
                    </div>
                );
            case 'editSession': 
                return;
            default:    
                return this.renderActionsContent();
        }
    }

    render(){
        let content = this.renderContent();
        return(
            <div className="content-container">
                <div className="well">
                    {content}
                </div>
            </div>
        );
    }
}