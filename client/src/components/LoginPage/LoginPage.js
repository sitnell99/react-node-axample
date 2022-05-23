import classes from './LoginPage.module.css';

const LoginPage = () => {

    const handleLogIn = () => {

    };

    return (
            <div className={`${classes.formContainer} ${classes.editFormContainer}`}>
                <h1>Атвторизація</h1>
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
                        <button className={classes.blackBtn} type="submit">Вхід</button>
                    </div>
                </form>
            </div>
    )
}

export default LoginPage;