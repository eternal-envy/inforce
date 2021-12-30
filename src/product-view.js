import {Link, useHistory, useParams} from "react-router-dom";
import useFetchData from './fetch-data'
import {useState} from "react";

const ProductView = () => {
    const { id } = useParams();
    const { data: product, isLoading } = useFetchData('https://my-json-server.typicode.com/eternal-envy/inforce/product/' + id + '?_embed=comments');
    const history = useHistory();
    const [comment, setComment] = useState('I like it');
    const handleSubmit = (e) => {
        e.preventDefault();
        let currentDate = new Date();
        let date = currentDate.getHours() + ':' + currentDate.getMinutes() + ' ' + currentDate.getDate() + '.' + currentDate.getMonth() + '.' + currentDate.getFullYear()

        const commentObject = {description: comment, date, productId: product.id};

        fetch('https://my-json-server.typicode.com/eternal-envy/inforce/comments',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentObject)
        }).then(() => window.location.reload())
    }

    const deleteBlock = () => {
        fetch('https://my-json-server.typicode.com/eternal-envy/inforce/product/' + id, {
            method: 'DELETE'
        }).then (() => history.push('/'))
    }
    const deleteComment = (id) => {
        fetch('https://my-json-server.typicode.com/eternal-envy/inforce/comments/' + id,{
            method: 'DELETE'
        }).then (() => window.location.reload())
    }

    return (
        <div className="product-view">
            { isLoading && <div>The page is loading...</div>}
            { product && (
                <div className="product-container">
                    <img src={ product.imageUrl } alt="image"/>
                    <div className="captions">
                        <h2>{ product.name }</h2>
                        <div className="text-fragment">
                            <b>Width: </b>
                            <span>{product.size.width} mm</span>
                        </div>
                        <div className="text-fragment">
                            <b>Height: </b>
                            <span>{product.size.height} mm</span>
                        </div>
                        <div className="text-fragment">
                            <b>Weight: </b>
                            <span>{product.weight}</span>
                        </div>
                        <div className="text-fragment">
                            <b>Amount: </b>
                            <span>{product.count}</span>
                        </div>
                    </div>
                    <img alt='bin' src="https://img.icons8.com/ios-glyphs/90/000000/trash--v1.png" className="delete-block" onClick={deleteBlock}/>
                    <Link to={'/product/' + id + '/edit'}><img alt='pen' src='https://img.icons8.com/material-rounded/96/000000/edit--v1.png' className='edit' /></Link>
                </div>
            )}
            { product && (
                <div className="comments-container">
                    { product.comments.map(comment => (
                        <div className='comment' key={comment.id}>
                            <p className='description'>{comment.description}</p>
                            <p className='time'>{comment.date}</p>
                            <img alt='bin' src="https://img.icons8.com/ios-glyphs/90/000000/trash--v1.png" className="delete-block" onClick={() => deleteComment(comment.id)}/>
                        </div>
                    )) }
                </div>
            )}
            { !isLoading && (
                <div className='comment-form'>
                    <form onSubmit={handleSubmit}>
                        <label>Write your comment: </label>
                        <textarea required defaultValue="I like it" onChange={(e) => setComment(e.target.value)}></textarea>
                        <button>Add comment</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ProductView;