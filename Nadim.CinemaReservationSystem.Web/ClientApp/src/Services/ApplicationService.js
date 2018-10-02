import moment from 'moment';

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

    getNearestTimeSearchString = () =>{
        return this.convertFiltersToFilterString({
            startDate: moment().format('L'),
            endDate: moment().add(14, 'days').format('L')
        });
    }

    getFromTodayTimeSearchString = () =>{
        return this.convertFiltersToFilterString({
            startDate: moment().format('L')
        });
    }
}

const applicationService = new ApplicationService();

export default applicationService;

