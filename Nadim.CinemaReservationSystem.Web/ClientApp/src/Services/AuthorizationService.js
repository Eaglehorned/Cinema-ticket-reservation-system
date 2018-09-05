let userInfo = {
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
    role: localStorage.getItem('role'),
    userId: localStorage.getItem('userId')
}

class AuthorizationService{

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
}

const authorizationService = new AuthorizationService();

export default authorizationService;