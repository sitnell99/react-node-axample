import classes from './Header.module.css';
import {Link} from "react-router-dom";
import {useUserContext} from "../../context/UserContext";
import Navigation from "../Navigation";
import NavTrigger from "../Navigation/NavTrigger";
import {useModal} from "../../util/useModal";

const Header = () => {

    const { isAuthorized } = useUserContext();

    const {
        showModal: openMenu,
        toggleModal: toggleMenu,
        modalRef: menuRef,
        triggerRef: triggerMenuRef
    } = useModal();

    return (
        <>
            <header className={classes.header}>
                <nav>
                    <Link to='/news'>News</Link>
                    {!isAuthorized && <Link to='/login'>Login</Link>}
                </nav>
                {isAuthorized && (
                    <NavTrigger
                        openMenu={openMenu}
                        toggleMenu={toggleMenu}
                        triggerMenuRef={triggerMenuRef}
                    />
                )}
            </header>
            {isAuthorized && (
                <Navigation
                    menuRef={menuRef}
                    openMenu={openMenu}
                    toggleMenu={toggleMenu}
                />
            )}
        </>
    );
};

export default Header;
