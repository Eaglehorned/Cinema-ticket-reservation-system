import authenticationDataAccess from '../DataAccess/AuthenticationDataAccess';

let userInfo = {
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
    role: localStorage.getItem('role'),
    userId: localStorage.getItem('userId')
}

class UserService{
    getToken = () =>{
        return userInfo.token;
    }

    setInfo = (_username, _token, _role, _userId) =>{
        userInfo.username = _username;
        userInfo.token = _token;
        userInfo.role = _role;
        userInfo.userId = _userId;
        localStorage.setItem('username', _username);
        localStorage.setItem('token', _token);
        localStorage.setItem('role', _role);
        localStorage.setItem('userId', _userId);
    }

    getUsername = () =>{
        return userInfo.username;
    }

    setToken = (token) =>{
        userInfo.token = token;
        localStorage.setItem('token', token);
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
        return authenticationDataAccess.loginUser(userInfo)
        .then(user => userService.setInfo(user.username, user.token, user.role, user.userId));
    }

    registerUser = (userInfo) =>{
        return authenticationDataAccess.registerUser(userInfo)
        .then(user => userService.setInfo(user.username, user.token, user.role, user.userId));
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