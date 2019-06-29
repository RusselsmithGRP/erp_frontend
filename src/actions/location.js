import { USER_LOGIN, USER_LOGOUT } from "./index";
import MiddleWare from "../middleware/api";

export function getLocation(props, callback) {
  let middleware = new MiddleWare(props.user.token);
  middleware
    .makeConnection("/locations/getlocation/", "GET")
    .then(response => {
      return response.json();
    })
    .then(e => {
      callback(e);
    });
}
export function getAddress(props, location, callback) {
  let data = {};
  data.location = location;
  let middleware = new MiddleWare(props.user.token);
  middleware
    .makeConnection("/locations/getaddress/", "POST", data)
    .then(response => {
      return response.json();
    })
    .then(e => {
      callback(e);
    });
}
