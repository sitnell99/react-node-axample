import classes from './Navigation.module.css';
import {useUserContext} from "../../context/UserContext";
import {Link} from "react-router-dom";
import {useState} from "react";
import OtherMembers from "../OtherMembers";
import {bool, func, object} from "prop-types";

const Navigation = props => {

    const {openMenu, toggleMenu, menuRef} = props;
    const [showMembers, setShowMembers] = useState(false);
    const toggleMembers = () => setShowMembers(!showMembers);

    const {logOutFunc} = useUserContext();
    const hideNavigation = !openMenu ? classes.hideNavigation : '';
    const hideMembers =
        showMembers
            ? 'translate-y-0 opacity-100 visible h-16rem overflow-y-scroll'
            : '-translate-y-36 opacity-0 invisible -z-10 h-0';

    return (
        <div className={`${classes.navigationBlock} ${hideNavigation}`} ref={menuRef}>
            <ul>
                <li>
                    <Link to={'/cabinet'} onClick={toggleMenu}>Personal information</Link>
                </li>
                <li>
                    <Link to={'/notes'} onClick={toggleMenu}>My notes</Link>
                </li>
                <li>
                    <Link to={'/news'} onClick={toggleMenu}>News</Link>
                </li>
                <li>
                    <button className={`flex justify-between w-full`} onClick={toggleMembers}>
                        {'Other members'}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 transition-all ${showMembers ? 'rotate-180' : ''}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                </li>
                <ul className={`${classes.membersList} ${hideMembers} relative transition-all`}>
                    {showMembers && <OtherMembers classes={classes} />}
                </ul>
                <li>
                    <button onClick={logOutFunc}>Log Out</button>
                </li>
            </ul>
        </div>
    );
};

Navigation.propTypes = {
    openMenu: bool,
    menuRef: object,
    toggleMenu: func,
};

export default Navigation;