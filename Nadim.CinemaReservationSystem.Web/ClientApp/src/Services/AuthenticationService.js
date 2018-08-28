import AuthenticationDataAccess from '../DataAccess/AuthenticationDataAccess';

export default class AuthenticationService{
    static validateEmail = (email) =>{
        const result = /^([\w-.]+)@((\[[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return result.test(String(email).toLowerCase());
    }

    static loginUser = (userInfo) =>{
        return AuthenticationDataAccess.loginUser(userInfo);
    }

    static registerUser = (userInfo) =>{
        return AuthenticationDataAccess.registerUser(userInfo);
    }

    static allowRegisterClick = (email, password, lastName, firstName) =>{
        return AuthenticationService.validateEmail(email) && password && lastName && firstName;
    }

    static allowLoginClick = (email, password) =>{
        return AuthenticationService.validateEmail(email) && password;
    }
}