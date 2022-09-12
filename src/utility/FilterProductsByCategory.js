import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductsList/ProductCard';
import * as productService from '../services/productService';
import * as productsConstants from '../constants/productsConstants';

const FilterProductsByCategory = ({
    categoryName
}) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        productService.getAllAsync()
            .then(productsResult => {
                let filterProducts = productsResult
                    .filter(product => product.categories[0]?.name == categoryName);

                setProducts(filterProducts);
            });
    }, [categoryName]);

    return (
        <>
            <section className='dashboard'>
                <h1>{categoryName}</h1>
                <section>
                    {products.length > 0
                        ? (<ul className="other-products-list">
                            {products.map(x => <ProductCard key={x.id} product={x} />)}
                        </ul>)
                        : < p className="no-products">{productsConstants.NoProductsFound}</p>
                    }
                </section>
            </section>
        </>
    );
}

export default FilterProductsByCategory;