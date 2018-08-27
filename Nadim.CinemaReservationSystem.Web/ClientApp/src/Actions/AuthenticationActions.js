import AuthenticationService from '../Services/AuthenticationService';

export default class AuthenticationActions{

    static parseJwt = (token) =>{
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    static getParameterFromJwt = (parameter, parsedJwtToken) =>{
        for (let key in parsedJwtToken){
            if (key.indexOf(parameter) !== -1){
                return parsedJwtToken[key];
            }
        }
    }

    static validateEmail = (email) =>{
        const result = /^([\w-.]+)@((\[[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return result.test(String(email).toLowerCase());
    }

    static formUserInfo = (userInfo) =>{
        console.log(userInfo);
        let role = AuthenticationActions.getParameterFromJwt(
            'role', 
            AuthenticationActions.parseJwt(userInfo.token)
        );
        let userId = AuthenticationActions.getParameterFromJwt(
            'nameidentifier', 
            AuthenticationActions.parseJwt(userInfo.token)
        );
        return({
            username: userInfo.fullUserName,
            token: userInfo.token,
            role: role,
            userId: userId
        });
    }

    static completeUserInfoWithoutUsername = (almostCompleteUserInfo, username) =>{
        let temp = almostCompleteUserInfo;
        temp.fullUserName = username;
        return temp;
    }

    static loginUser = (userInfo) =>{
        return AuthenticationService.loginUser(userInfo)
        .then(AuthenticationActions.handleRequstError)
        .then(AuthenticationActions.formUserInfo);
    }

    static registerUser = (userInfo) =>{
        return AuthenticationService.registerUser(userInfo)
        .then(AuthenticationActions.handleRequstError)
        //here dont work
        .then(parsedJson =>
            AuthenticationService.completeUserInfoWithoutUsername(
            parsedJson,
            userInfo.username
        ))
        .then(AuthenticationActions.formUserInfo);
    }

    static handleRequstError = (response) =>{
        if (response.ok){
            return response.json();
        }
        else{
            return response.json().then(error =>{
                throw new Error(error.details);
            });
        }
    }
}