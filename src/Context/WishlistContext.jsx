import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast/headless";
import LoadindScreen from "../Components/Layout/LoadingScreen/LoadindScreen";
import axios from "axios";



export const WishlistContext = createContext();

export function useWishlist() {
  return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserWishlist();
  }, []);

  async function getUserWishlist() {
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      });
      if (data && Array.isArray(data.data)) {
        setWishlist(data.data);
      } else {
        console.error("Unexpected data format:", data);
        toast.error("Unexpected data format received");
        setWishlist([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Failed to fetch wishlist");
    } finally {
      setIsLoading(false);
    }
  }

  async function addToWishlist(productId) {
    try {
      await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist/`, {
       "productId":productId
      }, {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      });
      getUserWishlist();
      toast.success("Product added to wishlist successfully");
      return true; 
    } catch (error) {
      toast.error("Failed to add product to wishlist");
      return false; 
    }
  }

  async function productRemove(productId) {
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
          token: localStorage.getItem("tkn"),
        },
      });
      getUserWishlist();
      toast.success("Product removed from wishlist successfully");
    } catch (error) {
      toast.error("Failed to remove product from wishlist");
    }
  }

  return (
    <WishlistContext.Provider value={{ wishlist, isLoading, addToWishlist, productRemove }}>
      {isLoading ? <LoadindScreen /> : children}
    </WishlistContext.Provider>
  );
}
