import React, { Component } from 'react';

export default class ReserveTicket extends Component{
    displayName = ReserveTicket.displayName;

    constructor(props){
        super(props);
        this.state={
            seatsChosen: false,
            chosenSeats: []
        }
    }

    renderChooseSeatsContent(){
        return ;//chooseSeatsComponent
    }

    renderConfirmContent(){
        return ;
    }
    
    renderContent = () =>{
        if (!seatsChosen){
            return this.renderChooseSeatsContent();
        }
        else{
            return this.renderConfirmContent();
        }
    }

    render(){
        const content = this.renderContent();
        return(
            <div>
                <div className="inline-information-block">
                    <div className="header-string-box">
                        {this.props.session.info.film.name}
                    </div>
                    <div className="information-block">
                        {this.props.session.info.cinema.city},{' '}
                        {this.props.session.info.cinema.name}
                    </div>
                    <div className="information-block">
                        {this.props.session.info.beginTime.toLocaleString()}
                    </div>
                </div>
                {content}
            </div>
        );
    }
}