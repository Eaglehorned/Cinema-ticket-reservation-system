export default class AuthenticationService{
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
        });
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
        });
    }
}