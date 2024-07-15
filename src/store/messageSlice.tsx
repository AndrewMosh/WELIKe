import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

interface Message {
    id: number;
    name: string;
    email: string;
    message: string;
}

export interface MessageState {
    loading: boolean;
    error: string | null;
    messages: Message[];
}

export const getMessages = createAsyncThunk<Message[], void, { rejectValue: string }>(
    "messages/fetchMessages",
    async (_, { rejectWithValue }) => {
        try {
            const response: AxiosResponse<Message[]> = await axios.get("https://skillfactory-final-project.herokuapp.com/api/cases/", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue("Failed to fetch messages");
        }
    }
);

const initialState: MessageState = {
    loading: false,
    error: null,
    messages: [],
};

const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMessages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(getMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An error occurred";
            });
    },
});

export default messageSlice.reducer;
