import receivedDataProcessingHelper from '../Helper/ReceivedDataProcessingHelper';

const sendRequestToLoginUser = (userInfo) =>{
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

const sendRequestToRegisterUser = (userInfo) =>{
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

const createUserInfo = (receivedUserInfo) =>{
    let role = getParameterFromJwt(
        'role', 
        parseJwt(receivedUserInfo.token)
    );
    let userId = getParameterFromJwt(
        'nameidentifier', 
        parseJwt(receivedUserInfo.token)
    );
    return({
        username: receivedUserInfo.fullUserName,
        token: receivedUserInfo.token,
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

const addUsernameToUserInfo = (almostCompleteUserInfo, username) =>{
    let temp = almostCompleteUserInfo;
    temp.fullUserName = username;
    return temp;
}

class UserDataAccess{  
    loginUser = (userInfo) =>{
        return sendRequestToLoginUser(userInfo)  
        .then(receivedDataProcessingHelper.handleRequestError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(createUserInfo);
    }

    registerUser = (userInfo) =>{
        return sendRequestToRegisterUser(userInfo)
        .then(receivedDataProcessingHelper.handleRequestError)
        .then(receivedDataProcessingHelper.parseJson)
        .then(parsedJson => addUsernameToUserInfo(parsedJson, userInfo.userName))
        .then(createUserInfo);
    }
}

const userDataAccess = new UserDataAccess();

export default userDataAccess;