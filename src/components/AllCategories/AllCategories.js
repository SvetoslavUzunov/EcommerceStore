import { useState, useEffect } from "react";
import * as categoryService from '../../services/categoryService';
import * as categoryConstants from '../../constants/categoryConstants';
import CategoryCard from "../../components/CategoryCard";

const AllCategories = () => {
    const [categories, setCategories] = useState();

    useEffect(() => {
        categoryService.getAllAsync()
            .then((result) => {
                setCategories(result);
            })
    }, [])

    return (
        <>
            <section className='dashboard'>
                <h1>All Categories</h1>
                {categories?.length > 0
                    ? (<ul className="other-categories-list">
                        {categories?.map(x => <CategoryCard key={x?.id} category={x} />)}
                    </ul>)
                    : < p className="no-categories">{categoryConstants.NoCategoriesInTheSystemYet}</p>
                }
            </section>
        </>
    );
}

export default AllCategories;