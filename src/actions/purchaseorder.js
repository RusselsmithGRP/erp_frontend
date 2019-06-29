import * as loadAction from "./loading";
import MiddleWare from "../middleware/api";

export function fetchAllPurchaseOrder(token, callback) {
  let m = new MiddleWare(token);
  return m
    .makeConnection("/purchase/order/", m.GET)
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      callback(responseJson);
    });
}

export function submitPO(token, data, callback) {
  let m = new MiddleWare(token);
  return m
    .makeConnection("/purchase/order/submit", m.POST, data)
    .then(result => {
      if (result.ok && result.statusText == "OK" && result.status == 200)
        callback(result.ok);
    });
}

export function submitTerms(token, data, callback) {
  let m = new MiddleWare(token);
  return m
    .makeConnection("/purchase/order/terms", m.POST, data)
    .then(result => {
      if (result.ok && result.statusText == "OK" && result.status == 200)
        callback(result.ok);
    });
}

export function fetchPurchaseOrderById(token, id, callback) {
  let m = new MiddleWare(token);
  return m
    .makeConnection("/purchase/order/view/" + id, m.GET)
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      callback(responseJson);
    });
}

export function editPurchaseOrder(token, id, data, callback) {
  let m = new MiddleWare(token);
  return m
    .makeConnection("/purchase/order/update/" + id, m.POST, data)
    .then(result => {
      if (result.ok && result.statusText == "OK" && result.status == 200)
        callback(result.ok);
    });
}
