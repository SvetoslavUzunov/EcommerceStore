import { useState, useEffect } from "react";
import * as productService from '../services/productService';

const useProductState = (productId) => {
    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            let productResult = await productService.getByIdAsync(productId);
            setProduct(productResult);
        }
        fetchApi();
    }, [productId]);

    return [
        product,
        setProduct
    ]
};

export default useProductState;