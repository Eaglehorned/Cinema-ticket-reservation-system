import TokenService from '../Services/TokenService';

export default class AuthenticationDataAccess{
    
    static loginUser = (userInfo) =>{
        return AuthenticationDataAccess.loginUserFetch(userInfo)  
        .then(AuthenticationDataAccess.handleRequstError)
        .then(AuthenticationDataAccess.formUserInfo)
        .then(AuthenticationDataAccess.setToken);
    }

    static registerUser = (userInfo) =>{
        return AuthenticationDataAccess.registerUserFetch(userInfo)
        .then(AuthenticationDataAccess.handleRequstError)
        .then(parsedJson => AuthenticationDataAccess.completeUserInfoWithoutUsername(parsedJson, userInfo.userName))
        .then(AuthenticationDataAccess.formUserInfo)
        .then(AuthenticationDataAccess.setToken);
    }

    static loginUserFetch = (userInfo) =>{
        return fetch('api/Authentication/Login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email: userInfo.email,
                Password: userInfo.password,
            })
        });
    }

    static registerUserFetch = (userInfo) =>{
        return fetch('api/Authentication/Register', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email: userInfo.email,
                Password: userInfo.password,
                FirstName: userInfo.firstName,
                LastName: userInfo.lastName,
                Username: userInfo.userName,
            })
        });
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

    static formUserInfo = (userInfo) =>{
        let role = AuthenticationDataAccess.getParameterFromJwt(
            'role', 
            AuthenticationDataAccess.parseJwt(userInfo.token)
        );
        let userId = AuthenticationDataAccess.getParameterFromJwt(
            'nameidentifier', 
            AuthenticationDataAccess.parseJwt(userInfo.token)
        );
        return({
            username: userInfo.fullUserName,
            token: userInfo.token,
            role: role,
            userId: userId
        });
    }

    static setToken = (userInfo) =>{
        TokenService.setToken(userInfo.token);
        return userInfo;
    }

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

    static completeUserInfoWithoutUsername = (almostCompleteUserInfo, username) =>{
        let temp = almostCompleteUserInfo;
        temp.fullUserName = username;
        return temp;
    }
}