import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./products/products";
import cartReducer from "./cart/cart";

const reducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

export default reducer;
