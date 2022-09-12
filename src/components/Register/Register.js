import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import * as authService from '../../services/authenticationService';
import * as authenticationConstants from '../../constants/authenticationConstants';

const Register = () => {
    const { login } = useAuthContext();
    const { addNotification } = useNotificationContext();
    const navigate = useNavigate();

    const onRegisterHandler = (e) => {
        e.preventDefault();

        let { userName, email, password } = Object.fromEntries(new FormData(e.currentTarget));

        authService.registerAsync(userName, email, password)
            .then((authData) => {
                authService.loginAsync(email, password)
                    .then((authData => {
                        login(authData);
                        navigate('/');
                        addNotification(authenticationConstants.SuccesfullyRegistration, types.success);
                    }))
                login(authData); //TODO: to remove?
            }).catch((error) => {
                addNotification(authenticationConstants.FailedRegistration, types.error);
                console.log(error);
            });
    }

    return (
        <section id="register-page" className="register">
            <form id="register-form" method="POST" onSubmit={onRegisterHandler}>
                <fieldset>
                    <legend>Register form</legend>
                    <p className="field">
                        <label htmlFor="userName">Username</label>
                        <span className="input">
                            <input type="text" name="userName" id="userName" placeholder="Username" />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="email">Email</label>
                        <span className="input">
                            <input type="text" name="email" id="email" placeholder="Email" />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="password">Password</label>
                        <span className="input">
                            <input type="password" name="password" id="password" placeholder="Password" />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="repeat-pass">Repeat Password</label>
                        <span className="input">
                            <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password" />
                        </span>
                    </p>
                    <input className="button submit" type="submit" value='Register' />
                </fieldset>
            </form>
        </section>
    );
}

export default Register;