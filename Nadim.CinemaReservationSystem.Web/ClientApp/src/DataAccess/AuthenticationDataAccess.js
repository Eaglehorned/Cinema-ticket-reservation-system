import authorizationService from '../Services/AuthorizationService';
import receivedDataProcessingHelper from '../Helper/ReceivedDataProcessingHelper';

const loginUserFetch = (userInfo) =>{
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

const registerUserFetch = (userInfo) =>{
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

const formUserInfo = (userInfo) =>{
    let role = getParameterFromJwt(
        'role', 
        parseJwt(userInfo.token)
    );
    let userId = getParameterFromJwt(
        'nameidentifier', 
        parseJwt(userInfo.token)
    );
    return({
        username: userInfo.fullUserName,
        token: userInfo.token,
        role: role,
        userId: userId
    });
}

const parseJwt = (token) =>{
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

const getParameterFromJwt = (parameter, parsedJwtToken) =>{
    for (let key in parsedJwtToken){
        if (key.indexOf(parameter) !== -1){
            return parsedJwtToken[key];
        }
    }
}

const completeUserInfoWithoutUsername = (almostCompleteUserInfo, username) =>{
    let temp = almostCompleteUserInfo;
    temp.fullUserName = username;
    return temp;
}

class AuthenticationDataAccess{  
    loginUser = (userInfo) =>{
        return loginUserFetch(userInfo)  
        .then(receivedDataProcessingHelper.handleRequstError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(formUserInfo)
        .then(user => authorizationService.setInfo(user.username, user.token, user.role, user.userId));
    }

    registerUser = (userInfo) =>{
        return registerUserFetch(userInfo)
        .then(receivedDataProcessingHelper.handleRequstError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(parsedJson => completeUserInfoWithoutUsername(parsedJson, userInfo.userName))
        .then(formUserInfo)
        .then(user => authorizationService.setInfo(user.username, user.token, user.role, user.userId));
    }
}

const authenticationDataAccess = new AuthenticationDataAccess();

export default authenticationDataAccess;