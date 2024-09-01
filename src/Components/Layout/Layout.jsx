
import Navber from '../Navber/Navber'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navber/Navber'
import Home from '../Home/Home'

export default function Layout() {
  return (
    <>
      <Navbar/>
      
      <Outlet/>
      <Footer/>
    </>
  )
}
