import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import getUserData from "../queries/getUserData";

const UserContext = createContext();

const UserContextProvider = (props) => {

    const [getUserInfo] = useLazyQuery(getUserData, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const [user, setUser] = useState(null);

    const isAuthorized = user?.phone?.length > 0;

    const logOutFunc = useCallback(() => {
        setUser(null);
        navigate('/login');
        localStorage.removeItem('token');
    }, [navigate]);

    useEffect(() => {
        if (!isAuthorized && token) {
            getUserInfo().then((res) => {
                if(res.error) {
                    logOutFunc();
                } else if(!res.loading && res.data) {
                    setUser(res.data.getUserData);
                }
            });
        }
    }, [token, isAuthorized, getUserInfo, logOutFunc])

    const userContextInfo = useMemo(() => ({user, setUser, isAuthorized, logOutFunc}), [user, setUser, logOutFunc, isAuthorized]);

    return (
        <UserContext.Provider value={userContextInfo}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
export const useUserContext = () => useContext(UserContext);