import classes from './LoginPage.module.css';

const SighUpForm = (props) => {

    const { switchButton } = props;
    const handleLogIn = () => {

    };

    return (
        <div className={classes.formContainer}>
            <h1>Sign Up</h1>
            <form onSubmit={handleLogIn}>
                <div className={classes.formItem}>
                    <input
                        type="text"
                        name="firstname"
                        placeholder='Firstname'
                        required
                    />
                </div>
                <div className={classes.formItem}>
                    <input
                        type="text"
                        name="lastname"
                        placeholder='Lastname'
                        required
                    />
                </div>
                <div className={classes.formItem}>
                    <input
                        type="text"
                        name="login"
                        placeholder='Login'
                        required
                    />
                </div>
                <div className={classes.formItem}>
                    <input
                        type="date"
                        name="birthdate"
                        placeholder='Birthdate'
                        required
                    />
                </div>
                <div className={classes.formItem}>
                    <input
                        type="password"
                        name="password"
                        placeholder='Password'
                        required
                    />
                </div>
                <div className={classes.formItem}>
                    <input
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
            </form>
        </div>
    )
}

export default SighUpForm;