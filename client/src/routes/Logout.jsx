import { data, Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';


export default function Login() {
  const [loggedOut, setLoggedOut] = useState(false);

  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + '/api/users/logout';

  const logout = async () => {
    try {
      await axios.post(
        apiUrl,
        {},
        { withCredentials: true }
      );
      setLoggedOut("Successfully logged out");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  
  return (
    <div className="container my-4 p-3">
    <div className="text-center">
      <h1>Log Out</h1>

      {loggedOut ? <p>{loggedOut}</p>:
        <div>
        <p>Are you sure you want to log out?</p>
        <button onClick={logout} className="btn btn-primary mx-2 my-4">Log Out</button>
        <Link to="/" className="btn btn-danger mx-2">Return</Link>
      </div> }
      
      
    </div>
  </div>
  )
}