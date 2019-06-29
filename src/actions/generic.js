import * as loadAction from "./loading";
import MiddleWare from "../middleware/api";

export function fetchAll(type, token, callback) {
  let m = new MiddleWare(token);
  return m
    .makeConnection("/" + type + "/", m.GET)
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      callback(responseJson);
    });
}

export function findOne(type, id,token, callback) {
  let m = new MiddleWare(token);
  return m.makeConnection("/" + type + "/view/"+id, m.GET)
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      callback(responseJson);
    });
}

export function saveEdit(type, id,token, callback) {
  let m = new MiddleWare(token);
  return m.makeConnection("/" + type + "/edit/"+id, m.GET)
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      callback(responseJson);
    });
}

export function saveItem(type, token, data, callback) {
  let m = new MiddleWare(token);
  return m.makeConnection("/" + type + "/add/", m.POST, data).then(res => {
      return res.json();
    }).then(e => {
      callback(e);
    }).catch(e => {
      console.log("the error" + e);
    });
}

export function updateItem(type, id,token, data, callback) {
  let m = new MiddleWare(token);
  return m.makeConnection("/" + type + "/edit/"+id, m.POST, data).then(res => {
      return res.json();
    }).then(e => {
      callback(e);
    }).catch(e => {
      console.log("the error" + e);
    });
}

export function deleteItem(type, token, id) {
  let m = new MiddleWare(token);
  return m
    .makeConnection("/" + type + "/delete/", m.DELETE, { id: id })
    .then(result => {
      result => {
        if (result.ok && result.statusText == "OK" && result.status == 200)
          callback(result.ok);
      };
    });
}
