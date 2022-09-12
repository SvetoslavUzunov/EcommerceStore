import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import ProductsList from '../ProductsList';
import SearchBar from '../../components/SearchBar';
import * as productService from '../../services/productService';
import * as authenticationConstants from '../../constants/authenticationConstants';
import './Dashboard.css';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [inputText, setInputText] = useState("");
    const { auth } = useAuthContext();

    useEffect(() => {
        productService.getAllAsync()
            .then(result => {
                setProducts(result);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    let inputHandler = (e) => {
        var valueToLowerCase = e.target.value.toLowerCase();
        setInputText(valueToLowerCase);
    };

    return (
        <section id="dashboard-page" className="dashboard" >
            {auth.accessToken ?
                <>
                    <SearchBar inputValue={inputHandler} />
                    <div className='dashboard-filter-buttons'>
                        <Link className="button" to={`/filter-products-by-category/phones`}>Phones</Link>
                        <Link className="button" to={`/filter-products-by-category/cars`}>Cars</Link>
                        <Link className="button" to={`/filter-products-by-category/books`}>Books</Link>
                    </div>
                    <h1>Dashboard</h1>
                    <section>
                        <ProductsList products={products} inputValues={inputText} />
                    </section>
                </>
                : <p className='no-products'>{authenticationConstants.PleaseRegisterOrLogin}</p>
            }
        </section >
    );
}

export default Dashboard;