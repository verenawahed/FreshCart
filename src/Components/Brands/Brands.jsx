import axios from "axios"

import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import LoadindScreen from "../Layout/LoadingScreen/LoadindScreen";
export default function Brands() {
  function getAllBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  }

  const { isLoading, isError, data } = useQuery({
    queryKey: 'allBrands',
    queryFn: getAllBrands
  });

  if (isLoading) {
    return (
      <div className="h-screen bg-blue-300 flex justify-center items-center">
        <LoadindScreen/>
        
      </div>
    );
  }

  if (isError) {
    return <h2 className="text-center text-red-600">Error loading brands</h2>;
  }

  return (
    <div className="container py-5 w-[90%] mx-auto pt-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">Our Brands</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data.data.data.map(brand => (
          <Link to={`/brand/${brand._id}`} key={brand._id}>
            <div className="brand rounded-xl bg-white shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold text-gray-700">{brand.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

