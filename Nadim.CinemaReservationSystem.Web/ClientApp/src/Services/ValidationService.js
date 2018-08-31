import moment from 'moment';

export default class ValidationService{

    static showIsStringValid(showHint, str){
        return !showHint || ValidationService.validateString(str);
    }

    static intValidationErrorMessage(showHint, number){
        if (showHint){
            return number
            ? (ValidationService.validateIntNumber(number)
                ? ''
                :'Data not valid'
            )
            : 'Data not entered';
        }
        else{
            return '';
        }
    }

    static doubleValidationErrorMessage(showHint, number){
        if (showHint){
            return number
            ?(ValidationService.validateDoubleNumber(number)
                ? ''
                :'Data not valid'
            )
            : 'Data not entered'
        }
        else{
            return '';
        }
    }

    static validateIntNumber = (number) =>{
        const result = /^\d+$/;
        return result.test(String(number));
    }

    static validateDoubleNumber(number){
        const result = /^\d+([.,]\d+)?$/;
        return result.test(String(number));
    }

    static showIsDoubleNumberValid = (showHint, number) =>{
        return !showHint || ValidationService.validateDoubleNumber(number);
    }

    static validateString = (str) =>{
        return str;
    }

    static validateStartAndEndDates = (startDate, endDate) =>{
        return endDate.isAfter(startDate);
    }

    static showIsStartAndEndDatesValid = (showHint, startDate, endDate) =>{
        return !showHint || ValidationService.validateStartAndEndDates(startDate, endDate);
    }

    static validateDuration = (duration) =>{
        return duration.hours() !== 0
        || duration.minutes() !== 0
        || duration.seconds() !== 0;
    }

    static validateFutureDate = (date) =>{
        return date && date.format("YYYY-MM-DD") > moment().format("YYYY-MM-DD");
    }

    static showIsDurationValid = (showHint, duration) =>{
        return !showHint || ValidationService.validateDuration(duration);
    }

    static validateSeatTypePricesList = (seatTypes) =>{
        let result = true;
        seatTypes.forEach(el => result = result && ValidationService.validateDoubleNumber(el.price));
        return result;
    }

    static showIsFutureDateValid = (showHint, date) =>{
        return !showHint || ValidationService.validateFutureDate(date);
    }

    static futureDateValidationErrorMessage = (showHint, date) =>{
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

    static showIsTimeValid = (showHint, time) =>{
        return !showHint || ValidationService.validateTime(time);
    }

    static validateTime = (time) =>{
        return time;
    }
}