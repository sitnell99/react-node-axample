import classes from "./Navigation.module.css";
import {isMobile} from "react-device-detect";
import {useUserContext} from "../../context/UserContext";
import {bool, func, object} from "prop-types";

const NavTrigger = props => {

    const {openMenu, toggleMenu, triggerMenuRef} = props;
    const {user} = useUserContext();

    return (
        <button className={classes.trigger} onClick={toggleMenu} ref={triggerMenuRef}>
            {openMenu ?
                (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>)
                :
                (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                      stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                </svg>)
            }
            {!isMobile && user.firstname}
        </button>
    );
};

NavTrigger.propTypes = {
    openMenu: bool,
    toggleMenu: func,
    triggerMenuRef: object
};

export default NavTrigger;