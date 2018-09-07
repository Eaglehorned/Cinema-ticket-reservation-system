import userDataAccess from '../DataAccess/AuthenticationDataAccess';

let userInfo = {
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
    role: localStorage.getItem('role'),
    userId: localStorage.getItem('userId')
}

const setInfo = (receivedUserInfo) =>{
    userInfo.username = receivedUserInfo.username;
    userInfo.token = receivedUserInfo.token;
    userInfo.role = receivedUserInfo.role;
    userInfo.userId = receivedUserInfo.userId;
    localStorage.setItem('username', receivedUserInfo.username);
    localStorage.setItem('token', receivedUserInfo.token);
    localStorage.setItem('role', receivedUserInfo.role);
    localStorage.setItem('userId', receivedUserInfo.userId);
}

class UserService{
    getToken = () =>{
        return userInfo.token;
    }

    logOut = () =>(setInfo({
        token: '',
        username: '',
        role: '',
        userId: ''
    }));

    getUsername = () =>{
        return userInfo.username;
    }

    getUserId = () =>{
        return userInfo.userId;
    }

    getRole = () =>{
        return userInfo.role;
    }

    validateEmail = (email) =>{
        const result = /^([\w-.]+)@((\[[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return result.test(String(email).toLowerCase());
    }

    loginUser = (userInfo) =>{
        return userDataAccess.loginUser(userInfo)
        .then(setInfo);
    }

    registerUser = (userInfo) =>{
        return userDataAccess.registerUser(userInfo)
        .then(setInfo);
    }

    validateRegisterData = (email, password, lastName, firstName) =>{
        return this.validateEmail(email) && password && lastName && firstName;
    }

    validateLoginDate = (email, password) =>{
        return this.validateEmail(email) && password;
    }
}

const userService = new UserService();

export default userService;