import ProductCard from "./ProductCard";
import * as productsConstants from '../../constants/productsConstants';

const ProductsList = ({
    products,
    inputValues
}) => {

    const filteredData = products.filter((product) => {
        if (inputValues === '') {
            return product;
        }
        else {
            return product?.name.toLowerCase().includes(inputValues.trim())
                || product?.description.toLowerCase().includes(inputValues.trim())
                || product?.price.toString().includes(inputValues);
        }
    });

    return (
        <>
            {filteredData?.length > 0
                ? (<ul className="other-products-list">
                    {filteredData.map(x => <ProductCard key={x.id} product={x} />)}
                </ul>)
                : < p className="no-products">{productsConstants.NoProductsFound}</p>
            }
        </>
    );
}

export default ProductsList;