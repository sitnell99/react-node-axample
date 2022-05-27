import classes from './Header.module.css';
import {Link} from "react-router-dom";
import {useUserContext} from "../../context/UserContext";

const Header = () => {

    const { isAuthorized, setUser } = useUserContext();

    return (
        <header className={classes.header}>
            <nav>
                <Link to='/news'>News</Link>
                <Link to='/login'>Login</Link>
            </nav>
            { isAuthorized && <button onClick={setUser(null)}>Log Out</button> }
        </header>
    )

}

export default Header;