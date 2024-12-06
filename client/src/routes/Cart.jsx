import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export default function Default() {
  const [products, setProducts] = useState();
  const [cookies, setCookie] = useCookies(['cart']);

  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + '/api/products';


  useEffect(() => {
      async function fetchData() {
        var cart = await cookies.cart;
        var productQuantities = new Map();

        //prepare cart data
        if (cart !== undefined) {
          if (cart.length > 1) {
            cart.split(',').map(Number).forEach(id => {
              productQuantities.set(id, (productQuantities.get(id) || 0) + 1);
            });
          }
          else {
            productQuantities = productQuantities.set(cart, 1);
          }
        }
        
        //generate array of ids
        const productIds = Array.from(productQuantities.keys());

        //bulk requests for each id
        const responses = await Promise.all(
          productIds.map(async (id) => {
            const res = await fetch(`${apiUrl}/${id}`);
            if (res.ok) {
              return await res.json();
            }
            else {
              return null;
            }}
          )
        );

        const fetchedProducts = responses
          .filter(Boolean) //remove null
          .map((product) => ({
            ...product,
            quantity: productQuantities.get(product.product_id),
        }));

        setProducts(fetchedProducts.length ? fetchedProducts : null);
      }

      fetchData();
  }, [cookies.cart]);


  function getTotal(products) {
    return products.map((product) => {
      return product.quantity * product.cost;
    })
    .reduce((acc, cur) => acc + cur, 0);
  }


  if (products === undefined || !products) {
    return <><h2 className='m-4'>Cart is empty.</h2><p>{cookies.cart}</p></>;
  }


  return (
    <div className="container">
      <h1 className="text-center my-4">Cart</h1>
      <ul className="list-group mb-4">
        {products.map((product) => (
          <li className="list-group-item" key={product.product_id}>
            <div className='row'>
              <div className='col'><img src={`${apiHost}/${product.image_filename}`} className='img-mini'></img></div>
              <div className='col'><h3>{product.name}</h3></div>
              <div className='col text-end'><p>Quantity: {product.quantity}</p></div>
              <div className='col text-end me-2'><p>Price: ${product.cost.toFixed(2)}</p></div>
            </div>
          </li>
        ))}
      </ul>
      <div className='d-flex flex-column text-end'>
        <h4>Subtotal: ${getTotal(products).toFixed(2)}</h4>
        <div className='my-4'>
          <Link to='/' className='btn btn-outline-secondary'>Continue Shopping</Link>
          <Link to='/checkout' className='btn btn-primary ms-4'>Complete Purchase</Link>
        </div>
      </div>
    </div>
  );
}