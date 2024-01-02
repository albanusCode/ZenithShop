import { combineReducers } from "redux";
import { cartReducer } from "./cart/cartReducer";
import {userReducer} from './user/user.reducer';
import { categoriesReducer } from "./category/categoryReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer
});