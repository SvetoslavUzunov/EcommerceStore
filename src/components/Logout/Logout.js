import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import * as authService from '../../services/authenticationService';
import * as authenticationConstants from '../../constants/authenticationConstants';
import * as productsConstants from '../../constants/productsConstants';

const Logout = () => {
    const navigate = useNavigate();
    const { auth, logout } = useAuthContext();
    const { addNotification } = useNotificationContext();

    useEffect(() => {
        authService.logoutAsync(auth.refreshToken)
            .then(() => {
                logout();
                navigate('/login');
                addNotification(authenticationConstants.SuccessfullyLogout, types.success);
                localStorage.removeItem(productsConstants.LocalStorageKey);
            })
    }, [])

    return null;
};

export default Logout;