import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import { useNavigate } from 'react-router-dom';
import * as categoryService from '../../services/categoryService';
import * as categoryConstants from '../../constants/categoryConstants';

const CreateCategory = () => {
    const navigate = useNavigate();
    const { auth } = useAuthContext();
    const { addNotification } = useNotificationContext();
    const [errors, setErrors] = useState({ nameErrorMessage: null, descriptionErrorMessage: null, name: false, description: false });

    const createCategory = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let name = formData.get('name');
        let description = formData.get('description');

        categoryService.createAsync({
            name,
            description
        }, auth.accessToken)
            .then(() => {
                navigate('/dashboard');
                addNotification(categoryConstants.SuccessfullyCreated, types.success);
            }).catch((error) => {
                addNotification(categoryConstants.FailedCreated, types.error);
                console.log(error);
            })
    };

    const nameValidationChecker = (e) => {
        let currentName = e.target.value;

        if (currentName.length < categoryConstants.CategoryNameMinLength || currentName.length > categoryConstants.CategoryNameMaxLength) {
            setErrors(state => ({ ...state, nameErrorMessage: categoryConstants.CategoryWrongNameMessage, name: true }))
        } else {
            setErrors(state => ({ ...state, nameErrorMessage: null, name: false }))
        }
    }

    const descriptionValidationChecker = (e) => {
        let currentDescription = e.target.value;

        if (currentDescription.length < categoryConstants.CategoryDescriptionMinLength || currentDescription.length > categoryConstants.CategoryDescriptionMaxLength) {
            setErrors(state => ({ ...state, descriptionErrorMessage: categoryConstants.CategoryWrongDescriptionMessage, description: true }))
        } else {
            setErrors(state => ({ ...state, descriptionErrorMessage: null, description: false }))
        }
    }

    return (
        <section id="create-page" className="create">
            <form id="create-form" onSubmit={createCategory} method="POST">
                <fieldset>
                    <legend>Add new Category</legend>
                    <span className="field">
                        <label htmlFor="name">Name</label>
                        <span className="input" style={{ borderColor: errors.name ? 'red' : 'inherit' }}>
                            <input type="text" name="name" id="name" placeholder="etc...Books" onBlur={nameValidationChecker} />
                        </span>
                        <Alert variant='danger' show={errors.name}>{errors.nameErrorMessage}</Alert>
                    </span>
                    <span className="field">
                        <label htmlFor="description">Description</label>
                        <span className="input">
                            <textarea name="description" id="description" placeholder="Some information about category" onBlur={descriptionValidationChecker}></textarea>
                        </span>
                        <Alert variant='danger' show={errors.description}>{errors.descriptionErrorMessage}</Alert>
                    </span>
                    <input className="button submit" type="submit" value="Add Category" />
                </fieldset>
            </form>
        </section>
    );
}

export default CreateCategory;