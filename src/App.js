/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import {Provider, connect} from 'react-redux';
import Storage from 'react-native-storage';
import Toast from 'react-native-root-toast';
import store from './store/store'
import {localLogin} from './actions/login';
import LoginView from './components/personal/login';
import Navgation from './config/routes';

//初始化数据库
var storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间(秒)，设为null则永不过期
    defaultExpires: null,

    // 读写时在内存中缓存数据。默认启用
    enableCache: true
});

//注意，global对象相当于浏览器里面的window，不要把过于庞大的函数对象放在这里面，应该放一些小而常用的
global.AppGlbal = {
    host: 'http://47.91.157.26'
    //host: 'http://localhost:9000'
};
global.storage = storage;
global.Toast = Toast;

class AppInitialize extends Component {
    componentWillMount () {
        //在这里获取用户的登录状态，根据登录状态来判断返回主界面还是登录界面
        this.props.dispatch(localLogin())
    }

    render () {
        console.log("App.js ==:");
        console.log(this.props);
        if (this.props.current_user.attrs.user_token == null){
            return (<LoginView />)
        } else {
            return (<Navgation />)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        current_user: state.current_user
    }
}


const AppInit = connect(mapStateToProps)(AppInitialize);

export default class App extends Component {
    render() {
        return (
            //把整个应用包裹在Provider里面，共享所有组件的state，整个应用有且只有一个store
            <Provider store={store}>
              <AppInit />
            </Provider>
        );
    }
}