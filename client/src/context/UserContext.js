import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {useQuery} from "@apollo/client";
import getUserData from "../queries/getUserData";

const UserContext = createContext();

const UserContextProvider = (props) => {

    const { data } = useQuery(getUserData);

    const history = useNavigate();
    const [user, setUser] = useState(null);

    const isAuthorized = user?.phone?.length > 0;

    useEffect(() => {
        if (!isAuthorized && data) {
            console.log('data', data)
        }
    }, [data, isAuthorized])


    const logOutFunc = useCallback(() => {
        setUser(null);
        history.push('/login');
        localStorage.removeItem('token');
    }, [history]);

    const userContextInfo = useMemo(() => ({user, setUser, isAuthorized, logOutFunc}), [user, setUser, logOutFunc, isAuthorized]);

    return (
        <UserContext.Provider value={userContextInfo}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
export const useUserContext = () => useContext(UserContext);