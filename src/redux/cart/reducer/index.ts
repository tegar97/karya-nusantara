import { combineReducers } from "redux";
import products from './cart'

export default combineReducers({
  product: products,
});