
class AuthService{

    setTokensLocal(token){
       window.localStorage.setItem("token", JSON.stringify(token));
    }
    
    getTokensLocal(){
       return JSON.parse(window.localStorage.getItem("token"));
    }

    setLog(islog){
        window.localStorage.setItem("isLog", islog);
    }

    getLog(){
        return JSON.parse(window.localStorage.getItem("isLog"));
    }

    setClient(client){
        window.localStorage.setItem("client", client);
    }

    getClient(){
        return JSON.parse(window.localStorage.getItem("client"));
    }
    
}
export default new AuthService();