import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import useProductState from '../../hooks/useProductState';
import * as productService from '../../services/productService';
import * as productsConstants from '../../constants/productsConstants';

const EditProduct = () => {
    const { productId } = useParams();
    const [errors, setErrors] = useState({ nameErrorMessage: null, priceErrorMessage: null, name: false, price: false });
    const [product] = useProductState(productId);
    const { addNotification } = useNotificationContext();
    const navigate = useNavigate();

    const productEditSubmitHandler = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        formData.append('id', productId);

        let productData = Object.fromEntries(formData);
        productService.editAsync(productData);

        navigate('/');
        addNotification(productsConstants.SuccessfullyEdited, types.success);
    };

    const nameValidationChecker = (e) => {
        let currentName = e.target.value;

        if (currentName.length < productsConstants.ProductNameMinLength || currentName.length > productsConstants.ProductNameMaxLength) {
            setErrors(state => ({ ...state, nameErrorMessage: productsConstants.ProductWrongNameMessage, name: true }))
        } else {
            setErrors(state => ({ ...state, nameErrorMessage: null, name: false }))
        }
    };

    const priceValidationChecker = (e) => {
        let currentPrice = parseFloat(e.target.value);

        if (currentPrice < productsConstants.ProductPriceMinValue || currentPrice > productsConstants.ProductPriceMaxValue) {
            setErrors(state => ({ ...state, priceErrorMessage: productsConstants.ProductWrongPriceMessage, price: true }))
        } else {
            setErrors(state => ({ ...state, priceErrorMessage: null, price: false }))
        }
    };

    return (
        <section id="edit-page" className="edit">
            <form id="edit-form" method="POST" onSubmit={productEditSubmitHandler}>
                <fieldset>
                    <legend>Edit product</legend>
                    <span className="field">
                        <label htmlFor="name">Name</label>
                        <span className="input" style={{ borderColor: errors.name ? 'red' : 'inherit' }}>
                            <input type="text" name="name" id="name" placeholder='Name' defaultValue={product.name} onBlur={nameValidationChecker} />
                        </span>
                        <Alert variant='danger' show={errors.name}>{errors.nameErrorMessage}</Alert>
                    </span>
                    <p className="field">
                        <label htmlFor="description">Description</label>
                        <span className="input">
                            <textarea name="description" id="description" defaultValue={product.description} />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="image">Image</label>
                        <span className="input">
                            <input type="text" name="imageUrl" id="image" defaultValue={product.imageUrl} />
                        </span>
                    </p>
                    <span className="field">
                        <label htmlFor="price">Price</label>
                        <span className="input" style={{ borderColor: errors.price ? 'red' : 'inherit' }}>
                            <input type="number" name="price" id="price" placeholder="Price" defaultValue={product.price} onBlur={priceValidationChecker} />
                        </span>
                        <Alert variant='danger' show={errors.price}>{errors.priceErrorMessage}</Alert>
                    </span>
                    <input className="button submit" type="submit" value="Save" />
                </fieldset>
            </form>
        </section>
    );
}

export default EditProduct;