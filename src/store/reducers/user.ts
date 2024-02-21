import {createSlice} from "@reduxjs/toolkit";

let initialState = {
    id: '',
    phone: '',
    lastname: '',
    birthdate: '',
    firstname: '',
};

const userSlice = createSlice({
    name: 'USER',
    initialState,
    reducers: {
        INIT_USER(state: typeof initialState = initialState, action) {
            if(action?.payload?.id) {
                return action.payload;
            }
        },
        UPDATE_USER(state, action) {
            console.log('updateUser action')
        },
    }
});

export const { INIT_USER, UPDATE_USER } = userSlice.actions;
export default userSlice.reducer;
