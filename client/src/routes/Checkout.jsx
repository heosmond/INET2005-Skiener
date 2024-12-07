import { Link, useOutletContext, useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { AddressAutofill } from '@mapbox/search-js-react';
import axios from 'axios';


const formSchema = yup.object().shape({
  street: yup.string()
    .required("Street is required"),
  city: yup.string()
    .required("City is required"),
  province: yup.string()
    .required("Province is required"),
  country: yup.string()
    .required("Country is required"),
  postal_code: yup.string()
    .required("Postal code is required")
    .matches(/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i, 'Invalid postal code'),

  //billing
  credit_card: yup.string()
    .required("Credit card number is required")
    .max(16, "Invalid credit card number")
    .min(16, "Invalid credit card number"),
  credit_expire: yup.string()
    .required("Credit expiry is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/g, 'Invalid expiration date'),
  credit_cvv: yup.string()
    .required("CVV is required")
    .max(3, "Not a valid CVV")
    .min(3, "Not a valid CVV")
});



export default function Checkout() {
  const [isLoggedIn, setIsLoggedIn] = useOutletContext();
  const {register, handleSubmit, formState:{errors}, setValue} = useForm(
    {resolver: yupResolver(formSchema, { abortEarly: false })});
  const [cookies, setCookie, removeCookie] = useCookies(['cart']);
  const navigate = useNavigate();

  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + '/api/products/purchase';


  //Submit POST request
  const onSubmit = async (data) => {
    const formData = new URLSearchParams();

    // Append form fields
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append('cart', cookies.cart);

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true,
      });
  
      if (response.status === 200) {
        removeCookie('cart', {path:'/'});
        navigate('/confirm');
      }
    } catch (error) {
      alert("An error occurred while submitting the form");
      console.log(error.response || error.message);
    }
  }

  if (isLoggedIn) {
    return (
      <div className="container my-4 p-3">
        <h1 className="my-4 text-center">Checkout</h1>
        <div className="account-form m-auto my-2">
          <h3>Address</h3>
          <form onSubmit={handleSubmit(onSubmit)}>

            {/* access token is public */}
            <div className="mb-3">
              <label htmlFor="street" className="form-label">Address </label>
              <AddressAutofill accessToken="pk.eyJ1IjoiaGVvc21vbmQiLCJhIjoiY200ZWFpOGh5MHdoazJqcTB4NHdpbTEydSJ9.IKSDypPCrxcoPaAgn5jQ8w" >
                <input className="form-control" name="street" type="text" {...register('street')} onChange={(e) => {setValue('street', e.target.value);}}/>
              </AddressAutofill>
              <span className="text-danger">{errors?.street && errors.street.message}</span>
            </div>

            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input className="form-control" name="city" type="text" autoComplete="address-level2" {...register('city')}/>
              <span className="text-danger">{errors?.city && errors.city.message}</span>
            </div>

            <div className="mb-3">
              <label htmlFor="province" className="form-label">Province</label>
              <input className="form-control" name="province" type="text" autoComplete="address-level1" {...register('province')}/>
              <span className="text-danger">{errors?.province && errors.province.message}</span>
            </div>

            <div className="mb-3">
              <label htmlFor="country" className="form-label">Country</label>
              <input className="form-control" name="country" type="text" autoComplete="country-name" {...register('country')}/>
              <span className="text-danger">{errors?.country && errors.country.message}</span>
            </div>

            <div className="mb-4">
              <label htmlFor="postal_code" className="form-label">Postal code</label>
              <input className="form-control" name="post_code" type="text" autoComplete="postal-code" {...register('postal_code')}/>
              <span className="text-danger">{errors?.postal_code && errors.postal_code.message}</span>
            </div>

            <h3>Billing</h3>
            <div className="mb-3">
              <label htmlFor="credit_card" className="form-label">Credit card number</label>
              <input className="form-control" name="credit_card" type="text" {...register('credit_card')}/>
              <span className="text-danger">{errors?.credit_card && errors.credit_card.message}</span>
            </div>

            <div className="mb-3">
              <label htmlFor="credit_expire" className="form-label">Expiry date (MM/YY)</label>
              <input className="form-control" name="credit_expire" type="text" {...register('credit_expire')}/>
              <span className="text-danger">{errors?.credit_expire && errors.credit_expire.message}</span>
            </div>

            <div className="mb-3">
              <label htmlFor="credit_cvv" className="form-label">CVV</label>
              <input className="form-control" name="credit_cvv" type="text" {...register('credit_cvv')}/>
              <span className="text-danger">{errors?.credit_cvv && errors.credit_cvv.message}</span>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        
      </div>
    )
  } else {
    return (
      <div className="container text-center">
        <h1 className="mt-4">Checkout</h1>
        <p>You must login to complete your purchase</p>
          <Link to={`/login?redirect=${encodeURIComponent('/checkout')}`} className="btn btn-primary my-4">Log in</Link>
      </div>
    )
  }
}
  
  