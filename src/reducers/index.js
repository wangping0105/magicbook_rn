'use strict';

import { combineReducers } from 'redux';

import CurrentUser from './current_user'; // 导入登录的redux处理过程

const indexReducer = combineReducers({ current_user: CurrentUser });

export default indexReducer; // 导出,作为统一入口