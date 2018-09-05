var informWithMessage = undefined;

class ApplicationService{
    setInformWithMessage = (_informWithMessage) =>{
        informWithMessage = _informWithMessage;
    }

    informWithMessage = (message) =>{
        informWithMessage(message);
    }

    informWithErrorMessage = (error) =>{
        informWithMessage({ 
            text: error.message,
            isError: true
        });
    }
}

const applicationService = new ApplicationService();

export default applicationService;

