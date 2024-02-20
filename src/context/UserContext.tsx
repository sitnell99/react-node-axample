import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import getUserData from "../queries/getUserData";
import {useDispatch} from "react-redux";

const UserContext = createContext(null);

const UserContextProvider = ({children}) => {

    const [getUserInfo] = useLazyQuery(getUserData, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const token: string = localStorage.getItem('token');

    type userInfo = {
        id: string
        birthdate: string
        firstname: string
        lastname: string
        phone: string
    }

    const [user, setUser] = useState<userInfo>(null);

    const isAuthorized: boolean = user?.phone?.length > 0;

    const logOutFunc = useCallback((): void => {
        setUser(null);
        navigate('/login');
        localStorage.removeItem('token');
    }, [navigate]);

    useEffect(() => {
        if (!isAuthorized && token) {
            getUserInfo().then((res): void => {
                const {error, loading, data: {getUserData: {__typename, ...rest}} } = res;
                if(error) {
                    logOutFunc();
                } else if(!loading && rest) {
                    setUser(rest);
                    dispatch({type: 'user/initUser', payload: rest})
                }
            });
        }
    }, [token, isAuthorized, getUserInfo, logOutFunc])

    type UserContext = {
        user: object,
        setUser: React.Dispatch<any>,
        logOutFunc: () => void,
        isAuthorized: boolean
    }

    const userContextInfo: UserContext = useMemo(() => (
        {user, setUser, isAuthorized, logOutFunc}
    ), [user, setUser, logOutFunc, isAuthorized]);

    return (
        <UserContext.Provider value={userContextInfo}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
export const useUserContext = () => useContext(UserContext);
