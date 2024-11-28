import { Link } from 'react-router-dom';

export default function Card(props) {
    const apiHost = import.meta.env.VITE_API_HOST;
    const product = props.product;
    const imageUrl = `${apiHost}/${product.image_filename}`;
    
    return (
        <>
            <div key={props.passKey} className="card">
                <Link to={`/${product.product_id}`}><img src={imageUrl} className="card-img-top" alt={`image of ${product.name}`} /></Link>   
                <div className="card-body">
                    <Link to={`/${product.product_id}`} className="card-title link-offset-2 link-offset-3-hover link-underline-secondary link-underline-opacity-0 link-underline-opacity-75-hover">
                        <h5 >{product.name}</h5>
                    </Link>
                    <p className="card-text">${product.cost.toFixed(2)}</p>
                </div>
            </div>
        </>
    )
}