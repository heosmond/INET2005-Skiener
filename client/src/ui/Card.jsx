import { Link } from 'react-router-dom';

export default function Card(props) {
    const apiHost = import.meta.env.VITE_API_HOST;
    const product = props.product;
    const imageUrl = `${apiHost}/${product.image_filename}`;
    
    return (
        <>
            <div key={props.passKey} className="card">
                <Link><img src={imageUrl} className="card-img-top" alt={`image of ${product.name}`} /></Link>   
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">${product.cost.toFixed(2)}</p>
                </div>
            </div>
        </>
    )
}