'use strict';

import * as types from '../config/constants/login_types'; // 导入事件类别,用来做事件类别的判断

// 初始状态

const initialState = {
    status: '点击登录',
    isSuccess: false,
    attrs: {}
};
// 不同类别的事件使用switch对应处理过程

const currentUser = (state = initialState, action) => {

    switch (action.type) {

        case types.LOGINING:

            return {
                ...state,
                status: '正在登陆',
                isSuccess: true,
                attrs: {},
            };

            break;
        case types.LOGIN_SUCCESS:

            return {
                ...state,
                status: '登陆成功',
                isSuccess: true,
                attrs: action.user,
            }

            break;
        case types.LOGIN_FAILED:

            return {
                ...state,
                status: '登录出错',
                isSuccess: false,
                attrs: {}
            };

            break;
        case types.LOGOUT:
            return {
                ...state,
                status: null,
                attrs: {}
            }
        default:
            return state;

    }
}
export default currentUser