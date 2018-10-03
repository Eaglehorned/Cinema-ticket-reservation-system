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

    getUniqueObjectsOfArray = (arr) =>{
        return arr.filter((el, index, array) => array.indexOf(el) === index);
    }

    parseQueryString = (queryString) =>{
        const query = {};
        const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i].split('=');
            query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        }
        return query;
    }
}

const applicationService = new ApplicationService();

export default applicationService;

