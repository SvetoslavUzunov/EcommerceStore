import * as request from "../utility/requester";
import * as productsConstants from '../constants/productsConstants';

const productsUrl = productsConstants.ProductsUrl;

export const getByIdAsync = async (productId) => {
    return await fetch(`${productsUrl}/GetById/${productId}`)
        .then(res => res.json());
};

export const getAllAsync = async () => request.get(`${productsUrl}/GetAll`);

export const createAsync = async (productData, token) => {
    let response = await fetch(`${productsUrl}/Create`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({ ...productData })
    });

    let jsonResult = await response.json();

    if (!response.ok) {
        throw jsonResult.errors;
    } else {
        return jsonResult;
    }
};

export const editAsync = (productData) => request.put(`${productsUrl}/Edit`, productData);

export const removeAsync = async (productId, token) => {
    return await fetch(`${productsUrl}/DeleteById/${productId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token
        }
    });
};