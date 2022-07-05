import classes from './Navigation.module.css';
import {useUserContext} from "../../context/UserContext";
import {Link} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import {useModal} from "../../util/useModal";

const Navigation = () => {

    const { showModal: openMenu, toggleModal: toggleMenu, modalRef: menuRef } = useModal();
    const {logOutFunc, user} = useUserContext();
    const hideNavigation = !openMenu ? classes.hideNavigation : '';

    return (
        <>
            <button className={classes.trigger} onClick={toggleMenu}>
                <MenuIcon />
                {user.firstname}
            </button>

            <div className={`${classes.navigationBlock} ${hideNavigation}`} ref={menuRef}>
                <ul>
                    <li>
                        <Link to={'/cabinet'} onClick={toggleMenu}>Personal information</Link>
                    </li>
                    <li>
                        <Link to={'/notes'} onClick={toggleMenu}>My notes</Link>
                    </li>
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