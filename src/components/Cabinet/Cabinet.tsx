import classes from '../../css/FormClasses.module.css';
import cabinetClasses from './Cabinet.module.css';
import {Form, Input} from "informed";
import {useFormValidation} from "../../util/useFormValidation";
import {useUserContext} from "../../context/UserContext";
import {useMutation} from "@apollo/client";
import UpdateUserData from "../../api/mutations/updateUserData";
import {useState, useEffect, FC} from "react";
import {Navigate} from "react-router-dom";
import {resultMessages} from "../../types/resultMessages";
import {useSelector} from "react-redux";
import {userInformation} from "../../store/selectors/user";

const Cabinet: FC = () => {

    //const {user, setUser} = useUserContext();
    const [updateUserData] = useMutation(UpdateUserData);
    const user = useSelector(userInformation)
    const [resultMessage, setResultMessage] = useState<resultMessages>(resultMessages.empty);

    const {
        validatePassword,
        validateConfirmPassword,
        hasAnyFieldError,
        confirmPasswordError,
        passwordError,
        hasAnyFieldChanges,
        setHasAnyFieldChanges
    } = useFormValidation();

    const handleEditInformation = async formValues => {
        try {
            if (!hasAnyFieldError && hasAnyFieldChanges) {
                const values = {...formValues.values}
                const {password_confirm, ...rest} = values;
                const response = await updateUserData({variables: {...rest, id: user.id}});
                if (response.data?.updateUserData) {
                    //await setUser(response.data.updateUserData)
                }
                setResultMessage(resultMessages.updatedInfo);
                setHasAnyFieldChanges(false);
            } else {
                setResultMessage(resultMessages.changeInfo);
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            if (resultMessage) {
                setResultMessage(resultMessages.empty)
            }
        }, 2000)
    }, [resultMessage])

    if(!user) {
        return <Navigate to={'/'}/>;
    }

    if (!resultMessage) {
        return (
            <div className={classes.formContainer}>
                <h1 className={'text-2xl font-bold pb-4'}>User information</h1>
                <Form onSubmit={handleEditInformation}>
                    <div className={`${classes.formItem} ${cabinetClasses.disabled}`}>
                        <label className={'text-lg font-bold'}>{'Phone number'}</label>
                        <Input
                            type="text"
                            name="phone"
                            placeholder='Phone number'
                            initialValue={user.phone}
                        />
                    </div>
                    <div className={classes.formItem}>
                        <label className={'text-lg font-bold'}>{'Firstname'}</label>
                        <Input
                            type="text"
                            name="firstname"
                            placeholder='Firstname'
                            initialValue={user.firstname}
                            onChange={(value) => setHasAnyFieldChanges(true)}
                        />
                    </div>
                    <div className={classes.formItem}>
                        <label className={'text-lg font-bold'}>{'Lastname'}</label>
                        <Input
                            type="text"
                            name="lastname"
                            placeholder='Lastname'
                            initialValue={user.lastname}
                            onChange={(value) => setHasAnyFieldChanges(true)}
                        />
                    </div>
                    <div className={classes.formItem}>
                        <label className={'text-lg font-bold'}>{'Birthdate'}</label>
                        <Input
                            type="date"
                            name="birthdate"
                            placeholder='Birthdate'
                            initialValue={user.birthdate}
                            onChange={(value) => setHasAnyFieldChanges(true)}
                        />
                    </div>
                    <div className={classes.formItem}>
                        <label className={'text-lg font-bold'}>{'Password'}</label>
                        <Input
                            type="password"
                            name="password"
                            placeholder='Password'
                            onChange={(value) => validatePassword(value.value)}
                        />
                        {passwordError &&
                            <small>{'A password must contain at least 3 of the following: lowercase, uppercase, digits, special characters.'}</small>}
                    </div>
                    <div className={classes.formItem}>
                        <label className={'text-lg font-bold'}>{'Confirm password'}</label>
                        <Input
                            type="password"
                            name="password_confirm"
                            placeholder='Confirm password'
                            onChange={(value) => validateConfirmPassword(value.value)}
                        />
                        {confirmPasswordError && <small>{'Passwords must match.'}</small>}
                    </div>
                    <div className={`${classes.formItem} ${classes.formButton}`}>
                        <button className={classes.blackBtn} type="submit">Edit information</button>
                    </div>
                </Form>
            </div>
        )
    } else {
        return <h1 className={classes.resultTitle}>{resultMessage}</h1>
    }
}

export default Cabinet;
