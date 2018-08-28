export default class AuthenticationDataAccess{
    static loginUser = (userInfo) =>{
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
        })        
        .then(AuthenticationDataAccess.handleRequstError)
        .then(AuthenticationDataAccess.formUserInfo);
    }

    static registerUser = (userInfo) =>{
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
        })
        .then(AuthenticationDataAccess.handleRequstError)
        .then(parsedJson => AuthenticationDataAccess.completeUserInfoWithoutUsername(parsedJson, userInfo.userName))
        .then(AuthenticationDataAccess.formUserInfo);
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