import {Link, useHistory, useParams} from "react-router-dom";
import useFetchData from "./fetch-data";
import {useEffect, useState} from "react";

const EditProduct = () => {
    const { id } = useParams();
    let { data: product, isLoading } = useFetchData('https://my-json-server.typicode.com/eternal-envy/inforce/product/' + id);
    const [imageUrl, setImageUrl] = useState('');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const history = useHistory();
    const [isDone, setIsDone] = useState(false);

    if(!isLoading && !isDone) {
        setName(product.name);
        setAmount(product.count);
        setImageUrl(product.imageUrl);
        setWidth(product.size.width);
        setHeight(product.size.height);
        setWeight(product.weight);
        setIsDone(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = {name, count: amount, size: {width, height}, weight, imageUrl};

        fetch('https://my-json-server.typicode.com/eternal-envy/inforce/product/' + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        }).then (() => history.go(-1))
    }

    return (
        <div className="edit-product">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <label>Enter image url: </label>
                <input value={imageUrl} required onChange={(e) => setImageUrl(e.target.value)}/>
                <label>Your product name: </label>
                <input value={name} required onChange={(e) => setName(e.target.value)}/>
                <label>Your product amount: </label>
                <input value={amount} required onChange={(e) => setAmount(e.target.value)} />
                <label>Your product width (mm): </label>
                <input value={width} required onChange={(e) => setWidth(e.target.value)} />
                <label>Your product height (mm): </label>
                <input value={height} required onChange={(e) => setHeight(e.target.value)} />
                <label>Your product weight (g): </label>
                <input value={weight} required onChange={(e) => setWeight(e.target.value)} />
                <div>
                    <button type='submit'>Add</button>
                    <Link to='/'><button>Cancel</button></Link>
                </div>
            </form>
        </div>
    )
}

export default EditProduct;