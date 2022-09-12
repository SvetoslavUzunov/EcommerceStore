import { useState, useEffect } from "react";
import * as categoryService from '../services/categoryService';

const useCategoryState = (categoryId) => {
    const [category, setCategory] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            let categoryResult = await categoryService.getByIdAsync(categoryId);
            setCategory(categoryResult);
        }
        fetchApi();
    }, [categoryId]);

    return [
        category,
        setCategory
    ]
};

export default useCategoryState;