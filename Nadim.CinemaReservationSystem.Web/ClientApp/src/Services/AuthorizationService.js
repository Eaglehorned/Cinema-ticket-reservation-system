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

    setInfo = (username, token, role, userId) =>{
        userInfo.username = username;
        userInfo.token = token;
        userInfo.role = role;
        userInfo.userId = userId;
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('userId', userId);
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