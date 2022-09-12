import { Link } from 'react-router-dom';
import { useNotificationContext, types } from '../../../contexts/NotificationContext';
import * as productsConstants from '../../../constants/productsConstants';

const ProductCard = ({
    product
}) => {
    const { addNotification } = useNotificationContext();
    
    const products = [];
    const localStorageData = JSON.parse(localStorage.getItem(productsConstants.LocalStorageKey));
    localStorageData?.map(x => products.push(x));

    const addToCartClick = () => {
        if (products.findIndex(x => x.id == product.id) != -1) {
            addNotification(productsConstants.AlreadyAddedInCart, types.warning)
            return;
        }

        products.push(product);
        localStorage.setItem(productsConstants.LocalStorageKey, JSON.stringify(products));
        addNotification(productsConstants.SuccessfullyAddedToCart, types.success);
    };

    return (
        <li className="otherProduct">
            <p className="img rounded-3"><img src={product.imageUrl} /></p>
            <h5>{product.name}</h5>
            <p>Description: {product.description}</p>
            <p>Price: {Number(product.price).toFixed(2)}$</p>
            <Link className="button" to={'#'} onClick={() => addToCartClick()}>Add to cart</Link>
            <Link className="button" to={`/details/${product.id}`}>Details</Link>
        </li>
    );
}

export default ProductCard;