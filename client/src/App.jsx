import { Outlet } from 'react-router'
import Nav from './ui/Nav.jsx'

function App() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  )
}

export default App
