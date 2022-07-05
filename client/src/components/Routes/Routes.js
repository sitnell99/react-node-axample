import {Route, Switch, Redirect} from "react-router-dom";
import News from "../News";
import LoginPage from "../LoginPage/LoginPage";
import {useUserContext} from "../../context/UserContext";
import Cabinet from "../Cabinet";
import Notes from "../Notes/Notes";

const Routes = () =>  {

    const { isAuthorized } = useUserContext();

    return (
        <Switch>
            <Route exact path={'/news'} component={News} />
            <Route exact path={'/notes'} component={Notes} />
            <Route exact path='/login' component={LoginPage}>
                {isAuthorized && <Redirect to={'/'}/>}
            </Route>
            <Route exact path={'/cabinet'} component={Cabinet}>
                {!isAuthorized && <Redirect to={'/'}/>}
            </Route>
        </Switch>
    )
}
export default Routes;