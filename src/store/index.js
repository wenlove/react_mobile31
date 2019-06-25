//仓库生成器来创建
import { createStore } from 'redux';

//引入管理员
import reducer from './reducer';


export default createStore(reducer);