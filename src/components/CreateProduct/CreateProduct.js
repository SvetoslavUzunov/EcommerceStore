import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import * as productService from '../../services/productService';
import * as productsConstants from '../../constants/productsConstants'
import * as categoryService from '../../services/categoryService';

const CreateProduct = () => {
    const navigate = useNavigate();
    const { auth } = useAuthContext();
    const [categories, setCategories] = useState([]);
    const { addNotification } = useNotificationContext();
    const [errors, setErrors] = useState({ nameErrorMessage: null, priceErrorMessage: null, name: false, price: false });

    useEffect(() => {
        categoryService.getAllAsync()
            .then((result) => {
                setCategories(result);
            });
    }, [])

    const createProduct = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let name = formData.get('name');
        let description = formData.get('description');
        let imageUrl = formData.get('imageUrl');
        let price = formData.get('price');
        let categoriesFromForm = formData.get('category').split(',');

        let categories = [
            { id: categoriesFromForm[0], name: categoriesFromForm[1] }
        ]

        productService.createAsync({
            name,
            description,
            imageUrl,
            price,
            categories,
        }, auth.accessToken)
            .then(() => {
                navigate('/dashboard');
                addNotification(productsConstants.SuccessfullyCreated, types.success);
            }).catch((error) => {
                addNotification(productsConstants.FailedCreated, types.error);
                console.log(error);
            })
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
        <section id="create-page" className="create">
            <form id="create-form" onSubmit={createProduct} method="POST">
                <fieldset>
                    <legend>Add new Product</legend>
                    <span className="field">
                        <label htmlFor="name">Name</label>
                        <span className="input" style={{ borderColor: errors.name ? 'red' : 'inherit' }}>
                            <input type="text" name="name" id="name" placeholder="etc... iPhone 6" onBlur={nameValidationChecker} />
                        </span>
                        <Alert variant='danger' show={errors.name}>{errors.nameErrorMessage}</Alert>
                    </span>
                    <p className="field">
                        <label htmlFor="description">Description</label>
                        <span className="input">
                            <textarea name="description" id="description" placeholder="Some information about a product"></textarea>
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="image">Image</label>
                        <span className="input">
                            <input type="text" name="imageUrl" id="image" placeholder="Image URL" />
                        </span>
                    </p>
                    <span className="field">
                        <label htmlFor="price">Price</label>
                        <span className="input" style={{ borderColor: errors.price ? 'red' : 'inherit' }}>
                            <input type="number" name="price" id="price" placeholder="etc...120" onBlur={priceValidationChecker} />
                        </span>
                        <Alert variant='danger' show={errors.price}>{errors.priceErrorMessage}</Alert>
                    </span>

                    <p className="field">
                        <label htmlFor="type">Category</label>
                        <span className="input">
                            <select id="category" name="category">
                                {categories.map(x => <option key={x.id} value={[x.id, x.name]}>{x.name}</option>)}
                            </select>
                        </span>
                    </p>
                    <input className="button submit" type="submit" value="Add Product" />
                </fieldset>
            </form>
        </section>
    );
}

export default CreateProduct;