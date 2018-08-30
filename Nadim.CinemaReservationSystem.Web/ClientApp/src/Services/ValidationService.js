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

    static validateIntNumber = (number) =>{
        const result = /^\d+$/;
        return result.test(String(number));
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

    static showIsDurationValid = (showHint, duration) =>{
        return !showHint || ValidationService.validateDuration(duration);
    }
}