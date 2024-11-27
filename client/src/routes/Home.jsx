import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Nav from '../ui/Nav';
import Card from '../ui/Card';

export default function Home() {
    const [products, setProducts] = useState([]);

    const apiHost = import.meta.env.VITE_API_HOST;
    const apiUrl = apiHost + '/api/products/all';

    useEffect(() => {
        async function fetchData() {
            const url = apiUrl;
            const response = await fetch(url);
            if (response.ok){
                const data = await response.json();
                if (!ignore) {
                    setProducts(data);
                } 
            } else {
                setProducts(null);
            }
        }

        let ignore = false;
        fetchData();
        return () => {
            ignore = true;
        }
    }, []);

    return (
        <>
            <div className="container">
                <h1 className="py-5 text-center">Home of Yarn</h1>
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 text-center">
                    {
                        products.length > 0 ?
                        products.map((product, index) => {   
                        return <div className="col"><Card key={index} passKey={index} product={product} showLinks={true} /></div>
                        }) :
                        <div>No products.</div>
                    }
                </div>
            </div>
        </>
    )
}
  
  