import classes from './Footer.module.css';

const Footer = () => {

    const date = new Date().getFullYear();

    return (
        <footer className={classes.footer}>
            <span> © Roadmap - {date}</span>
        </footer>
    )

}

export default Footer;