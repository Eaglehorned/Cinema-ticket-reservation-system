import React, {Component} from 'react';
import { ButtonToolbar, DropdownButton, MenuItem, Button, Nav} from 'react-bootstrap';
import EditCinemaGeneralInfo from './EditCinemaGeneralInfo';
import '../../styles/EditCinemaInfo.css';

export default class EditCinemaInfo extends Component{
    displayName = EditCinemaInfo.displayName;

    constructor(props){
        super(props);
        this.state={
            cinemaList: [],
            error: '',
            isCinemaChosen: false,
            choosenCinema: '',
            editComponentChosen:''
        }
        this.renderChooseCinemaContent = this.renderChooseCinemaContent.bind(this);
        this.renderCinemaEditContent = this.renderCinemaEditContent.bind(this);
        this.renderChooseCinemaContent = this.renderChooseCinemaContent.bind(this);
        this.getCinemaList = this.getCinemaList.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmitCinemaChoise = this.handleSubmitCinemaChoise.bind(this);
        this.handleEditGeneralCinemaInfoClick = this.handleEditGeneralCinemaInfoClick.bind(this);
        this.ChangeCinemaInfo = this.ChangeCinemaInfo.bind(this);
        this.CancelEditingCinemaInfo = this.CancelEditingCinemaInfo.bind(this);

        this.getCinemaList();
    }

    getCinemaList(){
        fetch('api/Cinema/GetCinemaList', {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + this.props.token,
            }
        }).then(response => response.json())
            .then(parsedJson => {
                if (parsedJson.resultOk){
                    this.setState({
                        cinemaList: parsedJson.cinemaList,
                    });
                }
                else {
                    this.setState({
                        error: parsedJson.details,
                    });
                    let self = this;
                    setTimeout(()=>{
                        self.setState({
                            error: ''
                        })
                    }, 5000);
                }
            })
    }

    ChangeCinemaInfo(receivedCinemaInfo){
        receivedCinemaInfo["name"] = this.state.choosenCinema;
        this.props.callBackEditCinemaInfo({
            receivedCinemaInfo,
        });
    }

    CancelEditingCinemaInfo(){
        this.setState({
            editComponentChosen:'',
        })
    }

    handleSelect(eventKey){
        this.setState({
            choosenCinema: this.state.cinemaList[eventKey],
        })
    }

    handleSubmitCinemaChoise(){
        if (this.state.choosenCinema){
            this.setState({
                isCinemaChosen: true,
            })
        }
    }

    handleEditGeneralCinemaInfoClick(){
        this.setState({
            editComponentChosen: 'editInfo',
        })
    }

    renderEditGeneralCinemaInfoContent(){
        return(
            <div>
                <EditCinemaGeneralInfo
                    callBackChangeInfo={this.ChangeCinemaInfo}
                    callBackCancelCinemaInfoInput={this.CancelEditingCinemaInfo}
                />
            </div>
        )
    }

    renderDeleteCinemaRoomContent(){}

    renderDeleteCinemaContent(){}

    renderCinemaEditContent(){
        let content;
        if(!this.state.editComponentChosen){
            content = '';
        }
        if(this.state.editComponentChosen === 'editInfo'){
            content = this.renderEditGeneralCinemaInfoContent();
        }
        if(this.state.editComponentChosen === 'deleteCinemaRoom'){
            content = this.renderDeleteCinemaRoomContent();
        }
        if(this.state.editComponentChosen == 'deleteCinemaRoom'){
            content = this.renderDeleteCinemaContent();
        }

        return(
            <div className="well">
                <div>
                    <Button
                        bsStyle="default"
                        onClick={this.handleEditGeneralCinemaInfoClick}
                    >
                        Edit info
                    </Button>
                </div>
                <div>
                    <Button
                        bsStyle="default"
                        //onClick={}
                    >
                        Add cinema room
                    </Button>
                </div>
                <div>
                    <Button
                        bsStyle="default"
                        //onClick={}
                    >
                        Delete cinema room
                    </Button>
                </div>
                <div>
                    <Button
                        bsStyle="danger"
                        //onClick={}
                    >
                        Delete cinema
                    </Button>
                </div>
                {content}
            </div>
        )
    }

    renderChooseCinemaContent(){
        return(
            <div>
                <DropdownButton
                    bsStyle="default"
                    title="Choose cinema"
                    id="choose-cinema-to-edit"
                >
                {
                    this.state.cinemaList.map((el, i)=>
                        <MenuItem 
                            eventKey={i}
                            onSelect={this.handleSelect}
                            key={i}
                        >
                            {el}
                        </MenuItem>
                )}
                </DropdownButton>
                <Button
                    bsStyle="Default"
                    onClick={this.handleSubmitCinemaChoise}
                >
                    Submit
                </Button>
            </div>
        )
    }

    render(){
        let content = this.state.isCinemaChosen && this.state.cinemaList ? 
            this.renderCinemaEditContent() : 
            this.renderChooseCinemaContent();
        return(
            <div className="edit-cinema-info-container">
                <h1>Edit cinema information</h1>
                <h3>
                {
                    this.state.choosenCinema ? 
                    `Chosen cinema : ${this.state.choosenCinema}` :
                    ''
                }
                </h3>
                <h3 className="error-text">
                    {this.state.error}
                </h3>
                {content}
            </div>
        )
    }
}