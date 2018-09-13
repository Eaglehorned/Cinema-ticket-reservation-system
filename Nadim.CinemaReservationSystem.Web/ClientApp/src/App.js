import React, { Component } from 'react';
import applicationService from './Services/ApplicationService';
import Header from './components/Header';
import Body from './components/Body';
import MyAlert from './components/MyAlert';
import { BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component {
    displayName = App.name

    constructor(){
        super();
        this.state={
            show: false,
            infoMessage:'',
            alertStyle:'info'
        }
        applicationService.setInformWithMessage(this.informWithMessage);
    }

    setShownRole = (role) =>{
        this.setState({
            shownRole: role
        })
    }

    informWithMessage = (message) =>{
        if (message.isError){
            this.setState({
                show: true,
                infoMessage: message.text,
                alertStyle: 'danger'
            });
        }
        else {
            this.setState({
                show: true,
                infoMessage: message,
                alertStyle: 'success'
            });
        }
        const self = this;
        setTimeout(() => 
            self.setState({
                show: false,
                infoMessage:''
            }),4000);
    }

    renderAlertMessage = () =>{
        return(
            <MyAlert
                alertStyle={this.state.alertStyle}
                infoMessage={this.state.infoMessage}
                callbackOnDismiss={() => this.setState({show: false})}
            />
        )
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    <div className="font-x-large">
                        {this.state.show ? 
                            this.renderAlertMessage() :
                            ''
                        }
                    </div>
                    <Route component={()=> (
                        <Header
                            callBackSetShownRole={this.setShownRole}
                        />
                    )}/>
                    <Route component={()=>(
                        <Body
                            role={this.state.shownRole}
                        />
                    )}/>
                </React.Fragment>
            </Router>
        );
    }
}
