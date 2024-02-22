import {createAsyncThunk} from "@reduxjs/toolkit";
import {LazyQueryExecFunction} from "@apollo/client";
import {OperationVariables} from "apollo-boost";

export const initUserThunk = createAsyncThunk(
    'USER/INIT_USER',
    async (getUserInfo: LazyQueryExecFunction<any, OperationVariables>) => {
        const userInfo = await getUserInfo();

        if(userInfo.data.getUserData.id.length > 0) {
            return userInfo.data.getUserData;
        } else {
            throw new Error('Sorry, we have no user information.')
        }
    });

