import { useState, useEffect } from 'react';
import UserCard from '../UserCard/UserCard';
import * as userService from '../../services/userService';
import * as userConstants from '../../constants/userConstants';
import * as authenticationConstants from '../../constants/authenticationConstants';

const AllUsers = () => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        userService.getAllAsync()
            .then(result => {
                let allUsersExceptAdmin = result.filter(user => user.email != authenticationConstants.AdminEmail)
                setUsers(allUsersExceptAdmin);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <>
            <section className='dashboard'>
                <h1>All Users</h1>
                {users?.length > 0
                    ? (<ul className="other-users-list">
                        {users?.map(x => <UserCard key={x?.id} user={x} />)}
                    </ul>)
                    : < p className="no-users">{userConstants.NoUsersInTheSystemYet}</p>
                }
            </section>
        </>
    );
}

export default AllUsers;