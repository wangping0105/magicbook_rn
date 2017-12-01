export const parse_params = (params) => {
    let str = '?';
    for(let key in params){
        if(params[key] === undefined || params[key] === null || params[key] === ''){
            continue;
        }
        str += key + '=' + params[key] + '&';
    }
    return str + 's=0';
}
