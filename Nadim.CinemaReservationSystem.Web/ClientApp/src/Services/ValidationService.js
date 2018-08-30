export default class ValidationService{

    static showIsStringValid(showHint, str){
        return !showHint || this.validateString(str);
    }

    static intValidationErrorMessage(showHint, number){
        if (showHint){
            return number
            ? (this.validateIntNumber(number)
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
}