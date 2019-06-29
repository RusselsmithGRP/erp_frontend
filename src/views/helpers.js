import { strict } from "assert";

const helpers = {
isPhoneNumber: function(input) {
    let re = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
    return re.test(input);
  },
  isNumber: function(input) {
    let re = /^[0-9]+$/;
    return re.test(input);
  },
  isPassword: function(input) {
    let re = String(input)
    if (re.length > 3) {
      return true;
    }
  },
  isEmail: function(input) {
    let re = /\S+@\S+\.\S+/;
    return re.test(input);
  },
  isEmpty: function(input) {
    return !!input.replace(/\s+/,'').length;
  },
  isString: function(input) {
    let re = /^[A-Za-z]+$/;
    return re.test(input);
},
  ValidURL: function(input) {
    let re = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
    return re.test(input);
  },
}

export default helpers;
