import classes from './Header.module.css';
import {Link} from "react-router-dom";
import {useUserContext} from "../../context/UserContext";
import Navigation from "../Navigation";

const Header = () => {

    const { isAuthorized } = useUserContext();

    return (
        <header className={classes.header}>
            <nav>
                <Link to='/news'>News</Link>
                {!isAuthorized && <Link to='/login'>Login</Link>}
            </nav>
            {isAuthorized && <Navigation />}
        </header>
    )

}

export default Header;