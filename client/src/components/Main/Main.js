import classes from './Main.module.css';
import Header from "../Header";
import Routes from "../Routes";
import Footer from "../Footer";
import {useUserContext} from "../../context/UserContext";
import Navigation from "../Navigation";

const Main = () => {

    const { isAuthorized } = useUserContext();

    return (
        <main className={classes.container}>
            <Header />
            { isAuthorized && <Navigation />}
            <div className={classes.content}>
                <Routes />
            </div>
            <Footer />
        </main>
    )
}
export default Main