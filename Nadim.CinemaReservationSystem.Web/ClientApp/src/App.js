import React, { Component } from 'react';
import applicationService from './Services/ApplicationService';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import MyAlert from './components/MyAlert';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Footer from './components/Footer/Footer';

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
                    <Route path="/" component={Header}/>
                    <Route path="/" component={Body}/>
                    <Route path="/(reservation|sessions|film)" component={Footer}/>
                </React.Fragment>
            </Router>
        );
    }
}
