import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer id="site-footer">
            <p>@EcommerceStore</p>
            <Link to="./wave" className="button">Wave mode</Link>
        </footer>
    );
};

export default Footer;