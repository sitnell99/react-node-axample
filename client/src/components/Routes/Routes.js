import {Route, Switch} from "react-router-dom";
import News from "../News";
import LoginPage from "../LoginPage/LoginPage";

const Routes = () =>  {
    return (
        <Switch>
            <Route exact path={'/news'} component={News} />
            <Route exact path='/login' component={LoginPage}/>
        </Switch>
    )
}
export default Routes;