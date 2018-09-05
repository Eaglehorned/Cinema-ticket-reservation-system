import authenticationDataAccess from '../DataAccess/AuthenticationDataAccess';

class AuthenticationService{
    validateEmail = (email) =>{
        const result = /^([\w-.]+)@((\[[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return result.test(String(email).toLowerCase());
    }

    loginUser = (userInfo) =>{
        return authenticationDataAccess.loginUser(userInfo);
    }

    registerUser = (userInfo) =>{
        return authenticationDataAccess.registerUser(userInfo);
    }

    allowRegisterClick = (email, password, lastName, firstName) =>{
        return authenticationService.validateEmail(email) && password && lastName && firstName;
    }

    allowLoginClick = (email, password) =>{
        return authenticationService.validateEmail(email) && password;
    }
}

const authenticationService = new AuthenticationService();

export default authenticationService;