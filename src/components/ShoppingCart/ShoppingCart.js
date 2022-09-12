import { Link } from "react-router-dom";
import * as productsConstants from '../../constants/productsConstants';
import './ShoppingCart.css'; 

const ShoppingCart = ({
    product
}) => {

    const removeFromCartClick = () => {
        const products = JSON.parse(localStorage.getItem(productsConstants.LocalStorageKey));

        let index = products.findIndex(x => x.id == product.id);
        products.splice(index, 1);

        localStorage.setItem(productsConstants.LocalStorageKey, JSON.stringify(products));

        this.forceUpdate(); //TODO: use useState
    }

    return (
        <div className="container">
            <div className="row card-header">
                <div className="card text-center mb-3">
                    <div className="card-header">
                        Product details
                    </div>
                    <div className="card-body">
                        <p className="card-text text-secondary">Name: {product.name}</p>
                        <p className="card-text text-secondary">Price: {Number(product.price).toFixed(2)}$</p>
                        <Link className="button" to={`/details/${product.id}`}>Details</Link>
                        <Link to={`#`} className="button remove-button" onClick={() => removeFromCartClick()}>Remove from cart</Link>
                    </div>
                </div>
                <br />
            </div>
        </div>
    );
}

export default ShoppingCart;