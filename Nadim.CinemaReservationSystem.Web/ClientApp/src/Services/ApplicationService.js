export default class ApplicationService{
    static informWithMessage;

    static setInformWithMessage = (informWithMessage) =>{
        this.informWithMessage = informWithMessage;
    }

    static informWithMessage = (message) =>{
        this.informWithMessage(message);
    }

    static informWithErrorMessage = (error) =>{
        this.informWithMessage({ 
            text: error.message,
            isError: true
        });
    }
}