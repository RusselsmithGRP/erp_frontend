import { USER_LOGIN, USER_LOGOUT } from "./index";
import MiddleWare from "../middleware/api";

export function getProfileDetails(props, id, callback) {
  let middleware = new MiddleWare(props.user.token);
  middleware
    .makeConnection("/users/getprofiledetails/" + id, "GET")
    .then(response => {
      return response.json();
    })
    .then(e => {
      callback(e);
    })
    .catch(e => {
      console.log(e);
    });
}

export function updateProfile(data, callback) {
  let middleware = new MiddleWare();
  middleware
    .makeConnection("/users/updateprofiledata", "PUT", data)
    .then(res => {
      return res.json();
    })
    .then(e => {
      console.log("Data Updated Successfully...");
      console.log(e);
      callback(e);
    })
    .catch(e => {
      console.log("the error" + e);
    });
}

export function importUser(data, callback) {
  let middleware = new MiddleWare();
  middleware
    .makeConnection("/users/import", "POST", data)
    .then(res => {
      return res.json();
    })
    .then(e => {
      callback(e);
    })
    .catch(e => {
      console.log("the error" + e);
    });
}

export function submitPasswordResetRequest(email, callback) {
  let middleware = new MiddleWare();
  let data = {};
  data.email = email;
  middleware
    .makeConnection("/users/requestresettoken", "PUT", data)
    .then(res => {
      return res.json();
    })
    .then(e => {
      callback(e);
    })
    .catch(e => {
      console.log("the error" + e);
    });
}

export function resetPassword(data, token, callback) {
  let middleware = new MiddleWare();
  middleware
    .makeConnection("/users/resetthepassword/" + token, "PUT", data)
    .then(res => {
      return res.json();
    })
    .then(e => {
      callback(e);
    })
    .catch(e => {
      console.log(e);
    });
}

export function changePassword(data, id, callback) {
  let middleware = new MiddleWare();
  data.id = id;
  middleware
    .makeConnection("/users/changeyourpassword/", "PUT", data)
    .then(res => {
      return res.json();
    })
    .then(e => {
      callback(e);
    })
    .catch(e => {
      console.log(e);
    });
}

export function checktoken(token, callback) {
  let middleware = new MiddleWare();
  middleware
    .makeConnection("/users/confirmtoken/" + token, "GET")
    .then(response => {
      return response.json();
    })
    .then(e => {
      callback(e);
    });
}

export function findAllStaff(props, callback) {
  let middleware = new MiddleWare(props.user.token);
  middleware
    .makeConnection("/users/findallstaff/", "GET")
    .then(response => {
      return response.json();
    })
    .then(e => {
      callback(e);
    });
}

export function findOnlyStaff(props, callback) {
  let middleware = new MiddleWare(props.user.token);
  middleware
    .makeConnection("/users/findonlystaff/", "GET")
    .then(response => {
      return response.json();
    })
    .then(e => {
      callback(e);
    });
}

export function addUser(props, data, callback) {
  let middleware = new MiddleWare(props.user.token);
  middleware
    .makeConnection("/users/createnewuser/", "POST", data)
    .then(response => {
      console.log(response.json());
      return response.json();
    })
    .then(e => {
      callback(e);
    });
}
