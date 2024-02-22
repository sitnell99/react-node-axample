import {createSlice} from "@reduxjs/toolkit";
import {initUserThunk as INIT_USER} from "../actions/user/asyncThunks";

const initialState = {
    info: {
        id: '',
        phone: '',
        lastname: '',
        birthdate: '',
        firstname: '',
    },
    isLoading: false,
    error: null,
    isAuthorized: false
};

const userSlice = createSlice({
    name: 'USER',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(INIT_USER.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(INIT_USER.fulfilled, (state, action) => {
            state.isLoading = false
            state.info = action.payload
            state.isAuthorized = true
        })
        builder.addCase(INIT_USER.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
            state.isAuthorized = false
        })
    }
});

export const { } = userSlice.actions;
export default userSlice.reducer;
