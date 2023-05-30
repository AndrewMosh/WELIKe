import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const officersSlice = createSlice({
  name: "officers",
  initialState: {
    loading: false,
    error: null,
    user: null,
    officers: [],
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    log: (state) => {
      state.loading = true;
      state.error = null;
    },
    hasError: (state, action) => {
      state.error = action.payload;
    },
    fetchOfficers: (state, action) => {
      state.officers = action.payload;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
  },
});

export const { log, startLoading, fetchOfficers, hasError, registerStart } =
  officersSlice.actions;

export const allWorkers = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    await axios
      .get("https://skillfactory-final-project.herokuapp.com/api/officers/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => dispatch(fetchOfficers(response.data)));
  } catch (e) {
    dispatch(hasError(e.message));
  }
};
export const registerOfficer = (userData) => async (dispatch) => {
  dispatch(registerStart());

  try {
    await axios.post(
      "https://skillfactory-final-project.herokuapp.com/api/officers",
      userData
    );
  } catch (e) {
    dispatch(hasError(e.message));
  }
};

export default officersSlice.reducer;
