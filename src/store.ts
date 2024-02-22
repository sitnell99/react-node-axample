import {configureStore, Tuple} from "@reduxjs/toolkit";
import userReducer from './store/reducers/user';
import log from './store/middleware/log';
import {thunk} from 'redux-thunk';

let store = configureStore({
    reducer: {
        user: userReducer
    },
    middleware: () => new Tuple(thunk, log),
});

export type AppDispatch = typeof store.dispatch;

export default store;
