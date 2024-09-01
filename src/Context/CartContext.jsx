import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
       export const CartContext =createContext ()
       
export default function CartContextProvider({ children }) {
    const [allProducts, setAllProducts] = useState(null);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [cartId, setCartId] = useState(null);

    function clearUi() {
        setAllProducts(null);
        setTotalCartPrice(0);
        setNumOfCartItems(0);
        setCartId(null);
    }

    let headers = {
        token: localStorage.getItem('tkn'),
    };

    async function addProduct(productId) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
            "productId": productId}, {
            headers,
        })
        .then((resp) => {
            getUserCart();
            return true;
        })
        .catch((error) => {
            return false;
        });
    }

    function getUserCart() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
        .then((res) => {
            setNumOfCartItems(res.data.numOfCartItems);
            setAllProducts(res.data.data.products);
            setTotalCartPrice(res.data.data.totalCartPrice);
            setCartId(res.data.data._id);
        })
        .catch((error) => {
            console.log('error', error);
        });
    }

    function updataCount(productId, newCount) {
        axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            "count": newCount,
        }, { headers })
        .then((res) => {
            setNumOfCartItems(res.data.numOfCartItems);
            setAllProducts(res.data.data.products);
            setTotalCartPrice(res.data.data.totalCartPrice);
        })
        .catch((error) => {
            console.log('error', error);
        });
    }

    async function deleteProduct(pId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${pId}`, { headers })
        .then((res) => {
            setNumOfCartItems(res.data.numOfCartItems);
            setAllProducts(res.data.data.products);
            setTotalCartPrice(res.data.data.totalCartPrice);
            return true;
        })
        .catch((error) => {
            console.log("error", error);
            return false;
        });
    }

    function clearCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
        .then((res) => {
            clearUi(); 
            return true;
        })
        .catch((error) => {
            console.log("error", error);
            return false;
        });
    }

    useEffect(() => {
        getUserCart();
    }, []);

    return (
        <CartContext.Provider value={{
            addProduct,
            allProducts,
            totalCartPrice,
            numOfCartItems,
            getUserCart,
            updataCount,
            deleteProduct,
            cartId,
            clearUi,
            clearCart,  
        }}>
            {children}
        </CartContext.Provider>
    );
}





