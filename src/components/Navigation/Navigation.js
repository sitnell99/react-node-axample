import classes from './Navigation.module.css';
import {useUserContext} from "../../context/UserContext";
import {Link} from "react-router-dom";
import {useModal} from "../../util/useModal";
import {useState} from "react";
import OtherMembers from "../OtherMembers";
import {isMobile} from 'react-device-detect';

const Navigation = () => {

    const { showModal: openMenu, toggleModal: toggleMenu, modalRef: menuRef, triggerRef: triggerMenuRef } = useModal();
    const [showMembers, setShowMembers] = useState(false);
    const toggleMembers = () => setShowMembers(!showMembers);

    const {logOutFunc, user} = useUserContext();
    const hideNavigation = !openMenu ? classes.hideNavigation : '';
    const hideMembers =
        showMembers
            ? 'translate-y-0 opacity-100 visible h-full'
            : '-translate-y-36 opacity-0 invisible -z-10 h-0';

    return (
        <>
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
        </>
    )
}

export default Navigation;