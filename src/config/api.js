import store from '../store/store'
import {parse_params} from '../helpers/utils'

// 登陆接口
export const AuthLoginApi = (username, password) => {
    return new Requester('/auths/login', DEFAULT_HEADER_FOR_POST({username: username, password: password})).do_fetch()
};

const current_user = () => store.getState().current_user.attrs;

class Requester {
    constructor(url, header={}) {
        this.host = AppGlbal.host;
        this.prefix = "api/v1";
        this.version_code = "2.3.5";
        this.url = url;
        this.header = header
    }

    do_fetch(query) {
        return new Promise((resolve, reject) => {
            let timeout = setTimeout(() => {reject("请求超时")}, 20000);
            let _url = `${this.host}/${this.prefix}/${this.url}`;
            _url = _url + parse_params(query);

            fetch(_url, this.header).
            then((response) => {
                clearTimeout(timeout);
                if (response.status == 200) {
                    return response.json()
                }else if(response.status == 500){
                    return reject(response.status)
                }else if(response.status == 404){
                    return {code: -1, message: 'Please check your URL'} //reject(response.status)
                }
            }).
            then((responseData) => {
                return resolve(responseData)
            }).
            catch((error) => {
                console.log("default error");
                console.log(error);
                return reject(error)
            })
        })
    }
}

const DEFAULT_HEADER_FOR_GET = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Version-Code': '2.3.5'
    }
};

const DEFAULT_HEADER_FOR_POST = (body) => {
    return(
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Version-Code': '2.3.5'
            },
            body: JSON.stringify(body)
        }
    )
};