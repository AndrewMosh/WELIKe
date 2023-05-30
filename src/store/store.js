import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import officersReducer from "./officersSlice";
import messageReducer from "./messageSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    officers: officersReducer,
    messages: messageReducer,
  },
});
