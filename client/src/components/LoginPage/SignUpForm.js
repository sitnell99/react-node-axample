import classes from './LoginPage.module.css';
import {useMutation} from "@apollo/client";
import AddNewUser from '../../mutations/addNewUser';
import {Form, Input} from 'informed';

const SighUpForm = (props) => {

    const {switchButton} = props;
    const [addNewUser, {data}] = useMutation(AddNewUser);

    const handleAddNewUser = formValues => {
        try {
            addNewUser({variables: {...formValues.values}});
            return data
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <div className={classes.formContainer}>
            <h1>Sign Up</h1>
            <Form onSubmit={handleAddNewUser}>
                <div className={classes.formItem}>
                    <Input
                        type="text"
                        name="firstname"
                        placeholder='Firstname'
                        required
                    />
                </div>
                <div className={classes.formItem}>
                    <Input
                        type="text"
                        name="lastname"
                        placeholder='Lastname'
                        required
                    />
                </div>
                <div className={classes.formItem}>
                    <Input
                        type="text"
                        name="phone"
                        placeholder='Phone number'
                        required
                    />
                </div>
                <div className={classes.formItem}>
                    <Input
                        type="date"
                        name="birthdate"
                        placeholder='Birthdate'
                        required
                    />
                </div>
                <div className={classes.formItem}>
                    <Input
                        type="password"
                        name="password"
                        placeholder='Password'
                        required
                    />
                </div>
                <div className={classes.formItem}>
                    <Input
                        type="password"
                        name="password_confirm"
                        placeholder='Confirm Password'
                        required
                    />
                </div>
                <div className={classes.formItem}>
                    <button className={classes.blackBtn} type="submit">Continue</button>
                    {switchButton}
                </div>
            </Form>
        </div>
    )
}

export default SighUpForm;