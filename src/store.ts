import {configureStore} from "@reduxjs/toolkit";
import userReducer from './reducers/user';

let store = configureStore({
    reducer: {
        user: userReducer
    }
});

export default store;
