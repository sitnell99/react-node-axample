import {createContext, useContext, useMemo, useState} from 'react';

const UserContext = createContext();

const UserContextProvider = (props) => {

    const [user, setUser] = useState(null);
    const isAuthorized = useMemo(() => user?.phone?.length > 0, [user]);

    const userContextInfo = useMemo(() => ({user, setUser, isAuthorized}), [user, setUser]);

    return (
        <UserContext.Provider value={userContextInfo}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
export const useUserContext = () => useContext(UserContext);