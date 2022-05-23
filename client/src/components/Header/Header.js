import classes from './Header.module.css';
import {Link} from "react-router-dom";

const Header = () => {

    return (
        <header className={classes.header}>
            <nav>
                <Link to='/news'>News</Link>
                <Link to='/login'>Login</Link>
            </nav>
        </header>
    )

}

export default Header;