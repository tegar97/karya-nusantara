import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from '../reducer/index';
import { composeWithDevTools } from "redux-devtools-extension";
const middlewares = [] //put your middleware over here

export default (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
};
