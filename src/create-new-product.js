import {useState} from "react";
import {Link, useHistory} from "react-router-dom";

const CreateNewProduct = () => {
    const [imageUrl, setImageUrl] = useState('https://bit.ly/3HDP9oT');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault();
        const product = {name, count: amount, size: {width, height}, weight, imageUrl, comments: ["CommentModel", "CommentModel"]};

        fetch('https://my-json-server.typicode.com/eternal-envy/inforce/product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        }).then (() => history.go(-1))
    }

    return (
        <div className="create">
            <h2>Create a new product</h2>
            <form onSubmit={handleSubmit}>
                <label>Enter image url: </label>
                <input value={imageUrl} required onChange={(e) => setImageUrl(e.target.value)}/>
                <label>Your product name: </label>
                <input placeholder='name' required onChange={(e) => setName(e.target.value)}/>
                <label>Your product amount: </label>
                <input placeholder='10' required onChange={(e) => setAmount(e.target.value)} />
                <label>Your product width (mm): </label>
                <input placeholder='10' required onChange={(e) => setWidth(e.target.value)} />
                <label>Your product height (mm): </label>
                <input placeholder='10' required onChange={(e) => setHeight(e.target.value)} />
                <label>Your product weight (g): </label>
                <input placeholder='10' required onChange={(e) => setWeight(e.target.value + ' g')} />
                <div>
                    <button type='submit'>Add</button>
                    <Link to='/'><button>Cancel</button></Link>
                </div>
            </form>
        </div>

    )
}

export default CreateNewProduct;