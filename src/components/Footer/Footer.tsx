import classes from './Footer.module.css';
import {FC} from "react";

const Footer: FC = () => {

    const date: number = new Date().getFullYear();

    return (
        <footer className={classes.footer}>
            <span> © Roadmap - {date}</span>
        </footer>
    )
}

export default Footer;
