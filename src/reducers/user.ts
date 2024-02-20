import {createSlice} from "@reduxjs/toolkit";

let initialState = {
    id: '',
    phone: '',
    lastname: '',
    birthdate: '',
    firstname: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initUser(state: typeof initialState = initialState, action) {
            if(action?.payload?.id) {
                return action.payload;
            }
        },
        updateUser(state, action) {
            console.log('updateUser action')
        },
    }
});

export const { initUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
