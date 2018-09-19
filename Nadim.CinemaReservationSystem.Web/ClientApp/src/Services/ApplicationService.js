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
    
    convertFiltersToFilterString = (filters) =>{
        let filterString = '';
        for (let prop in filters){
            if(filters[prop]){ 
                if (filterString === ''){
                    filterString = `?${prop}=${filters[prop]}`;
                }
                else{
                    filterString = filterString.concat(`&${prop}=${filters[prop]}`);
                }
            }
        }
        
        return filterString;
    }
}

const applicationService = new ApplicationService();

export default applicationService;

