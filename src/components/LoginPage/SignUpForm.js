import classes from "../../css/FormClasses.module.css";
import {useMutation} from "@apollo/client";
import AddNewUser from '../../mutations/addNewUser';
import {Form, Input} from 'informed';
import {useFormValidation} from "../../util/useFormValidation";
import {useEffect, useState} from "react";

const SighUpForm = (props) => {

    const {switchButton, setDefaultForm} = props;
    const [resultMessage, setResultMessage] = useState(false);
    const {
        validatePhone,
        validatePassword,
        validateConfirmPassword,
        hasAnyFieldError,
        confirmPasswordError,
        passwordError,
        phoneNumberError
    } = useFormValidation();

    const [addNewUser] = useMutation(AddNewUser);

    const handleAddNewUser = formValues => {
        if (!hasAnyFieldError) {
            const signUpValues = {...formValues.values}
            const { password_confirm, ...rest } = signUpValues;
            try {
                addNewUser({variables: rest});
                setResultMessage('User was successfully added, please log in');
            } catch (error) {
                console.log(error)
                setResultMessage('error happends')
            }
        }

    };

    useEffect(() => {
        setTimeout(() => {
            if(resultMessage) {
                setResultMessage(false)
                setDefaultForm(true);
            }
        }, 2000)
    }, [resultMessage, setDefaultForm])

    if (!resultMessage) {
        return (
            <div className={classes.formContainer}>
                <h1>Sign Up</h1>
                <Form onSubmit={handleAddNewUser}>
                    <div className={classes.formItem}>
                        <Input
                            type="text"
                            name="firstname"
                            placeholder='Firstname'
                        />
                    </div>
                    <div className={classes.formItem}>
                        <Input
                            type="text"
                            name="lastname"
                            placeholder='Lastname'
                        />
                    </div>
                    <div className={classes.formItem}>
                        <Input
                            type="text"
                            name="phone"
                            placeholder='Phone number'
                            required
                            formatter="+380 (##) ## ## ###"
                            onChange={(value) => validatePhone(value.value)}
                        />
                        {phoneNumberError && <small>{'Incorrect Phone Number'}</small>}
                    </div>
                    <div className={classes.formItem}>
                        <Input
                            type="date"
                            name="birthdate"
                            placeholder='Birthdate'
                        />
                    </div>
                    <div className={classes.formItem}>
                        <Input
                            type="password"
                            name="password"
                            placeholder='Password'
                            required
                            onChange={(value) => validatePassword(value.value)}
                        />
                        {passwordError && <small>{'A password must contain at least 3 of the following: lowercase, uppercase, digits, special characters.'}</small>}
                    </div>
                    <div className={classes.formItem}>
                        <Input
                            type="password"
                            name="password_confirm"
                            placeholder='Confirm Password'
                            required
                            onChange={(value) => validateConfirmPassword(value.value)}
                        />
                        {confirmPasswordError && <small>{'Passwords must match.'}</small>}
                    </div>
                    <div className={`${classes.formItem} ${classes.formButton}`}>
                        <button className={classes.blackBtn} type="submit">Continue</button>
                        {switchButton}
                    </div>
                </Form>
            </div>
        )
    } else {
        return <h1 className={classes.resultTitle}>{resultMessage}</h1>
    }
}

export default SighUpForm;