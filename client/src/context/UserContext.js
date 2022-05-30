import {createContext, useContext, useMemo, useState} from 'react';
import { useHistory } from "react-router-dom";

const UserContext = createContext();

const UserContextProvider = (props) => {

    const history = useHistory();
    const [user, setUser] = useState(null);
    const isAuthorized = user?.phone?.length > 0;
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