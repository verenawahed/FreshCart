import { useContext } from "react"
import { CartContext } from "../../Context/CartContext"
import toast from "react-hot-toast/headless";
import { Link } from "react-router-dom";
 
export default function Cart() {
  const { allProducts, totalCartPrice, numOfCartItems, updataCount, deleteProduct, clearCart } = useContext(CartContext);

  function handleUpdataCount(id, newCount) {
    updataCount(id, newCount);
  };
  async function handleDelete(productId) {
    const resFlag = await deleteProduct(productId); 
    resFlag ? toast.success('Deleted successfully') : toast.error('Error occurred');
  }
  

  

  async function handleClearCart() {
    await clearCart();
    toast.success('Cart cleared successfully');
  }
  

  return (
    <div className="container mx-auto py-4 w-[90%]">
      <h2 className="text-center text-pink-400 text-xl font-semibold pt-5">Total price: {totalCartPrice} LE</h2>
      <p className="text-center m-4 text-pink-600">Your cart includes {numOfCartItems} different items</p>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Image</th>
              <th scope="col" className="px-6 py-3">Product</th>
              <th scope="col" className="px-6 py-3">Qty</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {allProducts?.map(product => (
              <tr key={product._id} className="bg-white border-b  hover:bg-gray-50 ">
                <td className="p-4">
                  <img src={product.product.imageCover} className="w-16 md:w-32 rounded" alt={product.product.title} />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 ">
                  {product.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                      disabled={product.count === 1}
                      onClick={() => handleUpdataCount(product.product._id, product.count - 1)}
                      className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 "
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                      </svg>
                    </button>
                    <input
                      type="number"
                      value={product.count}
                      readOnly
                      className="mx-2 bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg   "
                    />
                    <button
                      onClick={() => handleUpdataCount(product.product._id, product.count + 1)}
                      className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-4 focus:ring-gray-200  "
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 ">
                  {product.price} LE
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(product.product._id)} className="font-medium text-red-600  hover:underline">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-5">
        <button
          onClick={handleClearCart}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-300"
        >
          Clear Cart
        </button>
        <Link to='/payment'>
          <button className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-all duration-300">
            Pay your products
          </button>
        </Link>
      </div>
    </div>
  );
}

