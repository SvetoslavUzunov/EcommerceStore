import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import ConfirmDialog from '../Common/ConfirmDialog/ConfirmDialog';
import * as userConstants from '../../constants/userConstants';
import * as userService from '../../services/userService';
import profileIcon from './profileIcon.png';

const UserCard = ({
    user
}) => {
    const { auth } = useAuthContext();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { addNotification } = useNotificationContext();

    const deleteHandler = (e) => {
        e.preventDefault();

        userService.removeAsync(user?.id, auth.accessToken)
            .then(() => {
                addNotification(userConstants.DeleteAccountAsAdmin, types.success);
            })
            .finally(() => {
                setShowDeleteDialog(false);
            })

        // this.forceUpdate();
    };

    const deleteClickHandler = (e) => {
        e.preventDefault();

        setShowDeleteDialog(true);
    };

    return (
        <>
            <ConfirmDialog show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onDelete={deleteHandler} />
            <div className="container">
                <div className="row card-header">
                    <div className="card text-center mb-3">
                        <div className="card-header">
                            Profile details
                        </div>
                        <div className="card-body">
                            <figure><img className='center' src={profileIcon}></img></figure>
                            <p className="card-text text-secondary">Username: {user?.userName}</p>
                            <p className='card-text text-secondary'>Email address: {user?.email}</p>
                            <Link className="button remove-button" to={`#`} onClick={deleteClickHandler}>Delete account</Link>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        </>
    );
}

export default UserCard; 