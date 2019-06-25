import cartReducer from './cartReducer';

// 负责合并 管理员
import { combineReducers } from 'redux';

export default combineReducers({ cartReducer });