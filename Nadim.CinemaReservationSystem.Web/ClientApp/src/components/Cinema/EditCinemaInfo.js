import React, {Component} from 'react';
import { DropdownButton, MenuItem, Button, Nav} from 'react-bootstrap';
import FormGeneralCinemaInfo from './FormGeneralCinemaInfo';
import FormCinemaRooms from './FormCinemaRooms';
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
            editComponentChosen:'',
            params: ['City', 'Name', 'Price', 'Cinema rooms'],
            chosenParamToEditDisplayString: '',
            chosenParamsToEdit: {},
            isParamChosen: false,
            needToFormCinemaRooms: false,
            cinemaRoomsCount: 0,
            versionsOfChoosedParams:[
                {
                    city: true,
                    name: false,
                    cinemaRoomsCount: false,
                    defaultSeatPrice: false,
                    vipSeatPrice: false,
                },
                {
                    city: false,
                    name: true,
                    cinemaRoomsCount: false,
                    defaultSeatPrice: false,
                    vipSeatPrice: false,
                },
                {
                    city: false,
                    name: false,
                    cinemaRoomsCount: false,
                    defaultSeatPrice: true,
                    vipSeatPrice: true,
                },
                {
                    city: false,
                    name: false,
                    cinemaRoomsCount: true,
                    defaultSeatPrice: false,
                    vipSeatPrice: false,
                }
            ]
            
        }
        this.renderChooseCinemaContent = this.renderChooseCinemaContent.bind(this);
        this.renderCinemaEditContent = this.renderCinemaEditContent.bind(this);
        this.getCinemaList = this.getCinemaList.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmitCinemaChoise = this.handleSubmitCinemaChoise.bind(this);
        this.receiveCinemaGeneralInfo = this.receiveCinemaGeneralInfo.bind(this);
        this.handleSubmitParamChoise = this.handleSubmitParamChoise.bind(this);
        this.handleSelectParam = this.handleSelectParam.bind(this);
        this.renderEditComponentContent = this.renderEditComponentContent.bind(this);
        this.renderChooseParamToEditContent = this.renderChooseParamToEditContent.bind(this);
        this.receiveCinemaRoomsInfo = this.receiveCinemaRoomsInfo.bind(this);
        this.handleCanceltCinemaChoise = this.handleCanceltCinemaChoise.bind(this);
        this.handleCancelParamChoise = this.handleCancelParamChoise.bind(this);
        this.handleCancelGeneralCinemaInfoInput = this.handleCancelGeneralCinemaInfoInput.bind(this);
        this.cancelCinemaRoomsInfoInput = this.cancelCinemaRoomsInfoInput.bind(this);

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

    receiveCinemaGeneralInfo(receivedCinemaInfo){
        if (isNaN(receivedCinemaInfo.cinemaRoomsCount)){
            let cinemaInfoToSend = receivedCinemaInfo;
            delete cinemaInfoToSend["cinemaRoomsCount"];
            let tempNewName = receivedCinemaInfo.name;
            cinemaInfoToSend.name = this.state.choosenCinema;
            cinemaInfoToSend.vipSeatPrice = cinemaInfoToSend.vipSeatPrice ? cinemaInfoToSend.vipSeatPrice : 0;
            cinemaInfoToSend.defaultSeatPrice = cinemaInfoToSend.defaultSeatPrice ? cinemaInfoToSend.defaultSeatPrice : 0;
            cinemaInfoToSend["newName"] = tempNewName;
            console.log(cinemaInfoToSend);
            this.props.callBackEditCinemaInfo({
                ...cinemaInfoToSend,
            });
        }
        else {
            this.setState({
                needToFormCinemaRooms: true,
                cinemaRoomsCount: receivedCinemaInfo.cinemaRoomsCount,
            })
        }
    }

    receiveCinemaRoomsInfo(receivedCinemaInfo){
        this.props.callBackEditCinemaInfo({
            "cinemaRooms": receivedCinemaInfo,
            "name": this.state.choosenCinema,
        })
    }

    handleSelect(eventKey){
        this.setState({
            choosenCinema: this.state.cinemaList[eventKey],
        })
    }

    handleSelectParam(eventKey){
        this.setState({
            chosenParamsToEdit: this.state.versionsOfChoosedParams[eventKey],
            chosenParamToEditDisplayString: this.state.params[eventKey],
        })
    }

    handleSubmitCinemaChoise(){
        if (this.state.choosenCinema){
            this.setState({
                isCinemaChosen: true,
            })
        }
    }

    handleSubmitParamChoise(){
        if (this.state.chosenParamsToEdit){
            this.setState({
                isParamChosen: true,
            })
        }
    }

    handleCanceltCinemaChoise(){
        this.props.callBackCancelCinemaInfoInput();
    }

    handleCancelParamChoise(){
        this.setState({
            chosenParamsToEdit: {},
            chosenParamToEditDisplayString: '',
            isCinemaChosen: false,
        })
    }

    handleCancelGeneralCinemaInfoInput(){
        this.setState({
            isParamChosen: false,
        })
    }

    cancelCinemaRoomsInfoInput(){
        this.setState({
            needToFormCinemaRooms: false,
        })
    }

    renderChooseParamToEditContent(){
        return(
            <div>
                <h3>
                    Choose what you want to edit
                </h3>
                <h3>
                {
                    this.state.chosenParamToEditDisplayString ? 
                    `Parameter : ${this.state.chosenParamToEditDisplayString}` :
                    ''
                }
                </h3>
                <DropdownButton
                    bsStyle="default"
                    title="Parameter"
                    id="choose-cinema-to-edit"
                >
                {
                    this.state.params.map((el, i)=>
                        <MenuItem 
                            eventKey={i}
                            onSelect={this.handleSelectParam}
                            key={i}
                        >
                            {el}
                        </MenuItem>
                )}
                </DropdownButton>
                <div>
                    <Button
                        bsStyle="primary"
                        onClick={this.handleSubmitParamChoise}
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={this.handleCancelParamChoise}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        );
    }

    renderEditComponentContent(){
        let content = this.state.needToFormCinemaRooms ? 
            <FormCinemaRooms
                cinemaRoomsCount={this.state.cinemaRoomsCount}
                callBackReceiveCinemaRoomsInfo={this.receiveCinemaRoomsInfo}
                callBackCancelCinemaRoomsInfoInput={this.cancelCinemaRoomsInfoInput}
            /> : 
            <FormGeneralCinemaInfo 
                callBackFromParent={this.receiveCinemaGeneralInfo}
                callBackCancelGeneralCinemaInfoInput={this.handleCancelGeneralCinemaInfoInput}
                displayedComponents={this.state.chosenParamsToEdit}
            />;
        return (
            <div>
                {content}
            </div>
        )
    }

    renderCinemaEditContent(){
        let content = this.state.isParamChosen ? 
                        this.renderEditComponentContent() :
                        this.renderChooseParamToEditContent(); 

        return(
            <div>
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
                <div>
                    <Button
                        bsStyle="primary"
                        onClick={this.handleSubmitCinemaChoise}
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={this.handleCanceltCinemaChoise}
                    >
                        Cancel
                    </Button>
                </div>
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