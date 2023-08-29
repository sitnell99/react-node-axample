import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import getUserData from "../queries/getUserData";

const UserContext = createContext();

const UserContextProvider = (props) => {

    const [getUserInfo, { data }] = useLazyQuery(getUserData, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const [user, setUser] = useState(null);

    const isAuthorized = user?.phone?.length > 0;

    useEffect(() => {
        if (!isAuthorized && token) {
            getUserInfo().then(() => data && setUser(data.getUserData));
        }
    }, [token, isAuthorized, data, getUserInfo])

    const logOutFunc = useCallback(() => {
        setUser(null);
        navigate('/login');
        localStorage.removeItem('token');
    }, [navigate]);

    const userContextInfo = useMemo(() => ({user, setUser, isAuthorized, logOutFunc}), [user, setUser, logOutFunc, isAuthorized]);

    return (
        <UserContext.Provider value={userContextInfo}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
export const useUserContext = () => useContext(UserContext);