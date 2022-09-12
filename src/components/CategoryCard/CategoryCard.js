import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNotificationContext, types } from "../../contexts/NotificationContext";
import ConfirmDialog from "../Common/ConfirmDialog/ConfirmDialog";
import * as categoryService from '../../services/categoryService';
import * as categoryConstants from '../../constants/categoryConstants';

const CategoryCard = ({
    category
}) => {
    const { auth } = useAuthContext();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { addNotification } = useNotificationContext();

    const deleteHandler = (e) => {
        e.preventDefault();

        categoryService.removeAsync(category?.id, auth.accessToken)
            .then(() => {
                addNotification(categoryConstants.SuccessfullyDeleted, types.success);
            }).finally(() => {
                setShowDeleteDialog(false);
            })
    }

    const deleteClickHandler = (e) => {
        e.preventDefault();

        setShowDeleteDialog(true);
    }

    return (
        <>
            <ConfirmDialog show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onDelete={deleteHandler} />
            <div className="container">
                <div className="row card-header">
                    <div className="card text-center mb-3">
                        <div className="card-header">
                            Category details
                        </div>
                        <div className="card-body">
                            <p className="card-text text-secondary">Name: {category?.name}</p>
                            <p className='card-text text-secondary'>Description: {category?.description}</p>
                            <Link className="button edit-button" to={`/edit-category/${category?.id}`}>Edit</Link>
                            <Link className="button remove-button" to={`#`} onClick={deleteClickHandler}>Delete category</Link>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        </>
    );
}

export default CategoryCard;