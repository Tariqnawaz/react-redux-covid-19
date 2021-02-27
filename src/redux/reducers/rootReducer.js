import { combineReducers } from "redux";
import reducer from './reducer'
// The key of this object will be the name of the store
const rootReducers = combineReducers({ list: reducer });

export default rootReducers;