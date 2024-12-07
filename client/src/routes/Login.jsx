import { data, Link, useOutletContext, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup';
import { useState } from 'react';
import axios from 'axios';

const formSchema = yup.object().shape({
  email: yup.string()
    .required("Email is required")
    .email("Email is invalid"),
  password: yup.string()
    .required("Password is required")
});

export default function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useOutletContext();
  const navigate = useNavigate();

  const {register, handleSubmit, formState:{errors}} = useForm(
    {resolver: yupResolver(formSchema, { abortEarly: false })});

  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + '/api/users/login';

  const onSubmit = async (data) => {

    try {
      // Create URLSearchParams for the form data
      const formData = new URLSearchParams();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
  
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true,
      });
  
      if (response.status === 200) {
        setIsLoggedIn(true);
        navigate('/');
      } else {
        setErrorMessage(response.data || 'An error occurred.');
      }
    } catch (error) {
      if (error.response) {
        // The server responded with a status outside the 2xx range
        setErrorMessage(error.response.data || 'An error occurred.');
      } else {
        // Some other error occurred (e.g., network error)
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="container my-4 p-3">
    <div className="text-center">
      <h1>Log In</h1>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
    <div className="account-form m-auto my-2">
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" {...register('email')} />
          <span className="text-danger">{errors?.email && errors.email.message}</span>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" {...register('password')} />
          <span className="text-danger">{errors?.password && errors.password.message}</span>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
  )
}
  
