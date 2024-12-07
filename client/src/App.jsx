import { Outlet } from 'react-router';
import Nav from './ui/Nav.jsx';
import { useState } from 'react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Nav loggedIn={isLoggedIn}/>
      <Outlet context={[isLoggedIn, setIsLoggedIn]}/>
    </>
  )
}                                                                      
