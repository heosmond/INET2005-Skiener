import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export default function Default() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [cookies, setCookie] = useCookies(['cart']);

  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + `/api/products/${id}`;

  function addToCart(item) {
    if (cookies.cart) {
      setCookie('cart', cookies.cart + ',' + item, {maxAge: 3600 });
    } 
    else {
      setCookie('cart', item, {maxAge: 3600 });
    }
  }

  useEffect(() => {
      async function fetchData() {
          const response = await fetch(apiUrl);
          if (response.ok){
              const data = await response.json();
              if (!ignore) {
                  setProduct(data);
              } 
          } else {
              setProduct(null);
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
      {product && 
      <div>
        <div className='my-2 ms-2'><Link to='/' className='btn btn-outline-secondary'>Back</Link></div>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 text-center'>
              <img src={`${apiHost}/${product.image_filename}`} className='img-detail'></img>
            </div>
            <div className='col col-md-4 flex-column d-flex justify-content-evenly md-view'>
              <div className='my-2'>
                <h1>{product.name}</h1>
                <h3>${product.cost.toFixed(2)}</h3>
              </div >
              <div><button className="btn btn-primary" onClick={() => addToCart(`${product.product_id}`)}>Add to Cart</button></div>
              <div className='my-2'>
                <h4>Description</h4>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
    </>
  )
};