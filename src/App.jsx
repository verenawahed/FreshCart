import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom"
import Layout from "./Components/Layout/Layout"
import Register from "./Components/Register/Register"
import Login from "./Components/Login/Login"
import NotFound from "./Components/NotFound/NotFound"

import Cart from "./Components/Cart/Cart"
import Brands from "./Components/Brands/Brands"
import Categories from "./Components/Categories/Categories"

import Products from "./Components/Products/Products"
import ProuctedRoute from "./Test/ProuctedRoute"
import { QueryClient, QueryClientProvider } from "react-query"
  import ProductDetails from "./Components/ProductDetails/ProductDetails"
import AuthCountext from "./Context/AuthCountext"
import CartContextProvider from "./Context/CartContext"
import { Toaster } from "react-hot-toast"
import Payment from "./Components/Payment/Payment"
import { Offline } from "react-detect-offline"
import BrandDetails from "./Components/BrandDetails/BrandDetails"
import Wishlist from "./Components/Wishlist/Wishlist"

import ProductPage from "./Components/Wishlist/Wishlist"

import {  WishlistProvider } from "./Context/WishlistContext"
import Home from "./Components/Home/Home"
import Footer from "./Components/Footer/Footer"
const reactQueryconfig = new QueryClient();

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { path: "/", element:<Home /> },
      { path: "/home", element:<Home /> },
      { path: '/products', element: <ProuctedRoute><Products /></ProuctedRoute> },
      { path: '/product/:productId', element: <ProuctedRoute><ProductPage /></ProuctedRoute> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: '*', element: <NotFound /> },
      { path: 'brands', element: <ProuctedRoute><Brands /></ProuctedRoute> },
      { path: '/brand/:id', element: <ProuctedRoute><BrandDetails /></ProuctedRoute> },
      { path: 'cart', element: <ProuctedRoute><Cart /></ProuctedRoute> },
      { path: 'categories', element: <ProuctedRoute><Categories /></ProuctedRoute> },
      { path: 'payment', element: <ProuctedRoute><Payment /></ProuctedRoute> },
      { path: 'ProductDetails/:id', element: <ProuctedRoute><ProductDetails /></ProuctedRoute> },
      { path: 'wishlist', element: <ProuctedRoute><Wishlist /></ProuctedRoute> },
      { path: 'footer', element: <ProuctedRoute><Footer /></ProuctedRoute> },
    ],
  },
]);

export default function App() {
  return (
    <>
    
      <AuthCountext>
        
        <QueryClientProvider client={reactQueryconfig}>
          <CartContextProvider>
            <WishlistProvider>
              <RouterProvider router={router} />
              <Toaster />
            </WishlistProvider>
          </CartContextProvider>
        </QueryClientProvider>
        <Offline>
          <div className="bg-black text-white p-5 rounded-xl text-center fixed bottom-5 left-5">
            <h1>Internet Connection Lost</h1>
          </div>
        </Offline>
      </AuthCountext>
    </>
  );
}

