import { data, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup';

const formSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string()
    .required("Email is required")
    .email("Email is invalid"),
  password: yup.string()
    .required("Password is required")
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .min(8, "Password must have at least 8 characters"),
});

export default function Signup() {
  const {register, handleSubmit, formState:{errors}, watch} = useForm(
    {resolver: yupResolver(formSchema, { abortEarly: false })});

  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + '/api/users/signup';

  const onSubmit = async (data) => {
    const formData = new URLSearchParams();

    // Append form fields
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // alert(JSON.stringify(data));
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded',
      },
      body: formData
    })

    if (response.ok){
      window.location.href = '/login';
    } else {
      alert("An error occured while submitting the form");
      console.log(response);
    }
  }

  const passwordValue = watch('password');

  return (
    <div className="container my-4 p-3">
      <div className="text-center">
        <h1>Sign up</h1>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
      <div className="account-form m-auto my-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First name</label>
            <input type="text" className="form-control" name="firstName" {...register('firstName')}/>
            <span className="text-danger">{errors?.firstName && errors.firstName.message}</span>
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last name</label>
            <input type="text" className="form-control" name="lastName" {...register('lastName')} />
            <span className="text-danger">{errors?.lastName && errors.lastName.message}</span>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" {...register('email')} />
            <span className="text-danger">{errors?.email && errors.email.message}</span>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" {...register('password')} />
            <span className="text-danger">{!passwordValue && errors?.password?.type === 'required' && errors.password.message}</span>
            {passwordValue && (
                <ul className="text-danger my-1">
                  {!/[0-9]/.test(passwordValue) && <li>Password requires a number</li>}
                  {!/[a-z]/.test(passwordValue) && <li>Password requires a lowercase letter</li>}
                  {!/[A-Z]/.test(passwordValue) && <li>Password requires an uppercase letter</li>}
                  {passwordValue.length < 8 && <li>Password must have at least 8 characters</li>}
                </ul>
              )}
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}