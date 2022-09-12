import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'
import { NotificationProvider } from "./contexts/NotificationContext";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import MyCart from "./components/MyCart";
import CreateProduct from "./components/CreateProduct";
import Details from "./components/Details";
import EditProduct from "./components/EditProduct";
import Notification from "./components/Common/Notification/Notification";
import Logout from "./components/Logout";
import FilterProductsByCategory from "./utility/FilterProductsByCategory";
import ScrollButton from './components/Common/ScrollButton';
import MyAccount from './components/MyAccount';
import AllUsers from './components/AllUsers';
import Home from './components/Home';
import WaveAnimation from './components/WaveAnimation';
import CreateCategory from './components/CreateCategory';
import AllCategories from './components/AllCategories';
import EditCategory from './components/EditCategory';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <>
            <AuthProvider>
                <NotificationProvider>
                    <div id="container">
                        <Header />
                        <Notification />
                        <main id="site-content">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/logout" element={<Logout />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/my-cart" element={<MyCart />} />
                                <Route path="/details/:productId" element={<Details />} />
                                <Route path="/create-product" element={<CreateProduct />} />
                                <Route path="/edit-product/:productId" element={<EditProduct />} />
                                <Route path="/create-category" element={<CreateCategory />} />
                                <Route path="/edit-category/:categoryId" element={<EditCategory />} />
                                <Route path="/all-categories" element={<AllCategories />} />
                                <Route path="/my-account" element={<MyAccount />} />
                                <Route path="/all-users" element={<AllUsers />} />
                                <Route path="/wave" element={<WaveAnimation />} />
                                <Route path="/filter-products-by-category/phones" element={<FilterProductsByCategory categoryName={'Phones'} />} />
                                <Route path="/filter-products-by-category/cars" element={<FilterProductsByCategory categoryName={'Cars'} />} />
                                <Route path="/filter-products-by-category/books" element={<FilterProductsByCategory categoryName={'Books'} />} />
                            </Routes>
                        </main>
                        <ScrollButton />
                        <Footer />
                    </div>
                </NotificationProvider>
            </AuthProvider>
        </>
    );
}

export default App;