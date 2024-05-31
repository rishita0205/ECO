import {combineReducers} from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import userSlice from "./userSlice";
const rootReducer=combineReducers({
    user:userSlice,
    cart:cartReducer
});

export {rootReducer}