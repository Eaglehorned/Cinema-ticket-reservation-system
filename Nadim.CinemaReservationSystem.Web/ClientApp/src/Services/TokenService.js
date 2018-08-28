export default class TokenService{
    static token = '';

    static getToken = () =>{
        return this.token;
    }

    static setToken = (token) =>{
        this.token = token;
        localStorage.setItem('token', token);
    }
}