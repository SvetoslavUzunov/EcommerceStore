import * as request from '../utility/requester';
import * as userConstants from '../constants/userConstants';

const usersUrl = userConstants.UsersUrl;

export const getAllAsync = () => request.get(`${usersUrl}/GetAll`);

export const removeAsync = async (userId, token) => {
    return await fetch(`${usersUrl}/DeleteById/${userId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token
        }
    });
};

export const getCurrentlyLogged = async (auth) => {
    let allUsers = await getAllAsync();

    let currentlyLoggedUser = allUsers.filter(user => user.email == auth.email);

    return currentlyLoggedUser[0];
} 