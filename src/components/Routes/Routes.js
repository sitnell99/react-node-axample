import {Route, Routes as Switch, Navigate} from "react-router-dom";
import News from "../News";
import LoginPage from "../LoginPage/LoginPage";
import {useUserContext} from "../../context/UserContext";
import Cabinet from "../Cabinet";
import Notes from "../Notes/Notes";

const Routes = () =>  {

    const { isAuthorized } = useUserContext();

    return (
        <Switch>
            <Route exact path={'/'} element={<News />} />
            <Route exact path={'/news'} element={<News />} />
            <Route exact path={'/notes'} element={<Notes />}>
                {!isAuthorized && <Route path={'*'} element={<Navigate to={'/'} replace />}/>}
            </Route>
            <Route exact path='/login' element={<LoginPage />}>
                {isAuthorized && <Route path={'*'} element={<Navigate to={'/'} replace />}/>}
            </Route>
            <Route exact path={'/cabinet'} element={<Cabinet />}>
                {!isAuthorized && <Route path={'*'} element={<Navigate to={'/'} replace />}/>}
            </Route>
        </Switch>
    )
}
export default Routes;
