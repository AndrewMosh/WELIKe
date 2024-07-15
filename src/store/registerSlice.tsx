import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    clientId?: string;
}

interface RegisterResponse {
    message: string;
}

export const registerUser = createAsyncThunk<RegisterResponse, RegisterData, { rejectValue: string }>(
    "register/registerUser",
    async (RegisterData, { rejectWithValue }) => {
        try {
            const response = await axios.post<RegisterResponse>(
                "https://skillfactory-final-project.herokuapp.com/api/officers",
                RegisterData
            );
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string }>;
                return rejectWithValue(axiosError.response?.data.message || "Registration failed");
            }
            return rejectWithValue("Unknown error occurred");
        }
    }
);

export interface RegisterState {
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: RegisterState = {
    loading: false,
    error: null,
    success: false,
};

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Registration failed";
            });
    },
});

export default registerSlice.reducer;
