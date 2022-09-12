import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import useProductState from '../../hooks/useProductState';
import ConfirmDialog from '../Common/ConfirmDialog/ConfirmDialog';
import * as productService from '../../services/productService';
import * as productConstants from '../../constants/productsConstants';
import * as authenticationConstants from '../../constants/authenticationConstants';
import './Details.css';

const Details = () => {
    const navigate = useNavigate();
    const { auth } = useAuthContext();
    const { productId } = useParams();
    const [product] = useProductState(productId);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { addNotification } = useNotificationContext();

    const deleteHandler = (e) => {
        e.preventDefault();

        productService.removeAsync(productId, auth.accessToken)
            .then(() => {
                navigate('/dashboard');
                addNotification(productConstants.SuccessfullyDeleted, types.success);
            })
            .finally(() => {
                setShowDeleteDialog(false);
            });
    };

    const deleteClickHandler = (e) => {
        e.preventDefault();

        setShowDeleteDialog(true);
    };

    const buttons = (
        <>
            <Link to={`/edit-product/${product.id}`} className="button edit-button">Edit</Link>
            <a className="button delete-button" href="#" onClick={deleteClickHandler}>Delete</a>
        </>
    )

    return (
        <>
            <ConfirmDialog show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onDelete={deleteHandler} />
            <section id="details-page" className="details">
                <div>
                    <h3>{product.name}</h3>
                    <p className="img"><img src={product.imageUrl} /></p>
                    <div className="actions">
                        {auth.email == authenticationConstants.AdminEmail && buttons}
                    </div>
                </div>
                <div className="product-description">
                    <h3>Description</h3>
                    <p>{product.description}</p>
                    <h3>Price</h3>
                    <p>{Number(product.price).toFixed(2)}$</p>
                </div>
            </section>
        </>
    );
}

export default Details;