import { FETCH_VENDOR, FETCH_VENDORS, ADD_VENDOR, UPDATE_VENDOR, APPROVE_VENDOR, DELETE_VENDOR } from './index';
import * as loadAction from './loading';
import MiddleWare from "../middleware/api";

export function fetchVendorAction(arry){
    return {type: FETCH_VENDOR, data:arry};
}
export function fetchVendorsAction(arry){
    return {type: FETCH_VENDORS, data:arry};  
}
export function addVendorAction(arry){
    return {type: ADD_VENDOR, data:arry};  
}
export function updateVendorsAction(arry){
    return {type: UPDATE_VENDOR, data:arry};  
}
export function approveVendorsAction(arry){
    return {type: APPROVE_VENDOR, data:arry};  
}
export function deleteVendorsAction(arry){
    return {type: DELETE_VENDOR, data:arry};  
}

export function findAllVendors(props, type=''){

    let middleware = new MiddleWare(props.user.token);
    let endpoint = '/vendors';
    if(type === 'pending'){
        endpoint = endpoint+'/pending';
    }else if(type === 'approved'){
        endpoint = endpoint+'/approved';
    }else if(type === "unapproved"){
        endpoint = endpoint+'/unapproved';
    }else if(type === "blacklisted"){
        endpoint = endpoint+'/blacklisted';
    }
    props.dispatch(loadAction.Loading());
        return middleware.makeConnection(endpoint ,'GET').then((response) => response.json()).then((responseJson)=>{
            let datas =[];
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

export function findVendorByUserId(props,userId){
    if(typeof(userId) == "undefined")return;
    let middleware = new MiddleWare(props.user.token);
    props.dispatch(loadAction.Loading());
    return middleware.makeConnection('/vendors/'+userId,'GET').then((response) => {
        return response.json()
    }).then(        
        (responseJson)=>{
            props.dispatch({type: 'UPDATE_VENDOR', data:responseJson[0]});
            props.dispatch(loadAction.LoadingSuccess());
        }
    );
}

export function findVendorById(props,vendorId){
    let middleware = new MiddleWare(props.user.token);
    props.dispatch(loadAction.Loading());
    return middleware.makeConnection('/vendors/one/'+vendorId,'GET').then((response) => {
        return response.json()
    }).then(        
        (responseJson)=>{
            props.dispatch({type: 'UPDATE_VENDOR', data:responseJson[0]});
            props.dispatch(loadAction.LoadingSuccess());
        }
    );
}

export function submitVendorDetailsViaUserId(dispatch, userId, d){
    let middleware = new MiddleWare();
    let data = {};
    data.payload = d;
    data.key = "user";
    data.value = userId;
    dispatch(loadAction.Loading());
    middleware.makeConnection('/vendors','PUT', data).then(
      (result)=>{
        if(result.ok && result.statusText == "OK" && result.status == 200 ) 
            dispatch(loadAction.LoadingSuccess("Saved Successfully"));
        }
    ).then(()=>{
        dispatch({type: 'UPDATE_VENDOR', data:d});
    }).catch((e)=>{
      console.log(e);
    })
}

export function deleteVendor(props, user){
    let middleware = new MiddleWare(props.user.token);
    middleware.makeConnection('/vendors/deletevendor','DELETE', {"user":user}).then((res)=>{
      console.log(user)
    }).catch((e)=>{
      console.log("the error" + e);
    })
}