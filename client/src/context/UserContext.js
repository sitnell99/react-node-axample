import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import { useHistory } from "react-router-dom";
import {useQuery} from "@apollo/client";
import getUserData from "../queries/getUserData";

const UserContext = createContext();

const UserContextProvider = (props) => {

    const { data, loading } = useQuery(getUserData);

    useEffect( () => {
        if (!data) {
            console.log('data', data)
        }
    }, [data])

    const history = useHistory();
    const [user, setUser] = useState(null);
    const isAuthorized = user?.phone?.length > 0;
    const logOutFunc = () => {
        setUser(null);
        history.push('/login');
        localStorage.removeItem('token');
    }
    const userContextInfo = useMemo(() => ({user, setUser, isAuthorized, logOutFunc}), [user, setUser]);
    console.log('userContextInfo', userContextInfo)
    return (
        <UserContext.Provider value={userContextInfo}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
export const useUserContext = () => useContext(UserContext);