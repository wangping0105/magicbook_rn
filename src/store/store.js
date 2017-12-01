import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import indexReducer from '../reducers/index';

//创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。
let enhancer = compose(
    //这里加了两个中间件，一个是处理异步操作的thunk，还有一个是用来调试阶段方便查看的logger,最终打包的时候logger可以去掉
    applyMiddleware(thunk, createLogger()),
);
const store = createStore(indexReducer, enhancer);

//这个store就是最终生成的状态管理器，里面包含了整个App需要交互的state
export default store;
