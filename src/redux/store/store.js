import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";
import {getWithExpiry, KEY} from '../../util/util';

const saveToLocalStorage = (state) => {
   const timestamp = Math.round(new Date() / 1000);
   const ttl = 2*60*60; // expires/time to live 2 hours
    try {
      const serialisedState = {
        value: JSON.stringify(state),
        expiry: timestamp + ttl,
      }
      const itemStr = localStorage.getItem(KEY)
      const expireTime = Math.round(new Date() / 1000);
      const item = JSON.parse(itemStr)
      if (!itemStr || itemStr == null || expireTime > item.expiry) {
        localStorage.setItem(KEY, JSON.stringify(serialisedState));
      }
    } catch (e) {
      console.warn(e);
    }
}

const loadFromLocalStorage = () => {
    try {
      const serialisedState = getWithExpiry(KEY);
      if (serialisedState === null || serialisedState === undefined ) return undefined;
      return JSON.parse(serialisedState);
    } catch (e) {
      console.warn(e);
      return undefined;
    }
}

const store = createStore(
    rootReducer, 
    loadFromLocalStorage(),
    composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;
