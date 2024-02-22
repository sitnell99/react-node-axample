import classes from "./Navigation.module.css";
import {isMobile} from "react-device-detect";
import {useUserContext} from "../../context/UserContext";
import {MutableRefObject} from "react";
import {useSelector} from "react-redux";
import {userFirstname} from "../../store/selectors/user";

type navTriggerProps = {
    openMenu: boolean,
    toggleMenu: () => void,
    triggerMenuRef: MutableRefObject<any>
}

const NavTrigger = (props: navTriggerProps) => {

    const {openMenu, toggleMenu, triggerMenuRef} = props;
    //const {user} = useUserContext();
    const userName = useSelector(userFirstname)

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
            {!isMobile && userName}
        </button>
    );
};

export default NavTrigger;
