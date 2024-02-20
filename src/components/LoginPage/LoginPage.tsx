import {FC, ReactElement, useState} from "react";
import SighUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import classes from "../../css/FormClasses.module.css";
import {Navigate} from "react-router-dom";
import {useUserContext} from "../../context/UserContext";

const LoginPage: FC = () => {

    const [defaultForm, setDefaultForm] = useState<boolean>(true);
    const {isAuthorized} = useUserContext();

    if(isAuthorized) {
        return <Navigate to={'/'}/>;
    }

    const toggle = (): void => {
        if(defaultForm) {
            setDefaultForm(false);
        } else {
            setDefaultForm(true);
        }
    };

    enum buttonTexts {
        signUp =  'Switch To Sign Up',
        signIn = 'Switch To Sign In'
    }

    type buttonText = buttonTexts;

    const buttonText: buttonText = defaultForm ? buttonTexts.signUp : buttonTexts.signIn;
    const switchButton: ReactElement = (
        <button
            onClick={toggle}
            className={classes.blackBtn}
        >
            {buttonText}
        </button>
    );

    return (
        <>
        { defaultForm
            ? <SignInForm switchButton={switchButton}/>
            // @ts-ignore
            : <SighUpForm switchButton={switchButton} setDefaultForm={setDefaultForm}/>
        }
        </>
    )

}
export default LoginPage;
