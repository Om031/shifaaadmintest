import { combineReducers } from '@reduxjs/toolkit';
import  ProductsSlice  from './Products/ProductsSlice.js';
import  CartSlice  from './cart/CartSlice.js';


const RootReducer = combineReducers({
    product:ProductsSlice,
    cart:CartSlice,
});

export default RootReducer;
