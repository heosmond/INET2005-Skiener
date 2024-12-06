import { data, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup';
import { useState } from 'react';

const formSchema = yup.object().shape({
  email: yup.string()
    .required("Email is required")
    .email("Email is invalid"),
  password: yup.string()
    .required("Password is required")
});

export default function Login() {
  const [errorMessage, setErrorMessage] = useState('');

  const {register, handleSubmit, formState:{errors}} = useForm(
    {resolver: yupResolver(formSchema, { abortEarly: false })});

  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + '/api/users/login';

  const onSubmit = async (data) => {
    const formData = new URLSearchParams();
  
    // Append form fields
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        window.location.href = '/';
      } else {
        const resText = await response.text();
        setErrorMessage(resText);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  }

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
  
