import * as categoriesConstants from '../constants/categoryConstants';
import * as request from '../utility/requester';

const categoriesUrl = categoriesConstants.CategoriesUrl;

export const getByIdAsync = async (categoryId) => {
    return await fetch(`${categoriesUrl}/GetById/${categoryId}`)
        .then(res => res.json());
};

export const getAllAsync = async () => request.get(`${categoriesUrl}/GetAll`);

export const createAsync = async (categoryData, token) => {
    let response = await fetch(`${categoriesUrl}/Create`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({ ...categoryData })
    });

    let jsonResult = await response.json();

    if (!response.ok) {
        throw jsonResult.errors;
    } else {
        return jsonResult;
    }
};

export const editAsync = (categoryData) => request.put(`${categoriesUrl}/Edit`, categoryData);

export const removeAsync = async (categoryId, token) => {
    return await fetch(`${categoriesUrl}/DeleteById/${categoryId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token
        }
    });
};