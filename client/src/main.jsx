import 'core-js/es/promise'; //for Yup to work in other browsers
import 'core-js/es/set';
import 'core-js/es/map';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './routes/Home.jsx'
import Details from './routes/Details.jsx'
import Signup from './routes/Signup.jsx'
import Login from './routes/Login.jsx'
import Logout from './routes/Logout.jsx'
import Cart from './routes/Cart.jsx'
import Checkout from './routes/Checkout.jsx'
import Confirm from './routes/Confirm.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:id",
        element: <Details />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/confirm",
        element: <Confirm />,
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)