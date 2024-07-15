import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

interface UserRequest {
    id?: number;
    name?: string;
    email: string;
    password: string;
}

interface UserResponse {
    id: number;
    name: string;
    email: string;
}

interface LoginResponse {
    user: UserResponse;
    token: string;
}

export const login = createAsyncThunk<LoginResponse, UserRequest, { rejectValue: string }>(
    "auth/login",
    async (newUser: UserRequest, { rejectWithValue }) => {
        try {
            const response: AxiosResponse<LoginResponse> = await axios.post(
                "https://skillfactory-final-project.herokuapp.com/api/auth/sign_in",
                newUser
            );
            return response.data;
        } catch (error) {
            return rejectWithValue("Login failed");
        }
    }
);

export interface AuthState {
    loading: boolean;
    error: string | null;
    user: UserResponse | null;
    token: string | null;
}

const initialState: AuthState = {
    loading: false,
    error: null,
    user: null,
    token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.loading = false;
            state.error = null;
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Login failed";
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
