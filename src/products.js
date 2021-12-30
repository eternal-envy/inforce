import {Link} from "react-router-dom";

const ProductsList = ({ products }) => {

    const deleteBlock = (id) => {
        fetch('https://my-json-server.typicode.com/eternal-envy/inforce/product/' + id,{
            method: 'DELETE'
        }).then (() => window.location.reload())
    }


    return (
        <div className="product-list">
            {
                products.map(product => (
                    <div className="product-preview" key={product.id}>
                        <Link to={'product/' + product.id}>
                            <img src={ product.imageUrl } alt="img" />
                            <h2>{ product.name }</h2>
                           <p>Remaining: { product.count }.</p>
                        </Link>
                        <button onClick={() => deleteBlock(product.id)}><img alt='image' src="https://img.icons8.com/ios-glyphs/90/000000/trash--v1.png" className="delete-block"/></button>
                    </div>
                ))
            }
        </div>
    )
}

export default ProductsList