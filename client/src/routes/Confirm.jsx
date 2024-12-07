import { Link } from 'react-router-dom';

export default function Confirm() {
    return (
      <div className="container text-center">
        <h1 className="my-4">Confirm Order</h1>
        <Link to="/" className="btn btn-primary my-4">Continue Shopping</Link>
      </div>
    )
  }