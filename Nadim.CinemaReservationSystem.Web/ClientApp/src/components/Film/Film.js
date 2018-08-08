import React, { Component } from 'react';
import FormFilm from './FormFilm';
import { Button } from 'react-bootstrap';
import FilmDisplayInfoBox from './FilmDisplayInfoBox';

export default class Film extends Component{
    displayName = Film.displayName;
    
    constructor(props){
        super(props);
        this.state={
            filmList:[],
            chosenOperation: ''
        }
        this.informWithMessage = this.informWithMessage.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.renderActionsContent = this.renderActionsContent.bind(this);
        this.createFilm = this.createFilm.bind(this);
        this.getFilmList = this.getFilmList.bind(this);

        this.getFilmList();
    }

    informWithMessage(message){
        this.props.callBackInformWithMessage(message);
    }

    getFilmList(){
        fetch('api/films', {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            }
        }).then(response => {
            if (response.ok){
                return response.json();
            }
            if (response.status === 401){
                throw new Error('You need to authorize to do that action.');
            }
            if (response.status === 404){
                    throw new Error('Cant find resourse.');
            }
        }).then(parsedJson => {
                this.setState({
                    filmList: parsedJson.filmList,
                });
            })
            .catch(error => this.informWithMessage(
                { 
                    text: error.message,
                    isError: true
                })
            );
    }

    getFilm(){}

    createFilm(receivedFilmInfo){
        this.setState({
            chosenOperation: ''
        });
        fetch('api/films', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${this.props.token}`
            },
            body: JSON.stringify(receivedFilmInfo)
        }).then(response => {
                if (response.ok){
                    return response;
                }
                if (response.status === 400){
                    return response.json().then((err) => {
                        throw new Error(`Bad request. ${err.details}`);
                    });
                }
                if (response.status === 401){
                    throw new Error('You need to authorize to do that action. ');
                }
                if (response.status === 404){
                        throw new Error('Cant find resourse. ');
                }
            }).then(response => {
                    this.setState({
                        filmList: this.state.filmList.concat({
                            name: receivedFilmInfo.name,
                            filmId: response.headers.get('location').substring(response.headers.get('location').lastIndexOf('/') + 1, response.headers.get('location').length)
                        })
                    })
                })
                .catch(error => {
                    this.informWithMessage(
                    { 
                        text: error.message,
                        isError: true
                    });
                });
    }

    editFilm(){}

    renderActionsContent(){
        return(
            <React.Fragment>
                    {
                        this.state.filmList.map((el)=>
                            <FilmDisplayInfoBox
                                key={el.filmId}
                                filmInfo={el}
                                //callBackEditFilm={}
                            />
                        )
                    }
                <Button
                    bsStyle="primary"
                    onClick={ () => this.setState({ chosenOperation: 'createFilm' })}
                >
                    Create film
                </Button>
            </React.Fragment>
        );
    }

    renderContent(){
        switch(this.state.chosenOperation){
            case 'createFilm':
                return( 
                    <FormFilm
                        callBackReceiveFilmInfo={this.createFilm}
                    />
                );
            case 'editFilm': 
                return;
            default:    
                return this.renderActionsContent();
        }
    }

    render(){
        const content = this.renderContent();
        return(
            <div className="add-cinema-container">
                <div className="well">
                    {content}
                </div>
            </div>
        );
    }
}