import {useState} from "react";
import SighUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import classes from "../../css/FormClasses.module.css";
import {useUserContext} from "../../context/UserContext";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

    const { isAuthorized } = useUserContext();
    const navigate = useNavigate();

    if(isAuthorized) {
        return navigate('/');
    }

    const [defaultForm, setDefaultForm] = useState(true);
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