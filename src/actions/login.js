/*
 所有异步操作，比如用户登录或者登出，触发了调取Api或者读取本地数据库，都会触发App的重新渲染，这个文件就是用来做那些动作，
 每个action都必须给出一个type来触发reducer，从而导致state发生变化
 Exsample
 export const login = () => ({
 type: types.LOGIN
 })
 */
import * as types from '../config/constants/login_types'
import {AuthLoginApi} from '../config/api'

//判断本地是否登录
export const localLogin = () => {
    return dispatch => {
        storage.load({
            key: 'user'
        }).then(user => {
            dispatch(loginSuccess(user))
        }).catch(err => {
            dispatch(loginFailed())
        })
    }
};

//登录
export const login = (username, password) => {
    return dispatch => {
        dispatch({type: types.LOGINING});
        AuthLoginApi(username, password).then((data) => {
            if (data.code == 0) {
                dispatch(loginSuccess(data))
            } else {
                Toast.show(data.message);
                dispatch(loginFailed());
            }
        }).catch((err) => {
            console.log(err);
            Toast.show('网络错误');
            dispatch(loginFailed())
        })
    }
};

export const logout = () => {
    storage.remove({
        key: 'user'
    });
    return {type: types.LOGOUT}
};

//登录成功
export const loginSuccess = (user) => {
    storage.save({
        key: 'user',
        data: user
    })
    Toast.show('登录成功')
    return {type: types.LOGIN_SUCCESS, user: user}
};

//登录失败
export const loginFailed = () => {
    return {type: types.LOGIN_FAILED}
};


