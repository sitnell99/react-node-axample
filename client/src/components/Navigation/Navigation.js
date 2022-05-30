import classes from './Navigation.module.css';
import {useUserContext} from "../../context/UserContext";
import {useState} from "react";
import {Link} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const Navigation = () => {

    const [openMenu, setOpenMenu] = useState(true);
    const {logOutFunc, user} = useUserContext();
    const toggleMenu = () => {
        if (openMenu) {
            setOpenMenu(false)
        } else {
            setOpenMenu(true)
        }
    };
    const hideNavigation = !openMenu ? classes.hideNavigation : '';

    return (
        <>
            <button className={classes.trigger} onClick={toggleMenu}>
                <MenuIcon />
                {user.firstname}
            </button>

            <div className={`${classes.navigationBlock} ${hideNavigation}`}>
                <ul>
                    <li>
                        <Link to={'/cabinet'} onClick={toggleMenu}>Personal information</Link>
                    </li>
                    <li>{'My notes'}</li>
                    <li>{'News'}</li>
                    <li>{'Other members'}</li>
                    <li>
                        <button onClick={logOutFunc}>Log Out</button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Navigation;