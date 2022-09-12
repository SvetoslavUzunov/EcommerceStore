import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import * as authenticationConstants from '../../constants/authenticationConstants';

const Header = () => {
    const { auth } = useAuthContext();

    let adminView = (
        <div id="admin">
            <Link to="./create-category" className="button">Add Category</Link>
            <Link to="./create-product" className="button">Add Product</Link>
            <Link to="./all-categories" className="button">All Categories</Link>
            <Link to="./all-users" className="button">All Users</Link>
            <Link to="./my-cart" className="button">My Cart</Link>
            <Link to="./my-account" className="button">My Account</Link>
            <Link to="./logout" className="button">Logout</Link>
        </div>
    );

    let clientView = (
        <div id="client">
            <Link to="./my-cart" className="button">My Cart</Link>
            <Link to="./my-account" className="button">My Account</Link>
            <Link to="./logout" className="button">Logout</Link>
        </div>
    );

    let guestView = (
        <div id="guest">
            <Link to="./login" className="button">Login</Link>
            <Link to="./register" className="button">Register</Link>
        </div>
    );

    const renderView = () => {
        if (auth.email == authenticationConstants.AdminEmail) {
            return adminView;
        } else {
            if (auth.accessToken) {
                return clientView;
            }
            return guestView;
        }
    }

    return (
        <header id="site-header">
            <nav className="navbar">
                <section className="navbar-dashboard">
                    <Link to='/' className="home-left-side header-left-side">Home</Link>
                    <Link to="/dashboard" className="dashboard-left-side header-left-side">Dashboard</Link>
                    {renderView()}
                </section>
            </nav>
        </header>
    );
}

export default Header;