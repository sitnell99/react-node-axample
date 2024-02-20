import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import getUserData from "../queries/getUserData";

const UserContext = createContext(null);

const UserContextProvider = ({children}) => {

    const [getUserInfo] = useLazyQuery(getUserData, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });

    const navigate = useNavigate();

    const token: string = localStorage.getItem('token');

    const [user, setUser] = useState(null);

    const isAuthorized: boolean = user?.phone?.length > 0;

    const logOutFunc = useCallback((): void => {
        setUser(null);
        navigate('/login');
        localStorage.removeItem('token');
    }, [navigate]);

    useEffect(() => {
        if (!isAuthorized && token) {
            getUserInfo().then((res): void => {
                if(res.error) {
                    logOutFunc();
                } else if(!res.loading && res.data) {
                    setUser(res.data.getUserData);
                }
            });
        }
    }, [token, isAuthorized, getUserInfo, logOutFunc])

    type UserInfo = {
        user: object,
        setUser: React.Dispatch<any>,
        logOutFunc: () => void,
        isAuthorized: boolean
    }

    const userContextInfo: UserInfo = useMemo(() => (
        {user, setUser, isAuthorized, logOutFunc})
    , [user, setUser, logOutFunc, isAuthorized]);

    return (
        <UserContext.Provider value={userContextInfo}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
export const useUserContext = () => useContext(UserContext);
