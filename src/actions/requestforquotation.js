import * as loadAction from './loading';
import MiddleWare from "../middleware/api";
import { debuglog } from 'util';

export function fetchAllQuotes(token, callback){
    let m = new MiddleWare(token);
    return m.makeConnection('/purchase/quotation/', m.GET).then((response) => {
        return response.json()
    }).then(        
        (responseJson)=>{
            callback(responseJson);
        }
    );
}

export function fetchQuotesByRequisitionId(token, id, callback){
    let m = new MiddleWare(token);
    return m.makeConnection('/purchase/quotation/index/'+id, m.GET).then((response) => {
        return response.json()
    }).then(        
        (responseJson)=>{
            callback(responseJson);
        }
    );
}

export function fetchVendorsQuotes(token, vendorId, callback){
    let m = new MiddleWare(token);
    return m.makeConnection('/purchase/quotation/vendor/'+vendorId, m.GET).then((response) => {
        return response.json()
    }).then(        
        (responseJson)=>{
            callback(responseJson);
        }
    );
}

export function findQuotationById(token, id, callback){
    let m = new MiddleWare(token);
    return m.makeConnection('/purchase/quotation/view/'+id, m.GET).then((response) => {
        return response.json();
    }).then(        
        (responseJson)=>{
            callback(responseJson);
            //props.dispatch(loadAction.LoadingSuccess());
        }
    );
}

export function submitVendorQuote(token, quoteid, data,callback){
    let m = new MiddleWare(token);
    const d = data;
    d.id = quoteid;
    return m.makeConnection('/purchase/quotation/submitvendorquote', m.POST, d).then(
        (result)=>{
            if(result.ok && result.statusText == "OK" && result.status == 200 ) callback(result.ok);
    });  
}

export function submitQuotation(token, data, callback){
    let m = new MiddleWare(token);
    return m.makeConnection('/purchase/quotation/submit', m.POST, data)
    .then(response => response.json())
    .then(
        (result)=>{
            console.log(result, "result")
            if(result.isOk ) callback(result.data);
    });   
}

export function editQuotation(token, id, data, callback){
    let m = new MiddleWare(token);
    return m.makeConnection('/purchase/quotation/update/'+id, m.POST, data).then((result)=>{
        if(result.ok && result.statusText == "OK" && result.status == 200 )callback(result.data);
    }); 
}

export function fetchUniqueVendorFromQuote(token, callback){
    let m = new MiddleWare(token);
    return m.makeConnection('/purchase/quotation/unique_vendor', m.GET).then((result)=>{
        return result.json();
    }).then(        
        (responseJson)=>{
            callback(responseJson);
            //props.dispatch(loadAction.LoadingSuccess());
    }); 
}

export function fetchAllQuoteforVendor(token, id, callback){
    let m = new MiddleWare(token);   
    return m.makeConnection('/purchase/quotation/quotes_for_vendor/'+id, m.GET).then((result)=>{
        return result.json();
    }).then(        
        (responseJson)=>{
            callback(responseJson);
            //props.dispatch(loadAction.LoadingSuccess());
    }); 
}
export function submitAcceptQuote(token, data, callback){
    let m = new MiddleWare(token);
    return m.makeConnection('/purchase/quotation/accept_qoute', m.POST, data).then(
        (result)=>{
            if(result.ok && result.statusText == "OK" && result.status == 200 ) callback(result.ok);
    });   
}