import {configureStore, Tuple} from "@reduxjs/toolkit";
import userReducer from './store/reducers/user';
import log from './store/middleware/log';

let store = configureStore({
    reducer: {
        user: userReducer
    },
    middleware: () => new Tuple(log),
});

export default store;
