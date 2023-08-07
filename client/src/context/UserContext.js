import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import { useHistory } from "react-router-dom";
import {useQuery} from "@apollo/client";
import getUserData from "../queries/getUserData";

const UserContext = createContext();

const UserContextProvider = (props) => {

    const { data, loading } = useQuery(getUserData);

    const history = useHistory();
    const [user, setUser] = useState(null);

    const isAuthorized = user?.phone?.length > 0;

    useEffect(() => {
        if (!isAuthorized && data) {
            console.log('data', data)
        }
    }, [data])


    const logOutFunc = () => {
        setUser(null);
        history.push('/login');
        localStorage.removeItem('token');
    }

    const userContextInfo = useMemo(() => ({user, setUser, isAuthorized, logOutFunc}), [user, setUser]);

    return (
        <UserContext.Provider value={userContextInfo}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
export const useUserContext = () => useContext(UserContext);