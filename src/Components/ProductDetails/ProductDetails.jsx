import axios from "axios"
import { createContext, useContext } from "react";
import { FallingLines } from "react-loader-spinner"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
export default function ProductDetails() {
    const { id } = useParams();
    const { addProduct } = useContext(CartContext);
  
    async function handleAddProduct(id) {
      const resFlag = await addProduct(id);
      if (resFlag) {
        toast.success('Product added successfully', {
          position: 'top-right',
          duration: 3000,
        });
      } else {
        toast.error('Error adding product', {
          position: 'top-right',
          duration: 3000,
        });
      }
    }
  
    function getProductDetails() {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }
  
    const { data, isError, isLoading } = useQuery({
      queryKey: ['ProductDetails', id],
      queryFn: getProductDetails,
    });
  
    if (isError) {
      return <h2 className="text-center text-red-500">Error loading product details</h2>;
    }
  
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <FallingLines color="#f00" width="100" visible={true} ariaLabel="falling-circles-loading" />
        </div>
      );
    }
  
    const product = data.data.data;
  
    return (
      <div className="container mx-auto w-[90%] p-5 flex flex-col lg:flex-row items-center lg:justify-between gap-8">
        <div className="w-full lg:w-1/3 pt-12">
          <img
            src={product.imageCover}
            className="w-full h-auto rounded-lg shadow-md object-cover "
            alt={product.title}
          />
        </div>
        <div className="w-full lg:w-2/3 space-y-5">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>
          <h5 className="text-lg font-semibold text-gray-700">
            Category: <span className="text-gray-900">{product.category.name}</span>
          </h5>
          <h5 className="text-lg font-semibold text-gray-700">
            Price: <span className="text-gray-900">${product.price}</span>
          </h5>
          <button
            onClick={() => handleAddProduct(product._id)}
            className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 w-full lg:w-auto"
          >
            + Add Product to Cart
          </button>
        </div>
      </div>
    );
  }

