import MiddleWare from "../middleware/api";

let AclAuth = {
    authenticate(username, password, cb) {
      let middleware = new MiddleWare();
      let data = {};
      data.email = username;
      data.password = password;
      middleware.makeConnection('/users/login','POST', data).then((response) => {
        if (response.status == 406){
         return cb(response);
        }
        else if(response.ok && response.status == 200){
         return response.json();
        }else{
          cb(response);
        }
      }).then(
        (user)=>{
            cb('', user.user, user.token);
        }
      )
      /* let user = {};
      if(username === "admin" && password === "password"){
        user = {id: 1, username:"admin", role: "admin", email: "admin@russelsmithgroup.com"};
      }else if(username === "vendor" && password === "password"){
        user = {id: 2, username:"vendor", role: "vendor", email: "vendor@russelsmithgroup.com"};
      }else if(username === "procurement" && password === "password"){
        user = {id: 3, username:"pr", role: "pr", email: "admin@russelsmithgroup.com"};
      }else if(username === "iac" && password === "password"){
        user = {id: 3, username:"iac", role: "iac", email: "iac@russelsmithgroup.com"};
      } */
      //setTimeout(cb(user), 100) // fake async
    },
    signout(cb) {
      setTimeout(cb, 100) // fake async
    }
}
export default AclAuth;
