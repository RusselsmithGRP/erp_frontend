import * as loadAction from './loading';
import MiddleWare from "../middleware/api";


export function findRoleById(props, roleId, callback){
    let middleware = new MiddleWare(props.user.token);
    props.dispatch(loadAction.Loading());
    return middleware.makeConnection('/roles/permission/'+roleId,'GET').then((response) => {
        return response.json()
    }).then(        
        (responseJson)=>{
            callback(responseJson);
            props.dispatch(loadAction.LoadingSuccess());
        }
    );
}

export function savePermission(props, state, callback){
    let m = new MiddleWare(props.user.token);
    let data = {};
    data.payload = {permission: state.checked};
    return m.makeConnection('/roles/permission/save/'+state.role._id, m.POST, data).then((result) => {
        if(result.ok && result.statusText == "OK" && result.status == 200 ) callback(result.ok);
    }); 
}

export function resolvePermission(props, role, callback){
    let middleware = new MiddleWare(props.user.token);
    let data = {};
    data.role =  role;
    return middleware.makeConnection('/roles/resolvepermission/', 'POST', data).then((response) => {
        return response.json()
    }).then(        
        (responseJson)=>{
            callback(responseJson);
            props.dispatch(loadAction.LoadingSuccess());
        }
    );
}