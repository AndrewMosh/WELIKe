import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export interface Officer {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    password: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    zip: string;
    description: string;
    avatar: string;
    approved: boolean;
}

export interface OfficerState {
    loading: boolean;
    error: string | null;
    user: Officer | null;
    officers: Officer[];
}

const initialState: OfficerState = {
    loading: false,
    error: null,
    user: null,
    officers: [],
};

const officersSlice = createSlice({
    name: "officers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOfficers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOfficers.fulfilled, (state, action: PayloadAction<Officer[]>) => {
                state.loading = false;
                state.officers = action.payload;
            })
            .addCase(getOfficers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An error occurred";
            });
    },
});

export const getOfficers = createAsyncThunk<Officer[], void, { rejectValue: string }>(
    "officers/fetchOfficers",
    async (_, { rejectWithValue }) => {
        try {
            const response: AxiosResponse<Officer[]> = await axios.get("https://skillfactory-final-project.herokuapp.com/api/officers/", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue("Failed to fetch officers");
        }
    }
);

export default officersSlice.reducer;
