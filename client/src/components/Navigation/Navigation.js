import classes from './Navigation.module.css';
import {useUserContext} from "../../context/UserContext";
import {Link} from "react-router-dom";
import {useModal} from "../../util/useModal";

const Navigation = () => {

    const { showModal: openMenu, toggleModal: toggleMenu, modalRef: menuRef } = useModal();
    const {logOutFunc, user} = useUserContext();
    const hideNavigation = !openMenu ? classes.hideNavigation : '';

    return (
        <>
            <button className={classes.trigger} onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
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