import moment from 'moment';

class ValidationService{

    showIsStringValid(showHint, str){
        return !showHint || validationService.validateString(str);
    }

    intValidationErrorMessage(showHint, number){
        if (showHint){
            return number
            ? (validationService.validateIntNumber(number)
                ? ''
                :'Data not valid'
            )
            : 'Data not entered';
        }
        else{
            return '';
        }
    }

    doubleValidationErrorMessage(showHint, number){
        if (showHint){
            return number
            ?(validationService.validateDoubleNumber(number)
                ? ''
                :'Data not valid'
            )
            : 'Data not entered'
        }
        else{
            return '';
        }
    }

    validateIntNumber = (number) =>{
        const result = /^\d+$/;
        return result.test(String(number));
    }

    validateDoubleNumber(number){
        const result = /^\d+([.,]\d+)?$/;
        return result.test(String(number));
    }

    showIsDoubleNumberValid = (showHint, number) =>{
        return !showHint || validationService.validateDoubleNumber(number);
    }

    validateString = (str) =>{
        return str;
    }

    validateStartAndEndDates = (startDate, endDate) =>{
        return endDate.isAfter(startDate);
    }

    showIsStartAndEndDatesValid = (showHint, startDate, endDate) =>{
        return !showHint || validationService.validateStartAndEndDates(startDate, endDate);
    }

    validateDuration = (duration) =>{
        return duration.hours() !== 0
        || duration.minutes() !== 0
        || duration.seconds() !== 0;
    }

    validateFutureDate = (date) =>{
        return date && date.format("YYYY-MM-DD") > moment().format("YYYY-MM-DD");
    }

    showIsDurationValid = (showHint, duration) =>{
        return !showHint || validationService.validateDuration(duration);
    }

    validateSeatTypePricesList = (seatTypes) =>{
        let result = true;
        seatTypes.forEach(el => result = result && validationService.validateDoubleNumber(el.price));
        return result;
    }

    showIsFutureDateValid = (showHint, date) =>{
        return !showHint || validationService.validateFutureDate(date);
    }

    futureDateValidationErrorMessage = (showHint, date) =>{
        if (showHint){
            if (!date){
                return 'Begin time not entered.';
            }
            if (date.format("YYYY-MM-DD") <= moment().format("YYYY-MM-DD")){
                return 'Begin date cant be today or in the past.';
            }
        }
        return '';
    }

    showIsTimeValid = (showHint, time) =>{
        return !showHint || validationService.validateTime(time);
    }

    validateTime = (time) =>{
        return time;
    }
}

const validationService = new ValidationService();

export default validationService;