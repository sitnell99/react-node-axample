import {useState} from "react";
import SighUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import classes from "../../css/FormClasses.module.css";
import {Navigate} from "react-router-dom";
import {useUserContext} from "../../context/UserContext";

const LoginPage = () => {

    const [defaultForm, setDefaultForm] = useState(true);
    const {isAuthorized} = useUserContext();

    if(isAuthorized) {
        return <Navigate to={'/'}/>;
    }

    const toggle = () => {
        if(defaultForm) {
            setDefaultForm(false);
        } else {
            setDefaultForm(true);
        }
    };
    const buttonText = defaultForm ? 'Switch To Sign Up' : 'Switch To Sign In';
    const switchButton = <button className={classes.blackBtn} onClick={toggle}>{buttonText}</button>;

    return (
        <>
        { defaultForm
            ? <SignInForm switchButton={switchButton}/>
            : <SighUpForm switchButton={switchButton} setDefaultForm={setDefaultForm}/>
        }
        </>
    )

}
export default LoginPage;