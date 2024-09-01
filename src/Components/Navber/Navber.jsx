import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import freshlogo from '../../assets/images/freshcart-logo.svg';
import { useContext, useState } from "react";
import AuthCountext, { authCountext } from '../../Context/AuthCountext';

export default function Navbar() {
  const { token, setToken } = useContext(authCountext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); 
  function handleLogout() {
    localStorage.removeItem('tkn');
    setToken(null);
    navigate('/login');
  }

  return (
    <nav className="bg-white md:bg-slate-100 fixed w-full z-20 top-0 left-0 border-b border-gray-200 h-12">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-2">
        <Link to="/" className="flex items-center">
          <img src={freshlogo} alt="fresh cart" className="h-8 w-auto" />
        </Link>

      
        <div className="hidden md:flex items-center space-x-4">
            <NavLink to='/home'>Home</NavLink>
          <NavLink to='/products'>Products</NavLink>
          <NavLink to='/Categories'>Categories</NavLink>
          <NavLink to='/cart'>Cart</NavLink>
          <NavLink to='/brands'>Brands</NavLink>
          <NavLink to='/wishlist'>wishlist</NavLink>
        </div>

        
        <div className="hidden md:flex items-center space-x-4">
          <i className="fa-brands cursor-pointer fa-facebook-f"></i>
          <i className="fa-brands cursor-pointer fa-twitter"></i>
          <i className="fa-brands cursor-pointer fa-behance"></i>
          <i className="fa-brands cursor-pointer fa-linkedin"></i>
          {token ? (
            <span className="cursor-pointer" onClick={handleLogout}>Logout</span>
          ) : (
            <>
              <NavLink to="/Register">Register</NavLink>
              <NavLink to="/Login">Login</NavLink>
            </>
          )}
        </div>

       
        <div className="md:hidden">
          <button
            type="button"
            className="inline-flex items-center p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <i className={isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
          </button>
        </div>
      </div>

      
      {isOpen && (
        <div className="md:hidden bg-white shadow-md"> 
          <ul className="flex flex-col items-center gap-2 p-4">
            <NavLink to='/products'>Products</NavLink>
            <NavLink to='/Categories'>Categories</NavLink>
            <NavLink to='/cart'>Cart</NavLink>
            <NavLink to='/brands'>Brands</NavLink>
            <i className="fa-brands cursor-pointer fa-facebook-f"></i>
            <i className="fa-brands cursor-pointer fa-twitter"></i>
            <i className="fa-brands cursor-pointer fa-behance"></i>
            <i className="fa-brands cursor-pointer fa-linkedin"></i>
            {token ? (
              <span className="cursor-pointer" onClick={handleLogout}>Logout</span>
            ) : (
              <>
                <NavLink to="/Register">Register</NavLink>
                <NavLink to="/Login">Login</NavLink>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

