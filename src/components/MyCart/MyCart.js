import { Link } from "react-router-dom";
import { useNotificationContext, types } from "../../contexts/NotificationContext";
// import { useAuthContext } from "../../contexts/AuthContext";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import * as productsConstants from '../../constants/productsConstants';
import * as orderConstants from '../../constants/orderConstants';
// import * as orderService from '../../services/orderService';
// import * as userService from '../../services/userService';
import './MyCart.css';
import emptyCartIcon from './emptyCartIcon.png';

const MyCart = () => {
    // const { auth } = useAuthContext();
    const { addNotification } = useNotificationContext();

    const products = JSON.parse(localStorage.getItem(productsConstants.LocalStorageKey)) ?? [];

    let totalPrice = 0;
    if (products.length !== 0) {
        products.forEach(element => {
            totalPrice += parseFloat(element.price);
        })
    }

    // const createOrder = async () => {
    //     let quantity = products.length;
    //     let totalPrice = 123;
    //     let userData = await userService.getCurrentlyLogged(auth);

    //     let userId = userData.id;

    //     orderService.createAsync({
    //         quantity,
    //         totalPrice,
    //         // userId
    //     }, auth.accessToken)
    //         .then(() => {
    //             // addNotification(productsConstants.SuccessfullyCreated, types.success);
    //             // addNotification(orderConstants.SuccessfullyCompletedOrderMessage, types.success);
    //         }).catch((error) => {
    //             // addNotification(productsConstants.FailedCreated, types.error);
    //             // console.log(error);
    //         })
    // };

    const completeOrderClick = () => {
        if (products.length === 0) {
            addNotification(orderConstants.EmptyCartOrderMessage, types.warning);
        } else {
            localStorage.removeItem(productsConstants.LocalStorageKey);
            addNotification(orderConstants.SuccessfullyCompletedOrderMessage, types.success);
            // createOrder();
        }
    };

    return (
        <>
            <section className="dashboard">
                <h1>Shopping cart</h1>
                {products.length > 0
                    ? (<ul className="other-products-list">
                        {products.map(x => <ShoppingCart key={x.id} product={x} />)}
                    </ul>)
                    : (
                        <section>
                            <p className="no-products">Your cart is empty</p>
                            <img className="empty-cart" src={emptyCartIcon}></img>
                        </section>
                    )
                }
                <div className="total-price">
                    <p>Count products: {products.length}</p>
                    <p>Total price: {totalPrice.toFixed(2)}$</p>
                    <Link className="button complete-order" to='#' onClick={() => completeOrderClick()}>Complete the order</Link>
                </div>
            </section>
        </>
    );
}

export default MyCart;