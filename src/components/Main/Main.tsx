import classes from './Main.module.css';
import './tailwind.css';
import Header from "../Header";
import Routes from "../Routes";
import Footer from "../Footer";
import React, {FC} from "react";

const Main: FC = () => {

    return (
        <main className={classes.container}>
            <Header />
            <div className={classes.content}>
                <Routes />
            </div>
            <Footer />
        </main>
    )
};
export default Main;
