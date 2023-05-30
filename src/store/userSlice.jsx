import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    currentUser: null,
  },
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { registerStart, registerSuccess, registerFailure } =
  userSlice.actions;

export const registerUser = (userData) => async (dispatch) => {
  dispatch(registerStart());

  try {
    const response = await axios.post(
      "https://skillfactory-final-project.herokuapp.com/api/auth/sign_up",
      userData
    );
    dispatch(registerSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

export default userSlice.reducer;
