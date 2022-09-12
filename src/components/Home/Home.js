import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import Card from 'react-bootstrap/Card';
import phonesCategory from './images/PhonesCategory.jpeg';
import carsCategory from './images/CarsCategory.jpg';
import booksCategory from './images/BooksCategory.jpeg';
import * as authenticationConstants from '../../constants/authenticationConstants';
import * as userService from '../../services/userService';

const Home = () => {
    const [user, setUser] = useState(null);
    const { auth } = useAuthContext();

    useEffect(() => {
        const fetchApi = async () => {
            let currentlyLoggedUser = await userService.getCurrentlyLogged(auth);
            setUser(currentlyLoggedUser);
        }
        fetchApi();

    }, [auth]);

    return (
        <section>
            {auth.accessToken ?
                <>
                    <h2 className="mt-5 mb-3 home">Hello, {user?.userName}... Check our category!</h2>
                    <div className="container">
                        <div className="row m-4 " >
                            <Card style={{ width: '18rem', marginRight: '85px' }}>
                                <Card.Body>
                                    <Card.Title>Phones</Card.Title>
                                    <Link variant="primary" to={`/filter-products-by-category/phones`}>
                                        <Card.Img variant="top" src={phonesCategory} style={{ width: '323px', height: '200px' }} />
                                    </Link>
                                </Card.Body>
                            </Card>
                            <Card style={{ width: '18rem', marginRight: '85px' }}>
                                <Card.Body>
                                    <Card.Title>Cars</Card.Title>
                                    <Link variant="primary" to={`/filter-products-by-category/cars`}>
                                        <Card.Img variant="top" src={carsCategory} />
                                    </Link>
                                </Card.Body>
                            </Card>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Books</Card.Title>
                                    <Link variant="primary" to={`/filter-products-by-category/books`}>
                                        <Card.Img variant="top" src={booksCategory} />
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </>
                : <p className='no-products'>{authenticationConstants.PleaseRegisterOrLogin}</p>
            }
        </section>
    );
}

export default Home;