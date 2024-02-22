import classes from "../../css/FormClasses.module.css";
import {useMutation} from "@apollo/client";
import AddNewUser from '../../api/mutations/addNewUser';
import {Form, Input} from 'informed';
import {useFormValidation} from "../../util/useFormValidation";
import {Dispatch, FC, ReactElement, SetStateAction, useEffect, useState} from "react";
import {resultMessages} from "../../types/resultMessages";

type signUpFormProps = {
    switchButton: ReactElement,
    setDefaultForm: Dispatch<SetStateAction<boolean>>
}
const SighUpForm: FC = (props: signUpFormProps) => {

    const {switchButton, setDefaultForm} = props;

    const [resultMessage, setResultMessage] = useState<resultMessages>(resultMessages.empty);

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

    const handleAddNewUser = async formValues => {
        if (!hasAnyFieldError) {
            const signUpValues = {...formValues.values}
            const { password_confirm, ...rest } = signUpValues;
            try {
                const response = await addNewUser({variables: rest});
                if(response.data?.addNewUser) {
                    setResultMessage(resultMessages.userAdded);
                }
            } catch (error) {
                console.log(error);
                setResultMessage(error.toString());
            }
        }

    };

    useEffect(() => {
        setTimeout(() => {
            if(resultMessage) {
                setResultMessage(resultMessages.empty)
                setDefaultForm(true);
            }
        }, 2000)
    }, [resultMessage, setDefaultForm])

    if (!resultMessage) {
        return (
            <div className={classes.formContainer}>
                <h1 className={'text-xl font-bold pb-3'}>Sign Up</h1>
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
