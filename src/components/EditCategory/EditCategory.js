import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNotificationContext, types } from "../../contexts/NotificationContext";
import { Alert } from "react-bootstrap";
import useCategoryState from '../../hooks/useCategoryState';
import * as categoryService from '../../services/categoryService';
import * as categoryConstants from '../../constants/categoryConstants';

const EditCategory = () => {
    const { categoryId } = useParams();
    const [category] = useCategoryState(categoryId);
    const { addNotification } = useNotificationContext();
    const [errors, setErrors] = useState({ nameErrorMessage: null, descriptionErrorMessage: null, name: false, description: false });
    const navigate = useNavigate();

    const categoryEditSubmitHandler = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        formData.append('id', categoryId);

        let categoryData = Object.fromEntries(formData);
        categoryService.editAsync(categoryData);

        navigate('/dashboard');
        addNotification(categoryConstants.SuccessfullyEdited, types.success);
    }

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
        <section id="edit-page" className="edit">
            <form id="edit-form" method="POST" onSubmit={categoryEditSubmitHandler}>
                <fieldset>
                    <legend>Edit category</legend>
                    <span className="field">
                        <label htmlFor="name">Name</label>
                        <span className="input" style={{ borderColor: errors.name ? 'red' : 'inherit' }}>
                            <input type="text" name="name" id="name" placeholder='Name' defaultValue={category.name} onBlur={nameValidationChecker} />
                        </span>
                        <Alert variant='danger' show={errors.name}>{errors.nameErrorMessage}</Alert>
                    </span>
                    <span className="field">
                        <label htmlFor="description">Description</label>
                        <span className="input">
                            <textarea name="description" id="description" defaultValue={category.description} onBlur={descriptionValidationChecker} />
                        </span>
                        <Alert variant="danger" show={errors.description}>{errors.descriptionErrorMessage}</Alert>
                    </span>
                    <input className="button submit" type="submit" value="Save" />
                </fieldset>
            </form>
        </section>
    );
}

export default EditCategory;