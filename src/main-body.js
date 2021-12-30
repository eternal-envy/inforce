import { useEffect, useState } from "react";
import ProductsList from "./products";
import useFetchData from './fetch-data';

const MainBody = () => {
    const { data: products, isLoading, error } = useFetchData('http://localhost:8000/product');

    return (
        <div className="container">
            { error && <div>{ error }</div>}
            { isLoading && <div>Loading...</div>}
            { products && <ProductsList products={ products }/> }
        </div>
    );
};

export default MainBody;