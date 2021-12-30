import { useEffect, useState } from "react";
import ProductsList from "./products";
import useFetchData from './fetch-data';

const MainBody = () => {
    const { data: products, isLoading, error } = useFetchData('https://my-json-server.typicode.com/eternal-envy/inforce/product');

    return (
        <div className="container">
            { error && <div>{ error }</div>}
            { isLoading && <div>Loading...</div>}
            { products && <ProductsList products={ products }/> }
        </div>
    );
};

export default MainBody;