import * as orderConstants from '../constants/orderConstants';

const ordersUrl = orderConstants.OrdersUrl;

export const createAsync = async (orderData, token) => {
    let response = await fetch(`${ordersUrl}/Create`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({ ...orderData })
    });

    let jsonResult = await response.json();

    if (!response.ok) {
        throw jsonResult.errors;
    } else {
        return jsonResult;
    }
};