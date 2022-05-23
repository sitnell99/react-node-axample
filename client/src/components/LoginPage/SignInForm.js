import classes from './LoginPage.module.css';

const SignInForm = (props) => {

    const { switchButton } = props;

    const handleLogIn = () => {

    };

    return (
        <div className={classes.formContainer}>
                <h1>Sign In</h1>
                <form onSubmit={handleLogIn}>
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
                            type="password"
                            name="password"
                            placeholder='Password'
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

export default SignInForm;