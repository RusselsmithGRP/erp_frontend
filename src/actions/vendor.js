import {
  FETCH_VENDOR,
  FETCH_VENDORS,
  ADD_VENDOR,
  UPDATE_VENDOR,
  APPROVE_VENDOR,
  DELETE_VENDOR,
  RECIEVE_GENERAL_INFO_DATA,
  RECIEVE_BUSINESS_INFO_DATA,
  RECIEVE_WORK_REFERENCE_DATA,
  RECIEVE_BANK_DETAIL_DATA,
  CLEAR
} from "./index";
import * as loadAction from "./loading";
import MiddleWare from "../middleware/api";

export function fetchVendorAction(arry) {
  return { type: FETCH_VENDOR, data: arry };
}
export function fetchVendorsAction(arry) {
  return { type: FETCH_VENDORS, data: arry };
}
export function addVendorAction(arry) {
  return { type: ADD_VENDOR, data: arry };
}
export function updateVendorsAction(arry) {
  return { type: UPDATE_VENDOR, data: arry };
}
export function approveVendorsAction(arry) {
  return { type: APPROVE_VENDOR, data: arry };
}
export function deleteVendorsAction(arry) {
  return { type: DELETE_VENDOR, data: arry };
}
export function getGeneralInfoInputs(dispatch, d) {
  dispatch({ type: RECIEVE_GENERAL_INFO_DATA, data: d });
}
export function getBusinessInfoInputs(dispatch, d) {
  dispatch({ type: RECIEVE_BUSINESS_INFO_DATA, data: d });
}
export function getBankDetailInputs(dispatch, d) {
  dispatch({ type: RECIEVE_BANK_DETAIL_DATA, data: d });
}
export function getWorkReferenceInputs(dispatch, d) {
  dispatch({ type: RECIEVE_WORK_REFERENCE_DATA, data: d });
}

export function clearStore(props) {
  props.dispatch({ type: CLEAR, data: {} });
}
export function findAllVendors(props, type = "") {
  let middleware = new MiddleWare(props.user.token);
  let endpoint = "/vendors";
  if (type === "pending") {
    endpoint = endpoint + "/pending";
  } else if (type === "approved") {
    endpoint = endpoint + "/approved";
  } else if (type === "unapproved") {
    endpoint = endpoint + "/unapproved";
  } else if (type === "blacklisted") {
    endpoint = endpoint + "/blacklisted";
  } else if (type === "new") {
    endpoint += "/new";
  }
  props.dispatch(loadAction.Loading());
  return middleware
    .makeConnection(endpoint, "GET")
    .then(response => response.json())
    .then(responseJson => {
      let datas = [];
      /*             responseJson.map((row)=>{
                let arry = [];
                arry.push(row._id, row.general_info.company_name, row.general_info.contact_name, row.general_info.contact_phone,
                row.general_info.contact_email, row.status);
                datas.push(arry);
            });
            const dataTable = {
                headerRow: ["Company Name", "Contact Person", "Contact Telephone", "Contact Email", "Actions"],
                footerRow: ["Company Name", "Contact Person", "Contact Telephone", "Contact Email", "Actions"],
                dataRows: datas} */
      props.dispatch(fetchVendorsAction(responseJson));
      props.dispatch(loadAction.LoadingSuccess());
    });
}

export function findVendorByUserId(props, userId) {
  if (typeof userId == "undefined") return;
  let middleware = new MiddleWare(props.user.token);
  props.dispatch(loadAction.Loading());
  return middleware
    .makeConnection("/vendors/" + userId, "GET")
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      props.dispatch(
        { type: RECIEVE_GENERAL_INFO_DATA, data: responseJson[0].general_info },
        {
          type: RECIEVE_BUSINESS_INFO_DATA,
          data: responseJson[0].business_info
        },
        { type: RECIEVE_BANK_DETAIL_DATA, data: responseJson[0].bank_detail },
        {
          type: RECIEVE_WORK_REFERENCE_DATA,
          data: responseJson[0].work_references
        }
      );
      props.dispatch(loadAction.LoadingSuccess());
    });
}

export function findVendorById(props, vendorId, callback) {
  let middleware = new MiddleWare(props.user.token);
  props.dispatch(loadAction.Loading());
  return middleware
    .makeConnection("/vendors/one/" + vendorId, "GET")
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      //console.log(responseJson[0], "the data")
      // props.dispatch(
      //     {type: RECIEVE_BUSINESS_INFO_DATA, data:responseJson[0].business_info},
      //     {type: RECIEVE_BANK_DETAIL_DATA, data:responseJson[0].bank_detail},
      //     {type: RECIEVE_WORK_REFERENCE_DATA, data:responseJson[0].work_reference},
      //     {type: RECIEVE_GENERAL_INFO_DATA, data:responseJson[0].general_info},

      //     );
      console.log(responseJson[0]);
      callback(responseJson[0]);
      props.dispatch(loadAction.LoadingSuccess());
    });
}

export function getVendorIdByUserId(props, userId, callback) {
  let middleware = new MiddleWare(props.user.token);
  props.dispatch(loadAction.Loading());
  return middleware
    .makeConnection("/vendors/details-by-userId/" + userId, "GET")
    .then(response => response.json())
    .then(responseJson => {
      callback(responseJson);
      props.dispatch(loadAction.LoadingSuccess());
    });
}

export function getVendorByContracts(props, callback) {
  let middleware = new MiddleWare(props.user.token);
  props.dispatch(loadAction.Loading());
  return middleware
    .makeConnection("/vendors/contracts", "GET")
    .then(response => response.json())
    .then(responseJson => {
      callback(responseJson);
      props.dispatch(loadAction.LoadingSuccess());
    });
}

export function updateVendorType(props, data, callback) {
  let middleware = new MiddleWare();
  props.dispatch(loadAction.Loading());
  return middleware
    .makeConnection("/vendors/update/contracts", "PATCH", data)
    .then(response => response.json())
    .then(responseJson => {
      callback(responseJson);
      props.dispatch(loadAction.LoadingSuccess("Vendor Updated successfully"));
    });
}

export function searchVendor(token, search, callback) {
  let m = new MiddleWare(token);
  ///props.dispatch(loadAction.Loading());
  return m
    .makeConnection("/vendors/search/" + search, m.GET)
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      callback(responseJson);
    });
}

export function submitVendorDetailsViaUserId(dispatch, userId, data) {
  let middleware = new MiddleWare();
  // let data = {};
  // data.payload = d;
  // data.key = "user";
  // data.value = userId;
  let _data = data;
  _data.user = userId;
  dispatch(loadAction.Loading());
  middleware
    .makeConnection("/vendors", "PUT", _data)
    .then(result => {
      if (result.ok && result.statusText == "OK" && result.status == 200)
        dispatch(loadAction.LoadingSuccess("Saved Successfully"));
    })
    .catch(e => {
      console.log(e);
    })
    .catch(e => {
      console.log(e);
    });
}

export function deleteVendor(props, user) {
  let middleware = new MiddleWare(props.user.token);
  middleware
    .makeConnection("/vendors/deletevendor", "DELETE", { user: user })
    .then(res => {
      console.log(user);
    })
    .catch(e => {
      console.log("the error" + e);
    });
}

export function getVendorEvaluation(token, vendorId, callback) {
  let middleware = new MiddleWare(token);
  return middleware
    .makeConnection("/vendorevaluation/view/" + vendorId, "GET")
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      callback(responseJson);
    });
}
