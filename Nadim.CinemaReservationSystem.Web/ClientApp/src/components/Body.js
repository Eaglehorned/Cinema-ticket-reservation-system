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

        switch(this.state.chosenOperation){
            case 'cinema': 
                return <Cinema/>;
            case 'film':
                return <Film/>;
            case 'session': 
                return <Session/>;
            case 'reservation':
                return <Reservation/>;
            default: 
                return '';
        }
    }

    renderAdminNav = () =>{
        return(
            <div className="body-nav-menu">
                {/* <ul>
                    <li> */}
                        <Link to="/cinema" className="link-box">Cinema</Link>
                    {/* </li>
                    <li> */}
                        <Link to="/film" className="link-box">Film</Link>
                    {/* </li>
                    <li> */}
                        <Link to="/session" className="link-box">Session</Link>
                    {/* </li>
                </ul> */}
            </div>
            // <Tabs
            //     justified
            //     activeKey={this.state.chosenOperation}
            //     onSelect={key => this.handleSelectNav(key)}
            //     id="select_operation"
            // >
            //     <Tab
            //         eventKey={'cinema'}
            //         href="https://www.google.com"
            //         title={<Link to="/cinema">Cinema</Link>}
            //     />
            //     <Tab 
            //         eventKey={'film'}
            //         title={<Link to="/film">Film</Link>}
            //     />
            //     <Tab 
            //         eventKey={'session'}
            //         title={<Link to="/session">Session</Link>}
            //     />
            // </Tabs>
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