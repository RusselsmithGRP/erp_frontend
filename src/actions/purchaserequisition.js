import * as loadAction from "./loading";
import MiddleWare from "../middleware/api";
import { debuglog } from "util";

export function fetchAllRequistion(token, callback) {
  let m = new MiddleWare(token);
  return m
    .makeConnection("/purchase/requisition/", m.GET)
    .then(response => {
      return response.json();
    })
    .then(responseJson => callback(responseJson));
}

export function findRequisitionById(token, id, callback) {
  let m = new MiddleWare(token);
  return m
    .makeConnection("/purchase/requisition/view/" + id, m.GET)
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      callback(responseJson);
      //props.dispatch(loadAction.LoadingSuccess());
    });
}

export function submitRequisition(token, data, callback) {
  let m = new MiddleWare(token);
  return m
    .makeConnection("/purchase/requisition/submit", m.POST, data)
    .then(result => {
      if (result.ok && result.statusText == "OK" && result.status == 200)
        callback(result.ok);
    });
}

export function editRequisition(token, id, data, callback) {
  let m = new MiddleWare(token);
  return m
    .makeConnection("/purchase/requisition/update/" + id, m.POST, data)
    .then(result => {
      {
        {
          debugger;
        }
      }
      if (result.ok && result.statusText == "OK" && result.status == 200)
        callback(result.ok);
    });
}

export function updateRequisition(token, id, data, callback) {
  let m = new MiddleWare(token);
  return m
    .makeConnection("/purchasing/requisition/resubmitted/" + id, m.POST, data)
    .then(result => {
      if (result.ok && result.statusText == "OK" && result.status == 200)
        callback(result.ok);
    });
}
