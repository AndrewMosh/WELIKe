import { combineReducers } from '@reduxjs/toolkit';
import userReducer from "./registerSlice";
import authReducer from "./authSlice";
import officersReducer from "./officersSlice";
import messageReducer from "./messageSlice";
import registerReducer from "./registerSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    officers: officersReducer,
    messages: messageReducer,
    register: registerReducer
});

export default rootReducer;


