import classes from './Main.module.css';
import Header from "../Header";
import Routes from "../Routes";
import Footer from "../Footer";


const Main = () => {

    return (
        <main className={classes.container}>
            <Header />
            <div className={classes.content}>
                <Routes />
            </div>
            <Footer />
        </main>
    )
}
export default Main