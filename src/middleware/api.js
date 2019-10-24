"use strict";

class MiddleWare {
  POST = "POST";
  PUT = "PUT";
  DELETE = "DELETE";
  GET = "GET";
  PATCH = "PATCH";

    constructor(token=""){
 //this.api_root = "http://ec2-18-223-2-36.us-east-2.compute.amazonaws.com:3000";
  this.api_root = "http://localhost:3000" 
        this.token = token;
    }

  makeConnection(endpoint, httpVerb, body = "") {
    let option = {};
    body ? JSON.stringify(body) : "";
    if (httpVerb === "GET" || httpVerb === "HEAD") {
      option = {
        method: httpVerb,
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token
        }
      };
    } else {
      option = {
        method: httpVerb,
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.token
        },
        body: JSON.stringify(body)
      };
    }
    return fetch(this.api_root + endpoint, option).catch(e => {
      console.log(e);
    });
  }
}

export default MiddleWare;
