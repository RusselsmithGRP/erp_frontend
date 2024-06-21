import * as loadAction from "./loading";
import MiddleWare from "../middleware/api";

export function fetchAllRecievedItems(token, callback) {
  let m = new MiddleWare(token);
  return m
    .makeConnection("/receivingandinspection/", m.GET)
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      callback(responseJson);
    });
}

export function fetchAllWorkCompletion(token, callback) {
  let m = new MiddleWare(token);
  return m
    .makeConnection("/receivingandinspection/all/work/completion", m.GET)
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      callback(responseJson);
    });
}

export function submitRIF(token, data, callback) {
  let m = new MiddleWare(token);
  return m
    .makeConnection("/receivingandinspection/submit", m.POST, data)
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

export function submitWCF(token, data, callback) {
  let m = new MiddleWare(token);
  return m
    .makeConnection("/receivingandinspection/submitworkcompletion", m.POST, data)
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

export function updateRIF(token, id, data, callback) {
  let m = new MiddleWare(token);
  return m
    .makeConnection("/receivingandinspection/update/"+id, m.PUT, data)
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

export function updateWCF(token, id, data, callback) {
  let m = new MiddleWare(token);
  return m
    .makeConnection("/receivingandinspection/updateworkcompletion/"+id, m.PUT, data)
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

export function getInspectedProduct(token, id, callback){
  let m = new MiddleWare(token);
  return m.makeConnection('/receivingandinspection/getinspectedproduct/'+id, m.GET).then((response) => {
      return response.json();
  }).then(        
      (responseJson)=>{
          callback(responseJson);
      }
  );
}

export function getIssuedWorkCompletion(token, id, callback){
  let m = new MiddleWare(token);
  return m.makeConnection('/receivingandinspection/getissuedworkcompletion/'+id, m.GET).then((response) => {
      return response.json();
  }).then(        
      (responseJson)=>{
          callback(responseJson);
      }
  );
}

export function submitRL(token, data, callback) {
  let m = new MiddleWare(token);
  return m
    .makeConnection("/receivingandinspection/submitrejectionlog", m.POST, data)
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

export function fetchAllRejectionLogs(token, callback) {
  let m = new MiddleWare(token);
  return m
    .makeConnection("/receivingandinspection/allrejectionlogs/", m.GET)
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      callback(responseJson);
    });
}

export function FetchRejectionLog(token, id, callback){
  let m = new MiddleWare(token);
  return m.makeConnection('/receivingandinspection/getrejectionlog/'+id, m.GET).then((response) => {
      return response.json();
  }).then(        
      (responseJson)=>{
          callback(responseJson);
      }
  );
}